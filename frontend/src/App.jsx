import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AnaSayfa from "./pages/AnaSayfa";
import Urunler from "./pages/Urunler";
import Galeri from "./pages/Galeri";
import Hakkimizda from "./pages/Hakkimizda";
import Iletisim from "./pages/Iletisim";

function ScrollEnUst() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <ScrollEnUst />
      <div className="min-h-screen flex flex-col">
        <Header />
        <Routes>
          <Route path="/" element={<AnaSayfa />} />
          <Route path="/urunler" element={<Urunler />} />
          <Route path="/galeri" element={<Galeri />} />
          <Route path="/hakkimizda" element={<Hakkimizda />} />
          <Route path="/iletisim" element={<Iletisim />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
