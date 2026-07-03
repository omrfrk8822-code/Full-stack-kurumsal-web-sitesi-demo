use actix_cors::Cors;
use actix_web::{get, post, web, App, HttpResponse, HttpServer, Responder};
use chrono::Local;
use rusqlite::{Connection, params};
use serde::{Deserialize, Serialize};
use std::sync::Mutex;

// --- Veri Yapıları ---

#[derive(Serialize, Deserialize)]
struct IletisimFormu {
    ad_soyad: String,
    email: String,
    telefon: String,
    konu: String,
    mesaj: String,
}

#[derive(Serialize)]
struct IletisimKaydi {
    id: i64,
    ad_soyad: String,
    email: String,
    telefon: String,
    konu: String,
    mesaj: String,
    tarih: String,
}

#[derive(Serialize)]
struct ApiYanit {
    basarili: bool,
    mesaj: String,
}

// --- Uygulama Durumu ---

struct AppState {
    db: Mutex<Connection>,
}

// --- Veritabanı Kurulumu ---

fn veritabani_olustur(conn: &Connection) {
    conn.execute_batch(
        "CREATE TABLE IF NOT EXISTS iletisim (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            ad_soyad TEXT    NOT NULL,
            email    TEXT    NOT NULL,
            telefon  TEXT    NOT NULL,
            konu     TEXT    NOT NULL,
            mesaj    TEXT    NOT NULL,
            tarih    TEXT    NOT NULL
        );",
    )
    .expect("Tablo oluşturulamadı");
}

// --- Route Handler'lar ---

/// Sağlık kontrolü
#[get("/api/saglik")]
async fn saglik() -> impl Responder {
    HttpResponse::Ok().json(ApiYanit {
        basarili: true,
        mesaj: "Sunucu çalışıyor".to_string(),
    })
}

/// İletişim formu gönder → iletisim.db'ye kaydet
#[post("/api/iletisim")]
async fn iletisim_gonder(
    data: web::Data<AppState>,
    form: web::Json<IletisimFormu>,
) -> impl Responder {
    // Basit doğrulama
    if form.ad_soyad.trim().is_empty()
        || form.email.trim().is_empty()
        || form.mesaj.trim().is_empty()
    {
        return HttpResponse::BadRequest().json(ApiYanit {
            basarili: false,
            mesaj: "Ad soyad, email ve mesaj alanları zorunludur".to_string(),
        });
    }

    let tarih = Local::now().format("%Y-%m-%d %H:%M:%S").to_string();
    let db = data.db.lock().unwrap();

    match db.execute(
        "INSERT INTO iletisim (ad_soyad, email, telefon, konu, mesaj, tarih)
         VALUES (?1, ?2, ?3, ?4, ?5, ?6)",
        params![
            form.ad_soyad.trim(),
            form.email.trim(),
            form.telefon.trim(),
            form.konu.trim(),
            form.mesaj.trim(),
            tarih
        ],
    ) {
        Ok(_) => HttpResponse::Ok().json(ApiYanit {
            basarili: true,
            mesaj: "Mesajınız alındı, en kısa sürede dönüş yapacağız".to_string(),
        }),
        Err(e) => {
            eprintln!("Veritabanı hatası: {}", e);
            HttpResponse::InternalServerError().json(ApiYanit {
                basarili: false,
                mesaj: "Sunucu hatası oluştu".to_string(),
            })
        }
    }
}

/// Tüm iletişim kayıtlarını listele (admin amaçlı)
#[get("/api/iletisim")]
async fn iletisim_listele(data: web::Data<AppState>) -> impl Responder {
    let db = data.db.lock().unwrap();
    let mut stmt = db
        .prepare("SELECT id, ad_soyad, email, telefon, konu, mesaj, tarih FROM iletisim ORDER BY id DESC")
        .unwrap();

    let kayitlar: Vec<IletisimKaydi> = stmt
        .query_map([], |row| {
            Ok(IletisimKaydi {
                id: row.get(0)?,
                ad_soyad: row.get(1)?,
                email: row.get(2)?,
                telefon: row.get(3)?,
                konu: row.get(4)?,
                mesaj: row.get(5)?,
                tarih: row.get(6)?,
            })
        })
        .unwrap()
        .filter_map(|r| r.ok())
        .collect();

    HttpResponse::Ok().json(kayitlar)
}

// --- Ana Fonksiyon ---

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let conn = Connection::open("iletisim.db").expect("Veritabanı açılamadı");
    veritabani_olustur(&conn);

    let data = web::Data::new(AppState {
        db: Mutex::new(conn),
    });

    println!("Backend sunucu başlatılıyor → http://localhost:5051");

    HttpServer::new(move || {
        let cors = Cors::default()
            .allow_any_origin()
            .allow_any_method()
            .allow_any_header();

        App::new()
            .wrap(cors)
            .app_data(data.clone())
            .service(saglik)
            .service(iletisim_gonder)
            .service(iletisim_listele)
    })
    .bind("0.0.0.0:5051")?
    .run()
    .await
}
