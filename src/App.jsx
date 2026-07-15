import { useState, useEffect } from "react";
import { Pill, BedDouble, Search, Phone, MapPin, ShieldCheck, Truck, Clock, ShoppingCart, Star, Menu, X, Settings, Plus, Trash2, Pencil, Lock, Save, XCircle } from "lucide-react";

// ---- CHANGE THESE ----
const SHOP_NAME = "AK Johnson Pharmacy & Stores";
const WHATSAPP_NUMBER = "234XXXXXXXXXX"; // digits only, country code first, no + or spaces
const ADDRESS = "Odo Oja, Otun-Ekiti, Ekiti State, Nigeria";
const ADMIN_PIN = "2026"; // change this to whatever PIN the owner wants
// -----------------------

const STORAGE_KEY = "products";
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=600&auto=format&fit=crop";

const SEED_PRODUCTS = [
 
  { id: 1, name: "Panadol Extra, 24 Tablets", category: "Pain Relief", price: 1500, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop" },
  { id: 2, name: "Emzor Paracetamol, 500mg 20pcs", category: "Pain Relief", price: 1200, type: "Pharmacy", rating: 4.7, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop" },
  { id: 3, name: "Augmentin 625mg, 14 Tablets", category: "Antibiotics", price: 8500, type: "Pharmacy", rating: 4.9, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop" },
  { id: 4, name: "Amoxicillin 500mg, 20 Capsules", category: "Antibiotics", price: 4500, type: "Pharmacy", rating: 4.6, img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop" },
  { id: 5, name: "Vitamin C 1000mg, 30 Tablets", category: "Supplements", price: 8000, type: "Pharmacy", rating: 4.6, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop" },
  { id: 6, name: "Multivitamin with Iron, 60 Tablets", category: "Supplements", price: 12500, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop" },
  { id: 7, name: "Digital Blood Pressure Monitor", category: "Devices", price: 25000, type: "Pharmacy", rating: 4.7, img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop" },
  { id: 8, name: "Digital Thermometer", category: "Devices", price: 6500, type: "Pharmacy", rating: 4.5, img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop" },
  { id: 9, name: "Face Mask, 50pcs Box", category: "Protection", price: 3500, type: "Pharmacy", rating: 4.4, img: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=600&auto=format&fit=crop" },
  { id: 10, name: "Hand Sanitizer 500ml", category: "Protection", price: 4000, type: "Pharmacy", rating: 4.7, img: "https://images.unsplash.com/photo-1607613009820-a29c39c04c04?q=80&w=600&auto=format&fit=crop" },
  { id: 11, name: "Diabetic Test Strips, 50pcs", category: "Diabetes Care", price: 18000, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop" },
  { id: 12, name: "Cough Syrup 200ml", category: "Cold & Flu", price: 3000, type: "Pharmacy", rating: 4.5, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop" },

  // FOAM & BEDS
  { id: 13, name: "Vitafoam Royal Mattress 6x6x12", category: "Foam", price: 185000, type: "Foam", rating: 4.9, img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=600&auto=format&fit=crop" },
  { id: 14, name: "Vitafoam Supreme Mattress 6x6x10", category: "Foam", price: 155000, type: "Foam", rating: 4.8, img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop" },
  { id: 15, name: "Orthopedic Spring Mattress 6x6x12", category: "Beds", price: 350000, type: "Foam", rating: 4.9, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop" },
  { id: 16, name: "Vitafoam Luxury Pillow", category: "Accessories", price: 15000, type: "Foam", rating: 4.8, img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop" },
  { id: 17, name: "Vitafoam Mattress Protector 6x6", category: "Accessories", price: 22000, type: "Foam", rating: 4.6, img: "https://images.unsplash.com/photo-1522771739844-6a9a2b5355af?q=80&w=600&auto=format&fit=crop" },
  { id: 18, name: "Hospital Bed with Rails", category: "Beds", price: 420000, type: "Foam", rating: 4.9, img: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?q=80&w=600&auto=format&fit=crop" },
  { id: 19, name: "Vitafoam Baby Mattress 3x6x4", category: "Foam", price: 45000, type: "Foam", rating: 4.7, img: "https://images.unsplash.com/photo-1631049035182-249067d7618e?q=80&w=600&auto=format&fit=crop" },
  { id: 20, name: "Sofa Bed 3-Seater", category: "Beds", price: 280000, type: "Foam", rating: 4.8, img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?q=80&w=600&auto=format&fit=crop" },
  { id: 21, name: "Memory Foam Topper 6x6x3", category: "Accessories", price: 65000, type: "Foam", rating: 4.7, img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=600&auto=format&fit=crop" },
];
;

function emptyForm() {
  return { id: null, name: "", category: "", price: "", type: "Pharmacy", img: "" };
}

export default function PharmacyFoamStore() {
  const [tab, setTab] = useState("Pharmacy");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [adminOpen, setAdminOpen] = useState(false);
  const [unlocked, setUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState(false);
  const [form, setForm] = useState(emptyForm());
  const [saving, setSaving] = useState(false);

  const waLink = (msg) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(msg)}`;

  useEffect(() => {
    (async () => {
      try {
        const result = await window.storage.get(STORAGE_KEY, true);
        const list = result ? JSON.parse(result.value) : SEED_PRODUCTS;
        setProducts(list);
      } catch (e) {
        try {
          await window.storage.set(STORAGE_KEY, JSON.stringify(SEED_PRODUCTS), true);
          setProducts(SEED_PRODUCTS);
        } catch (e2) {
          setLoadError(true);
          setProducts(SEED_PRODUCTS);
        }
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  async function persist(list) {
    setProducts(list);
    try {
      await window.storage.set(STORAGE_KEY, JSON.stringify(list), true);
    } catch (e) {
      setLoadError(true);
    }
  }

  function startAdd() {
    setForm(emptyForm());
  }

  function startEdit(product) {
    setForm({ ...product, price: String(product.price) });
  }

  async function saveProduct(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.price) return;
    setSaving(true);
    const clean = {
      id: form.id || `p-${Date.now()}`,
      name: form.name.trim(),
      category: form.category.trim() || "General",
      price: Number(form.price) || 0,
      type: form.type,
      img: form.img.trim() || PLACEHOLDER_IMG,
    };
    let next;
    if (form.id) {
      next = products.map((p) => (p.id === clean.id ? clean : p));
    } else {
      next = [...products, clean];
    }
    await persist(next);
    setForm(emptyForm());
    setSaving(false);
  }

  async function deleteProduct(id) {
    await persist(products.filter((p) => p.id !== id));
  }

  function checkPin(e) {
    e.preventDefault();
    if (pinInput === ADMIN_PIN) {
      setUnlocked(true);
      setPinError(false);
    } else {
      setPinError(true);
    }
  }

  const filtered = products.filter(
    (p) => p.type === tab && p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#F7F5F0", color: "#1C2B26" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,700&family=Inter:wght@400;500;600;700&display=swap');
        .display { font-family: 'Fraunces', serif; }
      `}</style>

      {/* NAVBAR */}
      <nav style={{ background: "#F7F5F0", borderBottom: "1px solid #E3DFD3" }} className="sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div style={{ background: "#1F5E4C" }} className="w-9 h-9 rounded-full flex items-center justify-center shrink-0">
              <Pill size={18} color="#F7F5F0" />
            </div>
            <span className="display font-bold text-lg" style={{ color: "#1F5E4C" }}>{SHOP_NAME}</span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setAdminOpen(true)}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm transition"
              style={{ border: "1px solid #1F5E4C", color: "#1F5E4C" }}
            >
              <Settings size={15} /> Manage Products
            </button>
            <a
              href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)}
              target="_blank" rel="noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition hover:opacity-90"
              style={{ background: "#1F5E4C", color: "#F7F5F0" }}
            >
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
          <button className="sm:hidden" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {menuOpen && (
          <div className="sm:hidden px-6 pb-4 flex flex-col gap-3">
            <button
              onClick={() => { setAdminOpen(true); setMenuOpen(false); }}
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-full"
              style={{ border: "1px solid #1F5E4C", color: "#1F5E4C" }}
            >
              <Settings size={15} /> Manage Products
            </button>
            <a
              href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)}
              target="_blank" rel="noreferrer"
              className="flex items-center justify-center gap-2 px-5 py-3 rounded-full font-semibold text-sm w-full"
              style={{ background: "#1F5E4C", color: "#F7F5F0" }}
            >
              <Phone size={15} /> Chat on WhatsApp
            </a>
          </div>
        )}
      </nav>

      {/* HERO */}
      <section style={{ background: "#1F5E4C" }} className="text-white py-20 px-6 relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-10"
          style={{ backgroundImage: "radial-gradient(circle at 20% 30%, #fff 1px, transparent 1px)", backgroundSize: "28px 28px" }}
        />
        <div className="container mx-auto relative text-center max-w-2xl">
          <p className="uppercase tracking-widest text-sm font-semibold mb-4" style={{ color: "#C9A15A" }}>
            Trusted in {ADDRESS.split(",")[1]?.trim() || "your community"}
          </p>
          <h1 className="display text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Genuine Medicines. <br /> Quality Foams & Beds.
          </h1>
          <p className="text-lg mb-8 opacity-90">
            One store for your health and your home's comfort — order in seconds, straight to your door.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="#products" className="px-8 py-3.5 rounded-full font-bold transition hover:scale-105" style={{ background: "#C9A15A", color: "#1C2B26" }}>
              Browse Products
            </a>
            <a href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" rel="noreferrer"
               className="flex items-center justify-center gap-2 px-8 py-3.5 rounded-full font-bold border-2 border-white/40 hover:bg-white/10 transition">
              <Phone size={18} /> Order on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* TRUST STRIP */}
      <section className="py-14 px-6 container mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            { icon: <ShieldCheck size={26} />, title: "100% Genuine", text: "Certified drugs and authentic Vitafoam products only." },
            { icon: <Truck size={26} />, title: "Fast Delivery", text: "We deliver locally, quickly and carefully." },
            { icon: <Clock size={26} />, title: "Always Reachable", text: "Message us on WhatsApp any time, day or night." },
          ].map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 flex gap-4 items-start" style={{ border: "1px solid #E3DFD3" }}>
              <div style={{ color: "#1F5E4C" }} className="shrink-0 mt-0.5">{item.icon}</div>
              <div>
                <h3 className="font-bold text-base mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-16 px-6" style={{ background: "#FFFFFF" }}>
        <div className="container mx-auto">
          <h2 className="display text-3xl font-bold text-center mb-2">Our Products</h2>
          <p className="text-center text-gray-500 mb-10">Pick a category and order directly on WhatsApp.</p>

          <div className="max-w-md mx-auto mb-8 relative">
            <Search className="absolute left-4 top-3.5 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search for drugs or foams..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-full focus:outline-none focus:ring-2 text-sm"
              style={{ border: "1px solid #E3DFD3" }}
            />
          </div>

          <div className="flex justify-center gap-3 mb-12">
            <button
              onClick={() => setTab("Pharmacy")}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition"
              style={tab === "Pharmacy" ? { background: "#1F5E4C", color: "#fff" } : { background: "#F1EEE5", color: "#4B564F" }}
            >
              <Pill size={16} /> Pharmacy
            </button>
            <button
              onClick={() => setTab("Foam")}
              className="flex items-center gap-2 px-6 py-3 rounded-full font-bold text-sm transition"
              style={tab === "Foam" ? { background: "#1F5E4C", color: "#fff" } : { background: "#F1EEE5", color: "#4B564F" }}
            >
              <BedDouble size={16} /> Foam & Beds
            </button>
          </div>

          {loading ? (
            <p className="text-center text-gray-400 py-16">Loading products…</p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-7">
              {filtered.map((item) => (
                <div key={item.id} className="rounded-2xl overflow-hidden transition hover:shadow-xl group" style={{ border: "1px solid #E3DFD3" }}>
                  <div className="overflow-hidden h-52">
                    <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-105 transition duration-300" />
                  </div>
                  <div className="p-5">
                    <p className="text-xs text-gray-400 mb-2">{item.category}</p>
                    <h3 className="font-bold text-base mb-2 leading-snug">{item.name}</h3>
                    <p className="text-xl font-bold mb-4" style={{ color: "#1F5E4C" }}>₦{item.price.toLocaleString()}</p>
                    <a
                      href={waLink(`Hello ${SHOP_NAME}, I want to order: ${item.name} (₦${item.price.toLocaleString()})`)}
                      target="_blank" rel="noreferrer"
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition hover:opacity-90"
                      style={{ background: "#1F5E4C", color: "#fff" }}
                    >
                      <ShoppingCart size={16} /> Order on WhatsApp
                    </a>
                  </div>
                </div>
              ))}
              {filtered.length === 0 && (
                <p className="col-span-full text-center text-gray-400 py-12">
                  Nothing here yet. Tap "Manage Products" above to add your first item.
                </p>
              )}
            </div>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#16241F" }} className="text-white py-12 px-6">
        <div className="container mx-auto text-center">
          <h3 className="display text-2xl font-bold mb-3">{SHOP_NAME}</h3>
          <p className="flex justify-center items-center gap-2 mb-2 text-sm opacity-80"><MapPin size={15} /> {ADDRESS}</p>
          <a href={waLink(`Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" rel="noreferrer"
             className="inline-flex items-center gap-2 mt-4 mb-6 px-6 py-2.5 rounded-full font-semibold text-sm"
             style={{ background: "#C9A15A", color: "#1C2B26" }}>
            <Phone size={15} /> Chat with us
          </a>
          <p className="text-xs opacity-50">© 2026 {SHOP_NAME}. All rights reserved.</p>
        </div>
      </footer>

      {/* ADMIN MODAL */}
      {adminOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4" style={{ background: "rgba(28,43,38,0.6)" }}>
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="display text-xl font-bold" style={{ color: "#1F5E4C" }}>Manage Products</h3>
              <button onClick={() => { setAdminOpen(false); setUnlocked(false); setPinInput(""); setPinError(false); setForm(emptyForm()); }}>
                <X size={22} />
              </button>
            </div>

            {!unlocked ? (
              <form onSubmit={checkPin} className="text-center py-6">
                <Lock size={28} className="mx-auto mb-3" style={{ color: "#1F5E4C" }} />
                <p className="text-sm text-gray-600 mb-4">Enter the shop PIN to edit products.</p>
                <input
                  type="password"
                  value={pinInput}
                  onChange={(e) => { setPinInput(e.target.value); setPinError(false); }}
                  className="text-center tracking-widest text-lg px-4 py-2.5 rounded-full w-40 mb-3"
                  style={{ border: pinError ? "1px solid #C0392B" : "1px solid #E3DFD3" }}
                  autoFocus
                />
                {pinError && <p className="text-sm mb-3" style={{ color: "#C0392B" }}>Wrong PIN. Try again.</p>}
                <button type="submit" className="block mx-auto px-6 py-2.5 rounded-full font-semibold text-sm text-white" style={{ background: "#1F5E4C" }}>
                  Unlock
                </button>
              </form>
            ) : (
              <>
                {loadError && (
                  <p className="text-sm mb-4 px-4 py-2 rounded-lg" style={{ background: "#FBEAEA", color: "#C0392B" }}>
                    Changes aren't saving right now — check your connection and try again.
                  </p>
                )}

                <form onSubmit={saveProduct} className="grid sm:grid-cols-2 gap-3 mb-6 p-4 rounded-xl" style={{ background: "#F7F5F0" }}>
                  <input
                    placeholder="Product name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="px-3 py-2 rounded-lg sm:col-span-2 text-sm" style={{ border: "1px solid #E3DFD3" }} required
                  />
                  <input
                    placeholder="Category (e.g. Pain Relief)"
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid #E3DFD3" }}
                  />
                  <input
                    placeholder="Price in ₦"
                    type="number" min="0"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid #E3DFD3" }} required
                  />
                  <select
                    value={form.type}
                    onChange={(e) => setForm({ ...form, type: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid #E3DFD3" }}
                  >
                    <option value="Pharmacy">Pharmacy</option>
                    <option value="Foam">Foam</option>
                  </select>
                  <input
                    placeholder="Image link (optional)"
                    value={form.img}
                    onChange={(e) => setForm({ ...form, img: e.target.value })}
                    className="px-3 py-2 rounded-lg text-sm" style={{ border: "1px solid #E3DFD3" }}
                  />
                  <div className="sm:col-span-2 flex gap-2">
                    <button type="submit" disabled={saving} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm text-white" style={{ background: "#1F5E4C" }}>
                      <Save size={15} /> {form.id ? "Save changes" : "Add product"}
                    </button>
                    {form.id && (
                      <button type="button" onClick={startAdd} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm" style={{ border: "1px solid #E3DFD3" }}>
                        <XCircle size={15} /> Cancel edit
                      </button>
                    )}
                  </div>
                </form>

                <div className="space-y-2">
                  {products.length === 0 && <p className="text-sm text-gray-400 text-center py-6">No products yet — add your first one above.</p>}
                  {products.map((p) => (
                    <div key={p.id} className="flex items-center gap-3 p-3 rounded-xl" style={{ border: "1px solid #E3DFD3" }}>
                      <img src={p.img} alt="" className="w-12 h-12 rounded-lg object-cover shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{p.name}</p>
                        <p className="text-xs text-gray-500">{p.type} · ₦{Number(p.price).toLocaleString()}</p>
                      </div>
                      <button onClick={() => startEdit(p)} className="p-2 rounded-lg" style={{ color: "#1F5E4C" }}><Pencil size={16} /></button>
                      <button onClick={() => deleteProduct(p.id)} className="p-2 rounded-lg" style={{ color: "#C0392B" }}><Trash2 size={16} /></button>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}