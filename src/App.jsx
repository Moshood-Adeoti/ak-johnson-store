
//8060165811
//Aina Alice Ajoke
//Moniepoint

import { useState, useEffect } from "react";
import { Pill, BedDouble, Search, Phone, MapPin, ShieldCheck, Truck, Clock, ShoppingCart, Star, Menu, X, Settings, ExternalLink } from "lucide-react";

// ---- CONFIG ----
const SHOP_NAME = "AK Johnson Pharmacy & Stores";
const WHATSAPP_NUMBER = "234XXXXXXXXXX"; // <-- CHANGE TO YOUR WHATSAPP NUMBER
const ADDRESS = "Odo Oja, Otun-Ekiti, Ekiti State, Nigeria";
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbx3TBDDtHHudadUgpCt4DyoLH7Gg4h-vYAn8oGJSKL_mBT3oK7BE2hEw8JUuM9XQYF5Zw/exec"; // KEEP THIS ONE
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vTsiWdP8qpKs17Co4XD05uCWqfBps9Xj8j5_aEZc9ABgugs8B5vlq5yKcCJDbSKv-nSSN6Nva6cUC-y/pub?output=csv"; // <-- GET THIS FROM GOOGLE DRIVE AND PASTE HERE
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=600&auto=format&fit=crop";
// -----------------------

