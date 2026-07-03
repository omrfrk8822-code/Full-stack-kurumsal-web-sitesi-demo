import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { X, Phone, Mail, ChevronRight, Home, Grid, Image, MessageSquare, Info } from "lucide-react";
import { iletisimBilgileri, urunler } from "../data/icerik";

const navLinks = [
  { to: "/", label: "Ana Sayfa", ikon: Home },
  { to: "/hakkimizda", label: "Hakkımızda", ikon: Info },
  { to: "/urunler", label: "Ürünler", ikon: Grid },
  { to: "/galeri", label: "Galeri", ikon: Image },
  { to: "/iletisim", label: "İletişim", ikon: MessageSquare },
];

export default function MobilMenu({ acik, kapat }) {
  const { pathname } = useLocation();

  // Menü açıkken sayfanın scroll'unu kilitle
  useEffect(() => {
    document.body.style.overflow = acik ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [acik]);

  return (
    <>
      {/* Karartma overlay */}
      <div
        onClick={kapat}
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300 ${
          acik ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      />

      {/* Drawer Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-slate-900 z-50 md:hidden flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${
          acik ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Drawer Başlık */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <div className="flex items-center gap-2">
            <div className="bg-orange-500 rounded-lg w-8 h-8 flex items-center justify-center font-black text-white">K</div>
            <span className="font-bold text-white">KepenkPro</span>
          </div>
          <button
            onClick={kapat}
            className="text-gray-400 hover:text-white hover:bg-slate-700 p-1.5 rounded-lg transition-colors"
            aria-label="Menüyü kapat"
          >
            <X size={20} />
          </button>
        </div>

        {/* Nav Linkleri */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1 overflow-y-auto">
          {navLinks.map(({ to, label, ikon: Ikon }) => (
            <Link
              key={to}
              to={to}
              onClick={kapat}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                pathname === to
                  ? "bg-orange-500 text-white"
                  : "text-gray-300 hover:bg-slate-800 hover:text-white"
              }`}
            >
              <Ikon size={17} />
              {label}
              {pathname !== to && <ChevronRight size={14} className="ml-auto text-gray-500" />}
            </Link>
          ))}

          {/* Ürünler Alt Listesi */}
          <div className="mt-2 pt-2 border-t border-slate-700">
            <p className="text-xs text-gray-500 uppercase tracking-widest px-4 mb-2">Ürünlerimiz</p>
            {urunler.map((u) => (
              <Link
                key={u.id}
                to="/urunler"
                onClick={kapat}
                className="flex items-center gap-3 px-4 py-2 rounded-xl text-sm text-gray-400 hover:bg-slate-800 hover:text-white transition-colors"
              >
                <span className="text-base">{u.ikon}</span>
                {u.baslik}
              </Link>
            ))}
          </div>
        </nav>

        {/* Alt İletişim Bilgileri */}
        <div className="px-5 py-4 border-t border-slate-700 space-y-3">
          <a
            href={`tel:${iletisimBilgileri.telefon}`}
            className="flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-white text-sm font-semibold px-4 py-3 rounded-xl transition-colors"
          >
            <Phone size={15} /> {iletisimBilgileri.telefon}
          </a>
          <a
            href={`mailto:${iletisimBilgileri.email}`}
            className="flex items-center gap-3 text-gray-400 hover:text-white text-sm transition-colors px-1"
          >
            <Mail size={15} /> {iletisimBilgileri.email}
          </a>
        </div>
      </div>
    </>
  );
}
