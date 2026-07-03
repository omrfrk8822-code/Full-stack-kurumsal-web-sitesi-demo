import { Link } from "react-router-dom";
import { ozellikler, urunler, referanslar } from "../data/icerik";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AnaSayfa() {
  return (
    <main>
      {/* Hero */}
      <section className="relative min-h-[560px] flex items-center justify-center text-white overflow-hidden border-t border-slate-700">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900" />
        <div className="relative z-10 text-center px-4 max-w-3xl mx-auto">
          <span className="inline-block bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest mb-4">
            20 Yıllık Deneyim
          </span>
          <h1 className="text-4xl md:text-6xl font-bold mb-5 leading-tight">
            Endüstriyel Kapı &{" "}
            <span className="text-orange-400">Kepenk Sistemleri</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto mb-8">
            Fabrika, AVM ve kurumsal binalara özel tasarım, montaj ve servis
            hizmetleri sunuyoruz.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              to="/iletisim"
              className="bg-orange-500 hover:bg-orange-600 text-white font-semibold px-7 py-3 rounded-lg transition-colors flex items-center gap-2"
            >
              Ücretsiz Keşif Talebi <ArrowRight size={16} />
            </Link>
            <Link
              to="/urunler"
              className="border border-white/40 bg-slate-800/60 hover:bg-slate-700 hover:border-white text-white font-semibold px-7 py-3 rounded-lg transition-colors"
            >
              Ürünlerimiz
            </Link>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-10 text-sm text-gray-300">
            {["TSE & CE Sertifikalı", "7/24 Teknik Servis", "Ücretsiz Keşif"].map((m) => (
              <span key={m} className="flex items-center gap-1.5">
                <CheckCircle size={14} className="text-orange-400" /> {m}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Özellikler */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {ozellikler.map((o) => (
            <div
              key={o.baslik}
              className="text-center p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 transition-all"
            >
              <div className="text-4xl mb-3">{o.ikon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{o.baslik}</h3>
              <p className="text-sm text-gray-500">{o.aciklama}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Ürünlere Kısa Bakış */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-slate-800 mb-3">Ürün & Sistemlerimiz</h2>
            <p className="text-gray-500 max-w-lg mx-auto">
              Geniş ürün yelpazemizle her sektöre uygun çözümler sunuyoruz.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {urunler.slice(0, 6).map((u) => (
              <div
                key={u.id}
                className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all group"
              >
                <div className="h-44 overflow-hidden">
                  <img
                    src={u.gorsel}
                    alt={u.baslik}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-5">
                  <span className="text-2xl">{u.ikon}</span>
                  <h3 className="font-semibold text-slate-800 mt-2 mb-1">{u.baslik}</h3>
                  <p className="text-sm text-gray-500">{u.aciklama}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              to="/urunler"
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Tüm Ürünleri Gör <ArrowRight size={16} />
            </Link>
          </div>
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
