import { useState } from "react";
import { iletisimBilgileri } from "../data/icerik";
import { CheckCircle, AlertCircle } from "lucide-react";

const BACKEND_URL = "";
const bosForm = { ad_soyad: "", email: "", telefon: "", konu: "", mesaj: "" };

function BasariEkrani({ mesaj, sifirla }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
      <div className="relative mb-6">
        <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center">
          <CheckCircle size={52} className="text-green-500" strokeWidth={1.5} />
        </div>
        <div className="absolute inset-0 rounded-full bg-green-200 animate-ping opacity-30" />
      </div>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Teşekkürler!</h2>
      <p className="text-gray-500 mb-1">İletiniz başarıyla alındı.</p>
      <p className="text-gray-400 text-sm mb-8 max-w-xs">{mesaj}</p>
      <button
        onClick={sifirla}
        className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 py-2.5 rounded-lg transition-colors text-sm"
      >
        Yeni Mesaj Gönder
      </button>
    </div>
  );
}

export default function Iletisim() {
  const [form, setForm] = useState(bosForm);
  const [durum, setDurum] = useState(null);
  const [yukleniyor, setYukleniyor] = useState(false);
  const [basarili, setBasarili] = useState(null);

  function guncelle(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function gonder(e) {
    e.preventDefault();
    setYukleniyor(true);
    setDurum(null);

    try {
      const res = await fetch(`${BACKEND_URL}/api/iletisim`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const veri = await res.json();

      if (veri.basarili) {
        setBasarili(veri.mesaj);
        setForm(bosForm);
      } else {
        setDurum({ mesaj: veri.mesaj });
      }
    } catch {
      setDurum({ mesaj: "Sunucuya bağlanılamadı. Lütfen tekrar deneyin." });
    } finally {
      setYukleniyor(false);
    }
  }

  return (
    <main className="py-14 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">İletişim</h1>
          <p className="text-gray-500">Teklif almak veya bilgi edinmek için bize ulaşın.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* İletişim Bilgileri */}
          <div className="space-y-5">
            <h2 className="text-xl font-bold text-slate-800">Bize Ulaşın</h2>
            {[
              { ikon: "📍", label: "Adres", deger: iletisimBilgileri.adres },
              { ikon: "📞", label: "Telefon", deger: iletisimBilgileri.telefon },
              { ikon: "✉️", label: "E-posta", deger: iletisimBilgileri.email },
              { ikon: "🕐", label: "Çalışma Saatleri", deger: iletisimBilgileri.calisma },
            ].map((item) => (
              <div key={item.label} className="flex gap-3 items-start">
                <span className="text-2xl">{item.ikon}</span>
                <div>
                  <p className="text-xs text-gray-400 font-medium uppercase">{item.label}</p>
                  <p className="text-slate-700">{item.deger}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Form Kartı */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            {basarili ? (
              <BasariEkrani mesaj={basarili} sifirla={() => setBasarili(null)} />
            ) : (
              <form onSubmit={gonder} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Ad Soyad *</label>
                    <input
                      name="ad_soyad"
                      value={form.ad_soyad}
                      onChange={guncelle}
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="Adınız Soyadınız"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">E-posta *</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={guncelle}
                      required
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="ornek@email.com"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Telefon</label>
                    <input
                      name="telefon"
                      value={form.telefon}
                      onChange={guncelle}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                      placeholder="+90 5xx xxx xx xx"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Konu</label>
                    <select
                      name="konu"
                      value={form.konu}
                      onChange={guncelle}
                      className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400"
                    >
                      <option value="">Seçiniz</option>
                      <option>Teklif Talebi</option>
                      <option>Teknik Servis</option>
                      <option>Bakım Sözleşmesi</option>
                      <option>Genel Bilgi</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Mesaj *</label>
                  <textarea
                    name="mesaj"
                    value={form.mesaj}
                    onChange={guncelle}
                    required
                    rows={4}
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-orange-400 resize-none"
                    placeholder="Mesajınızı buraya yazın..."
                  />
                </div>

                {durum && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-lg bg-red-50 text-red-700 border border-red-200 text-sm">
                    <AlertCircle size={16} className="mt-0.5 shrink-0" />
                    {durum.mesaj}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={yukleniyor}
                  className="w-full bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300 text-white font-semibold py-3 rounded-lg transition-colors"
                >
                  {yukleniyor ? "Gönderiliyor..." : "Mesaj Gönder"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
