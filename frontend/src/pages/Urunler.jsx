import { urunler } from "../data/icerik";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function Urunler() {
  return (
    <main className="py-14 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Ürün & Sistemlerimiz</h1>
          <p className="text-gray-500 max-w-xl mx-auto">
            Endüstriyel ve ticari ihtiyaçlarınıza yönelik geniş ürün yelpazemizi keşfedin.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {urunler.map((u) => (
            <div
              key={u.id}
              className="bg-white rounded-xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-lg hover:border-orange-200 transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img
                  src={u.gorsel}
                  alt={u.baslik}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-5">
                <span className="text-2xl">{u.ikon}</span>
                <h2 className="text-lg font-bold text-slate-800 mt-2 mb-1">{u.baslik}</h2>
                <p className="text-sm text-gray-500 mb-4">{u.aciklama}</p>
                <Link
                  to="/iletisim"
                  className="inline-flex items-center gap-1 text-sm text-orange-500 font-semibold hover:text-orange-600"
                >
                  Teklif Al <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
