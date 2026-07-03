import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import { referanslar } from "../data/icerik";

const istatistikler = [
  { sayi: "20+", label: "Yıllık Deneyim" },
  { sayi: "1500+", label: "Tamamlanan Proje" },
  { sayi: "10+", label: "Ürün Kategorisi" },
  { sayi: "7/24", label: "Teknik Destek" },
];

const degerler = [
  "TSE ve CE sertifikalı ürünler",
  "Avrupa standartlarında üretim",
  "Uzman montaj ve servis ekibi",
  "Periyodik bakım sözleşmeleri",
  "Hızlı yedek parça temini",
  "Ücretsiz keşif ve danışmanlık",
];

export default function Hakkimizda() {
  return (
    <main className="bg-gray-50 min-h-screen">

      {/* Üst Banner */}
      <section className="bg-slate-900 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-bold mb-3">Hakkımızda</h1>
        <p className="text-gray-400 max-w-xl mx-auto">
          20 yıldır Türkiye'nin dört bir yanında endüstriyel kapı ve kepenk sistemleri kuruyoruz.
        </p>
      </section>

      {/* Şirket Profili */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-widest">Biz Kimiz?</span>
            <h2 className="text-3xl font-bold text-slate-800 mt-2 mb-4">
              Güvenilir Çözüm Ortağınız
            </h2>
            <p className="text-gray-500 mb-4 leading-relaxed">
              KepenkPro olarak 2004 yılından bu yana fabrika, AVM, lojistik merkezi ve kurumsal
              binalara otomatik kepenk, seksiyonel kapı, bariyer ve yangın kapısı sistemleri
              kuruyoruz. Deneyimli ekibimiz ve geniş ürün yelpazemizle her ölçekteki projeye
              anahtar teslim çözüm sunuyoruz.
            </p>
            <p className="text-gray-500 mb-6 leading-relaxed">
              Müşteri memnuniyetini her şeyin önünde tutan anlayışımızla, satış sonrası teknik
              servis ve periyodik bakım hizmetlerimizle yanınızdayız.
            </p>
            <ul className="space-y-2 mb-8">
              {degerler.map((d) => (
                <li key={d} className="flex items-center gap-2 text-sm text-slate-700">
                  <CheckCircle size={16} className="text-orange-500 shrink-0" />
                  {d}
                </li>
              ))}
            </ul>
            <Link
              to="/iletisim"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Bizimle İletişime Geçin <ArrowRight size={16} />
            </Link>
          </div>

          {/* Görsel */}
          <div className="rounded-2xl overflow-hidden shadow-lg">
            <img
              src="/gorseller/urun2.png"
              alt="KepenkPro ekibi"
              className="w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* İstatistikler */}
      <section className="bg-slate-900 py-14 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
          {istatistikler.map((i) => (
            <div key={i.label}>
              <p className="text-4xl font-bold text-orange-400 mb-1">{i.sayi}</p>
              <p className="text-gray-400 text-sm">{i.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Referanslar */}
      <section className="py-14 px-4 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">Referanslarımız</h2>
          <p className="text-gray-500 text-sm mb-8">Türkiye'nin önde gelen markalarına hizmet veriyoruz.</p>
          <div className="flex flex-wrap justify-center gap-3">
            {referanslar.map((r) => (
              <span
                key={r}
                className="bg-gray-100 hover:bg-orange-50 hover:text-orange-600 text-gray-600 font-medium px-5 py-2.5 rounded-full text-sm transition-colors cursor-default"
              >
                {r}
              </span>
            ))}
          </div>
        </div>
      </section>

    </main>
  );
}
