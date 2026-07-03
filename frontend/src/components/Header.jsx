import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, Phone, ChevronRight, ChevronDown } from "lucide-react";
import { iletisimBilgileri, urunler } from "../data/icerik";
import MobilMenu from "./MobilMenu";

const navLinks = [
  { to: "/", label: "Ana Sayfa" },
  { to: "/hakkimizda", label: "Hakkımızda" },
  { to: "/urunler", label: "Ürünler", dropdown: true },
  { to: "/galeri", label: "Galeri" },
  { to: "/iletisim", label: "İletişim" },
];

export default function Header() {
  const [menuAcik, setMenuAcik] = useState(false);
  const [dropdownAcik, setDropdownAcik] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();

  // Dropdown dışına tıklanınca kapat
  useEffect(() => {
    function disariTikla(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownAcik(false);
      }
    }
    document.addEventListener("mousedown", disariTikla);
    return () => document.removeEventListener("mousedown", disariTikla);
  }, []);

  // Sayfa değişince dropdown kapat
  useEffect(() => { setDropdownAcik(false); }, [pathname]);

  return (
    <>
      <header className="sticky top-0 z-50 shadow-xl bg-slate-900 text-white">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-orange-500 group-hover:bg-orange-400 transition-colors rounded-lg w-9 h-9 flex items-center justify-center text-lg font-black">
              K
            </div>
            <div className="leading-tight">
              <p className="font-bold text-white text-base tracking-wide">KepenkPro</p>
              <p className="text-orange-400 text-[10px] tracking-widest uppercase">Kapı & Kepenk Sistemleri</p>
            </div>
          </Link>

          {/* Masaüstü Menü */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.dropdown ? (
                <div key={link.to} className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setDropdownAcik(!dropdownAcik)}
                    className={`relative flex items-center gap-1 px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      pathname === link.to
                        ? "text-orange-400 bg-slate-800"
                        : "text-gray-300 hover:text-white hover:bg-slate-800"
                    }`}
                  >
                    {link.label}
                    <ChevronDown size={14} className={`transition-transform duration-200 ${dropdownAcik ? "rotate-180" : ""}`} />
                    {pathname === link.to && (
                      <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-400 rounded-full" />
                    )}
                  </button>

                  {/* Dropdown Panel */}
                  {dropdownAcik && (
                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[560px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 z-50">
                      <div className="grid grid-cols-2 gap-1">
                        {urunler.map((u) => (
                          <Link
                            key={u.id}
                            to="/urunler"
                            onClick={() => setDropdownAcik(false)}
                            className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-orange-50 group transition-colors"
                          >
                            <span className="text-xl">{u.ikon}</span>
                            <span className="text-sm text-slate-700 group-hover:text-orange-600 font-medium">{u.baslik}</span>
                          </Link>
                        ))}
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100">
                        <Link
                          to="/urunler"
                          onClick={() => setDropdownAcik(false)}
                          className="flex items-center justify-center gap-2 w-full bg-slate-800 hover:bg-slate-700 text-white text-sm font-semibold py-2.5 rounded-xl transition-colors"
                        >
                          Tüm Ürünleri Gör <ChevronRight size={14} />
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                    pathname === link.to
                      ? "text-orange-400 bg-slate-800"
                      : "text-gray-300 hover:text-white hover:bg-slate-800"
                  }`}
                >
                  {link.label}
                  {pathname === link.to && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-orange-400 rounded-full" />
                  )}
                </Link>
              )
            )}
          </nav>

          {/* Sağ Alan */}
          <div className="flex items-center gap-3">
            <a
              href={`tel:${iletisimBilgileri.telefon.replace(/\s/g, "")}`}
              className="hidden md:flex items-center gap-2 bg-orange-500 hover:bg-orange-600 transition-colors text-white text-sm font-semibold px-4 py-2 rounded-lg"
            >
              <Phone size={14} />
              {iletisimBilgileri.telefon}
            </a>
            <button
              className="md:hidden text-gray-300 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors"
              onClick={() => setMenuAcik(true)}
              aria-label="Menüyü aç"
            >
              <Menu size={22} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobil Drawer Menü */}
      <MobilMenu acik={menuAcik} kapat={() => setMenuAcik(false)} />
    </>
  );
}
