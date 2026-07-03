const projeler = [
  { id: 1, baslik: "Fabrika Kepenk Projesi", yer: "İstanbul", gorsel: "/gorseller/urun1.png" },
  { id: 2, baslik: "AVM Seksiyonel Kapı", yer: "Ankara", gorsel: "/gorseller/urun2.png" },
  { id: 3, baslik: "Lojistik Merkezi", yer: "İzmir", gorsel: "/gorseller/urun8.png" },
  { id: 4, baslik: "Soğuk Hava Deposu", yer: "Bursa", gorsel: "/gorseller/urun6.png" },
  { id: 5, baslik: "Otopark Bariyer Sistemi", yer: "Antalya", gorsel: "/gorseller/urun4.png" },
  { id: 6, baslik: "Yangın Kapısı Projesi", yer: "Kocaeli", gorsel: "/gorseller/urun5.png" },
];

export default function Galeri() {
  return (
    <main className="py-14 px-4 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-slate-800 mb-3">Proje Galerimiz</h1>
          <p className="text-gray-500">Tamamladığımız projelerden seçmeler.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projeler.map((p) => (
            <div
              key={p.id}
              className="rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-lg transition-shadow group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                <img
                  src={p.gorsel}
                  alt={p.baslik}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="bg-white p-4">
                <h3 className="font-semibold text-slate-800">{p.baslik}</h3>
                <p className="text-sm text-gray-500 mt-1">📍 {p.yer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
