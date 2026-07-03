import { Link } from "react-router-dom";
import { iletisimBilgileri } from "../data/icerik";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-gray-400 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Marka */}
        <div>
          <p className="text-orange-400 font-bold text-lg mb-2">⚙️ KepenkPro</p>
          <p className="text-sm">
            Endüstriyel kapı ve kepenk sistemlerinde 20 yıllık deneyim.
          </p>
        </div>

        {/* Hızlı Bağlantılar */}
        <div>
          <p className="text-white font-semibold mb-3">Hızlı Bağlantılar</p>
          <ul className="space-y-2 text-sm">
            {["/", "/urunler", "/galeri", "/iletisim"].map((to, i) => (
              <li key={to}>
                <Link to={to} className="hover:text-orange-400 transition-colors">
                  {["Ana Sayfa", "Ürünler", "Galeri", "İletişim"][i]}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* İletişim */}
        <div>
          <p className="text-white font-semibold mb-3">İletişim</p>
          <ul className="space-y-2 text-sm">
            <li>📍 {iletisimBilgileri.adres}</li>
            <li>📞 {iletisimBilgileri.telefon}</li>
            <li>✉️ {iletisimBilgileri.email}</li>
            <li>🕐 {iletisimBilgileri.calisma}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-slate-800 text-center py-4 text-xs text-gray-600">
        © {new Date().getFullYear()} KepenkPro. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}