export default function PharmacyFoamStore() {
  const [tab, setTab] = useState("Pharmacy");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  // Fetch products from Google Sheet
  useEffect(() => {
    fetch(SHEET_API_URL)
    .then(res => {
        if (!res.ok) throw new Error("Network response was not ok");
        return res.json();
      })
    .then(data => {
        const formatted = data
        .filter(p => p.Name) // remove empty rows
        .map((p, i) => ({
            id: i + 1,
            name: p.Name,
            category: p.Category,
            price: Number(p.Price) || 0,
            type: p.Type, // Pharmacy or Foam
            rating: Number(p.Rating) || 4.8,
            img: p.ImageURL || PLACEHOLDER_IMG,
            stock: p.Stock || 0,
          }));
        setProducts(formatted);
        setLoading(false);
      })
    .catch(err => {
        console.error("Error fetching from Sheet:", err);
        setError(true);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(
    (p) => p.type === tab && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F7F5F0", color: "#1C2B26" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
      .display { font-family: 'Fraunces', serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "#F7F5F0", borderBottom: "1px solid #E3DFD3", backdropFilter: "blur(8px)" }} className="sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div style={{ background: "#1F5E4C" }} className="w-10 h-10 rounded-full flex items-center justify-center shrink-0">
              <Pill size={20} color="#F7F5F0" />
            </div>
            <span className="display font-bold text-xl" style={{ color: "#1F5E4C" }}>{SHOP_NAME}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <a
              href={GOOGLE_SHEET_URL}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition hover:bg-[#F1EEE5]"
              style={{ border: "1px solid #1F5E4C", color: "#1F5E4C" }}
            >
              <Settings size={15} /> Manage Products
            </a>
            <a
              href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition hover:opacity-90"
              style={{ background: "#1F5E4C", color: "#F7F5F0" }}
            >
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {menuOpen && (
          <div className="md:hidden px-6 pb-4 flex-col gap-3">
            <a href={GOOGLE_SHEET_URL} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-full" style={{ border: "1px solid #1F5E4C", color: "#1F5E4C" }}>
              <Settings size={15} /> Manage Products
            </a>
            <a href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-full" style={{ background: "#1F5E4C", color: "#F7F5F0" }}>
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: "linear-gradient(135deg, #1F5E4C 0%, #2A7A63 100%)" }} className="text-white py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px)", backgroundSize: "32px 32px" }} />
        <div className="container mx-auto relative text-center max-w-3xl">
          <p className="uppercase tracking-[0.2em] text-sm font-semibold mb-4" style={{ color: "#C9A15A" }}>
            Trusted in {ADDRESS.split(",")[1]?.trim() || "your community"}
          </p>
          <h1 className="display text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Health & Comfort <br /> In One Place
          </h1>
          <p className="text-lg md:text-xl mb-10 opacity-90">
            Genuine medicines, quality Vitafoam mattresses, and beds. Order in seconds, delivered to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="px-8 py-4 rounded-full font-bold text-base transition hover:scale-105 shadow-lg" style={{ background: "#C9A15A", color: "#1C2B26" }}>
              Browse Products
            </a>
            <a href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" rel="noreferrer"
               className="flex items-center justify-center gap-2 px-8 py-4 rounded-full font-bold text-base border-2 border-white/40 hover:bg-white/10 transition">
              <Phone size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-16 px-6 container mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck size={28} />, title: "100% Genuine", text: "NAFDAC approved drugs & authentic Vitafoam products only." },
            { icon: <Truck size={28} />, title: "Fast Delivery", text: "Same day delivery within Otun-Ekiti and nearby towns." },
            { icon: <Clock size={28} />, title: "24/7 Support", text: "Message us on WhatsApp anytime. We reply fast." },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm hover:shadow-md transition" style={{ border: "1px solid #E3DFD3" }}>
              <div style={{ color: "#1F5E4C" }} className="shrink-0 mt-1">{item.icon}</div>
              <div>
                <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-20 px-6" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto">
          <h2 className="display text-4xl font-bold text-center mb-3">Our Products</h2>
          <p className="text-center text-gray-500 mb-10">Tap any product to order directly on WhatsApp.</p>

          <div className="max-w-lg mx-auto mb-8 relative">
            <Search className="absolute left-5 top-4 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for drugs, foams, or beds..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-14 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 text-sm shadow-sm"
              style={{ border: "1px solid #E3DFD3" }}
            />
          </div>

          <div className="flex justify-center gap-3 mb-12">
            <button onClick={() => setTab("Pharmacy")} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition" style={tab === "Pharmacy"? { background: "#1F5E4C", color: "#fff" } : { background: "#F1EEE5", color: "#4B564F" }}>
              <Pill size={16} /> Pharmacy
            </button>
            <button onClick={() => setTab("Foam")} className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition" style={tab === "Foam"? { background: "#1F5E4C", color: "#fff" } : { background: "#F1EEE5", color: "#4B564F" }}>
              <BedDouble size={16} /> Foam & Beds
            </button>
          </div>

          {loading? (
            <p className="text-center text-gray-400 py-16">Loading products from Google Sheet...</p>
          ) : error? (
            <div className="text-center py-16">
              <p className="text-red-500 mb-4">Failed to load products. Check your Sheet link and deployment.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
              {filtered.map((item) => (
                <div key={item.id} className="rounded-2xl overflow-hidden transition hover:shadow-2xl group bg-white" style={{ border: "1px solid #E3DFD3" }}>
                  <div className="overflow-hidden h-56 relative">
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-500" />
                    <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
                      <Star size={14} fill="#C9A15A" color="#C9A15A" />
                      <span className="text-xs font-semibold">{item.rating}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{item.category}</p>
                    <h3 className="font-bold text-base mb-2 leading-snug h-12">{item.name}</h3>
                    <p className="text-2xl font-bold mb-2" style={{ color: "#1F5E4C" }}>₦{item.price.toLocaleString()}</p>
                    <p className="text-xs text-gray-500 mb-4">Stock: {item.stock}</p>
                    <a href={waLink(`Hello ${SHOP_NAME}, I want to order: ${item.name} (₦${item.price.toLocaleString()})`)} target="_blank" rel="noreferrer" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition hover:opacity-90" style={{ background: "#1F5E4C", color: "#fff" }}>
                      <ShoppingCart size={16} /> Order Now
                    </a>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-gray-400 py-12">No products found. Try a different search.</p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#16241F" }} className="text-white py-14 px-6">
        <div className="container mx-auto text-center">
          <h3 className="display text-3xl font-bold mb-3">{SHOP_NAME}</h3>
          <p className="flex justify-center items-center gap-2 mb-4 text-sm opacity-80"><MapPin size={16} /> {ADDRESS}</p>
          <a href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 mb-8 px-7 py-3 rounded-full font-semibold text-sm" style={{ background: "#C9A15A", color: "#1C2B26" }}>
            <Phone size={16} /> Chat with us
          </a>
          <p className="text-xs opacity-50">© 2026 {SHOP_NAME}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}