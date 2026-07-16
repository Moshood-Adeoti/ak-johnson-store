import { useState, useEffect, useMemo } from "react";
import {
  Pill, BedDouble, Search, Phone, MapPin, ShieldCheck, Truck, Clock,
  ShoppingCart, ShoppingBag, Star, Menu, X, Settings, Plus, Minus,
  Trash2, Lock, Eye, EyeOff, MessageCircle, Filter
} from "lucide-react";
import FloatingPharmacistButton from "./FloatingPharmacistButton";

// ---- CONFIG ----
const SHOP_NAME = "AK Johnson Pharmacy & Stores";
const PHARMACIST_WA = "2348036252259"; // Pharmacist direct line
const ORDERS_WA = "2348036252259"; // Orders line
const ADMIN_PASSCODE = "AKJ2026";
const ADDRESS = "Odo Oja, Otun-Ekiti, Ekiti State, Nigeria";
const SHEET_API_URL = "https://script.google.com/macros/s/AKfycbx3TBDDtHHudadUgpCt4DyoLH7Gg4h-vYAn8oGJSKL_mBT3oK7BE2hEw8JUuM9XQYF5Zw/exec";
const GOOGLE_SHEET_URL = "https://docs.google.com/spreadsheets/d/15oHCDIlR977wrf6IEPXucIIaK53rzfeErMl1fZ7EeRg/edit?usp=drivesdk";
const PLACEHOLDER_IMG = "https://images.unsplash.com/photo-1584308972272-9e4e7685e80f?q=80&w=600&auto=format&fit=crop";

const COLORS = {
  bg: "#F7F5F0", ink: "#1C2B26", green: "#1F5E4C", greenDark: "#16241F",
  greenLight: "#2A7A63", gold: "#C9A15A", line: "#E3DFD3", chip: "#F1EEE5", chipText: "#4B564F",
};

const EXTRA_PRODUCTS = [
  { id: 1000, name: "Vitamin C 1000mg 30 Tabs", category: "Supplements", price: 3200, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop", stock: 60 },
  { id: 1001, name: "Coartem 20/120mg", category: "Antimalarial", price: 2500, type: "Pharmacy", rating: 4.7, img: "https://images.unsplash.com/photo-1631549916768-4119b2e5f926?q=80&w=600&auto=format&fit=crop", stock: 45 },
  { id: 1002, name: "ORS + Zinc Sachets", category: "Rehydration", price: 800, type: "Pharmacy", rating: 4.6, img: "https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=600&auto=format&fit=crop", stock: 90 },
  { id: 1003, name: "Ciprofloxacin 500mg 10 Tabs", category: "Antibiotics", price: 5620, type: "Pharmacy", rating: 4.7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiLxdu3R6FVcRdZOlyQG8R8gvWuNAJ_JuALb8Te-g5Mw&s=10", stock: 35 },
  { id: 1004, name: "First Aid Kit (Complete)", category: "Devices", price: 9500, type: "Pharmacy", rating: 4.9, img: "https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=600&auto=format&fit=crop", stock: 20 },
  { id: 1005, name: "Hand Sanitizer 500ml", category: "Antiseptic", price: 2200, type: "Pharmacy", rating: 4.5, img: "https://images.unsplash.com/photo-1584744982491-665216d95f8b?q=80&w=600&auto=format&fit=crop", stock: 75 },
  { id: 1006, name: "Vitamin D3 + Calcium 60 Caps", category: "Supplements", price: 5200, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1550572017-edd951b55104?q=80&w=600&auto=format&fit=crop", stock: 40 },
  { id: 1007, name: "Cough Syrup 100ml", category: "Cold & Flu", price: 1800, type: "Pharmacy", rating: 4.6, img: "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?q=80&w=600&auto=format&fit=crop", stock: 55 },
  { id: 1008, name: "Glucometer Test Kit", category: "Devices", price: 15000, type: "Pharmacy", rating: 4.7, img: "https://images.unsplash.com/photo-1579154204601-01588f351e67?q=80&w=600&auto=format&fit=crop", stock: 18 },
  { id: 1009, name: "Baby Diaper Rash Cream", category: "Baby Care", price: 2600, type: "Pharmacy", rating: 4.8, img: "https://images.unsplash.com/photo-1584017911766-d451b3d0e843?q=80&w=600&auto=format&fit=crop", stock: 50 },
  { id: 1010, name: "Vitafoam Deluxe 6x6", category: "Mattress", price: 145000, type: "Foam", rating: 4.9, img: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=600&auto=format&fit=crop", stock: 9 },
  { id: 1011, name: "Vitafoam Kids Mattress 3x6", category: "Mattress", price: 60000, type: "Foam", rating: 4.7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSord3581-0xyo5xRRnfDh4_R5-RIWIMnn6IQ19BJ80Mg&s=10", stock: 22 },
  { id: 1012, name: "Bunk Bed Frame (Double)", category: "Beds", price: 165000, type: "Foam", rating: 4.6, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTBi00UOVEDnWjrxhmURYke5qI3h4UvhXOkEkBadFn0Wg&s=10", stock: 4 },
  { id: 1013, name: "Foam Bed Base 6x6", category: "Beds", price: 55000, type: "Foam", rating: 4.5, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRas-oyIKFlfm-Hu67IIoDHRfal8Ct4h0mDv-EAcG5YAw&s=10", stock: 12 },
  { id: 1014, name: "Vitafoam Memory Pillow", category: "Pillows", price: 18500, type: "Foam", rating: 4.8, img: "https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?q=80&w=600&auto=format&fit=crop", stock: 25 },
  { id: 1015, name: "Mattress Protector 6x6", category: "Accessories", price: 12000, type: "Foam", rating: 4.6, img: "data:image/webp;base64,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", stock: 30 },
  { id: 1016, name: "Vitafoam Baby Cot Mattress", category: "Mattress", price: 32000, type: "Foam", rating: 4.7, img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSS61tg3erGE1q2wMe_-YCk72-zNrwEwAouq-TYB4L3Sw&s", stock: 16 },
]

// ===== COMPONENTS =====
const ProductCard = ({ item, onAdd, qty }) => (
  <div className="rounded-2xl overflow-hidden transition hover:shadow-2xl group bg-white flex-col" style={{ border: `1px solid ${COLORS.line}` }}>
    <div className="overflow-hidden h-56 relative">
      <img src={item.img} alt={item.name} className="h-full w-full object-cover group-hover:scale-110 transition duration-500" />
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-white/90 px-2 py-1 rounded-full">
        <Star size={14} fill={COLORS.gold} color={COLORS.gold} />
        <span className="text-xs font-semibold">{item.rating}</span>
      </div>
    </div>
    <div className="p-5 flex flex-col flex-1">
      <p className="text-xs text-gray-400 mb-1 uppercase tracking-wide">{item.category}</p>
      <h3 className="font-bold text-base mb-2 leading-snug h-12">{item.name}</h3>
      <p className="text-2xl font-bold mb-2" style={{ color: COLORS.green }}>₦{item.price.toLocaleString()}</p>
      <p className="text-xs text-gray-500 mb-4">Stock: {item.stock}</p>
      <div className="mt-auto">
        {qty === 0? (
          <button onClick={() => onAdd(1)} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm transition hover:opacity-90" style={{ background: COLORS.green, color: "#fff" }}>
            <ShoppingCart size={16} /> Add to Cart
          </button>
        ) : (
          <div className="w-full flex items-center justify-between rounded-xl overflow-hidden" style={{ border: `1px solid ${COLORS.green}` }}>
            <button onClick={() => onAdd(-1)} className="px-4 py-3 hover:bg-[#F1EEE5] transition" style={{ color: COLORS.green }}><Minus size={16} /></button>
            <span className="font-bold text-sm" style={{ color: COLORS.green }}>{qty} in cart</span>
            <button onClick={() => onAdd(1)} className="px-4 py-3 hover:bg-[#F1EEE5] transition" style={{ color: COLORS.green }}><Plus size={16} /></button>
          </div>
        )}
      </div>
    </div>
  </div>
);

const CategoryChip = ({ label, active, onClick, icon: Icon }) => (
  <button onClick={onClick} className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition whitespace-nowrap"
    style={active? { background: COLORS.green, color: "#fff" } : { background: COLORS.chip, color: COLORS.chipText }}>
    {Icon && <Icon size={16} />} {label}
  </button>
);

// ===== MAIN APP =====
export default function PharmacyFoamStore() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [selectedStore, setSelectedStore] = useState("Pharmacy");
// or "All" if you want both initially
  const [showPassword, setShowPassword] = useState(false);
  const [cart, setCart] = useState(() => {
    try { return JSON.parse(localStorage.getItem("ak_johnson_cart")) || []; } catch { return []; }
  });
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => { localStorage.setItem("ak_johnson_cart", JSON.stringify(cart)); }, [cart]);

  const waLink = (number, msg) => `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;

  // Fetch products
  useEffect(() => {
    fetch(SHEET_API_URL)
     .then(res => res.json())
     .then(data => {
        const formatted = data.filter(p => p.Name).map((p, i) => ({
          id: i + 1, name: p.Name, category: p.Category, price: Number(p.Price) || 0,
          type: p.Type || "Pharmacy", rating: Number(p.Rating) || 4.8, img: p.ImageURL || PLACEHOLDER_IMG, stock: p.Stock || 0,
        }));
        setProducts([...formatted,...EXTRA_PRODUCTS]);
        setLoading(false);
      })
     .catch(() => { setProducts(EXTRA_PRODUCTS); setLoading(false); });
  }, []);

const categories = useMemo(() => {

    const storeProducts = products.filter(
        p => p.type === selectedStore
    );

    return [
        "All",
        ...new Set(storeProducts.map(p => p.category))
    ];

}, [products, selectedStore]);
  const filtered = useMemo(() => {

    return products.filter(product => {

        const matchStore =
            product.type === selectedStore;

        const matchCategory =
            selectedCategory === "All" ||
            product.category === selectedCategory;

        const matchSearch =
            product.name
                .toLowerCase()
                .includes(search.toLowerCase());

        return matchStore && matchCategory && matchSearch;

    });

}, [
    products,
    selectedStore,
    selectedCategory,
    search
]);

  const cartCount = useMemo(() => cart.reduce((sum, i) => sum + i.qty, 0), [cart]);
  const cartTotal = useMemo(() => cart.reduce((sum, i) => sum + i.qty * i.price, 0), [cart]);
  const qtyInCart = (id) => cart.find(i => i.id === id)?.qty || 0;

  const addToCart = (item, delta = 1) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) {
        const newQty = existing.qty + delta;
        if (newQty <= 0) return prev.filter(i => i.id!== item.id);
        return prev.map(i => i.id === item.id? {...i, qty: newQty } : i);
      }
      return [...prev, { id: item.id, name: item.name, price: item.price, img: item.img, qty: 1 }];
    });
    setCartOpen(true);
  };
  const removeFromCart = (id) => setCart(prev => prev.filter(i => i.id!== id));

  const checkoutMessage = () => {
    const lines = cart.map(i => `• ${i.name} x${i.qty} — ₦${(i.price * i.qty).toLocaleString()}`);
    return `Hello ${SHOP_NAME}, I'd like to order:\n${lines.join("\n")}\n\nTotal: ₦${cartTotal.toLocaleString()}`;
  };

  const verifyAdmin = () => {
    if (adminPassword === ADMIN_PASSCODE) {
      window.open(GOOGLE_SHEET_URL, "_blank");
      setShowAdminModal(false); setAdminPassword(""); setPasswordError("");
    } else { setPasswordError("Incorrect password"); }
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: COLORS.bg, color: COLORS.ink }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Inter:wght@400;500;600;700&display=swap');.display { font-family: 'Fraunces', serif; }`}</style>

      {/* NAVBAR */}
      <nav style={{ background: COLORS.bg, borderBottom: `1px solid ${COLORS.line}` }} className="sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div style={{ background: COLORS.green }} className="w-10 h-10 rounded-full flex items-center justify-center"><Pill size={20} color={COLORS.bg} /></div>
            <span className="display font-bold text-xl" style={{ color: COLORS.green }}>{SHOP_NAME}</span>
          </div>
          <div className="hidden md:flex items-center gap-3">
            <button onClick={() => setShowAdminModal(true)} className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-sm" style={{ border: `1px solid ${COLORS.green}`, color: COLORS.green }}><Lock size={15} /><Settings size={15} /> Manage</button>
            <a href={waLink(ORDERS_WA, `Hello ${SHOP_NAME}, I'd like to place an order.`)} target="_blank" className="flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm" style={{ background: COLORS.green, color: COLORS.bg }}><Phone size={15} /> Orders</a>
            <button onClick={() => setCartOpen(true)} className="relative flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm" style={{ background: COLORS.gold, color: COLORS.ink }}><ShoppingBag size={15} /> Cart {cartCount > 0 && <span className="ml-1">({cartCount})</span>}</button>
          </div>
          <div className="md:hidden flex gap-3">
            <button onClick={() => setCartOpen(true)}><ShoppingBag size={24} /></button>
            <button onClick={() => setMenuOpen(!menuOpen)}>{menuOpen? <X size={24} /> : <Menu size={24} />}</button>
          </div>
        </div>
      </nav>

      {menuOpen && (
  <div
    className="md:hidden border-b bg-white shadow-lg"
    style={{ borderColor: COLORS.line }}
  >
    <div className="flex flex-col p-4 gap-3">

      <button
        onClick={() => {
          setShowAdminModal(true);
          setMenuOpen(false);
        }}
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          border: `1px solid ${COLORS.green}`,
          color: COLORS.green,
        }}
      >
        <Lock size={18} />
        <Settings size={18} />
        Manage
      </button>

      <a
        href={waLink(
          ORDERS_WA,
          `Hello ${SHOP_NAME}, I'd like to place an order.`
        )}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-3 px-4 py-3 rounded-xl"
        style={{
          background: COLORS.green,
          color: "#fff",
        }}
      >
        <Phone size={18} />
        Orders
      </a>

      <button
        onClick={() => {
          setCartOpen(true);
          setMenuOpen(false);
        }}
        className="flex items-center justify-between px-4 py-3 rounded-xl"
        style={{
          background: COLORS.gold,
          color: COLORS.ink,
        }}
      >
        <div className="flex items-center gap-3">
          <ShoppingBag size={18} />
          Cart
        </div>

        {cartCount > 0 && (
          <span className="font-bold">{cartCount}</span>
        )}
      </button>

    </div>
  </div>
)}

      {/* HERO */}
      <section style={{ background: `linear-gradient(135deg, ${COLORS.green} 0%, ${COLORS.greenLight} 100%)` }} className="text-white py-20 px-6 text-center">
        <h1 className="display text-4xl md:text-6xl font-bold mb-6">Health & Comfort In One Place</h1>
        <p className="text-lg mb-8 opacity-90">Genuine medicines, quality Vitafoam mattresses. Ask our pharmacist anything.</p>
      </section>

      {/* TRUST STRIP */}
      <section className="py-16 px-6 container mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm" style={{ border: `1px solid ${COLORS.line}` }}><ShieldCheck size={28} style={{ color: COLORS.green }} /><div><h3 className="font-bold text-lg">100% Genuine</h3><p className="text-sm text-gray-600">NAFDAC approved drugs & authentic Vitafoam.</p></div></div>
          <div className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm" style={{ border: `1px solid ${COLORS.line}` }}><Truck size={28} style={{ color: COLORS.green }} /><div><h3 className="font-bold text-lg">Fast Delivery</h3><p className="text-sm text-gray-600">Same day delivery within Otun-Ekiti.</p></div></div>
          <div className="bg-white rounded-2xl p-6 flex gap-4 items-start shadow-sm" style={{ border: `1px solid ${COLORS.line}` }}><Clock size={28} style={{ color: COLORS.green }} /><div><h3 className="font-bold text-lg">24/7 Support</h3><p className="text-sm text-gray-600">Message us on WhatsApp anytime.</p></div></div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="products" className="py-16 px-6 container mx-auto" style={{ background: "#FFFFFF" }}>
        <h2 className="display text-4xl font-bold text-center mb-8">Shop Products</h2>
        <div className="flex justify-center gap-4 mb-8">

<button
  onClick={() => {
    setSelectedStore("Pharmacy");
    setSelectedCategory("All");
  }}
  className={`flex-1 flex items-center justify-center gap-2
    py-3 px-4
    rounded-2xl
    font-semibold
    text-sm sm:text-base
    transition-all duration-300
    ${
      selectedStore === "Pharmacy"
        ? "bg-green-700 text-white"
        : "bg-white border border-gray-300 text-gray-700"
    }`}
>
  <Pill className="w-5 h-5 flex-shrink-0" />
  <span>Pharmacy Store</span>
</button>

<button
  onClick={() => {
    setSelectedStore("Foam");
    setSelectedCategory("All");
  }}
  className={`flex-1 flex items-center justify-center gap-2
    py-3 px-4
    rounded-2xl
    font-semibold
    text-sm sm:text-base
    transition-all duration-300
    ${
      selectedStore === "Foam"
        ? "bg-green-700 text-white"
        : "bg-white border border-gray-300 text-gray-700"
    }`}
>
  <BedDouble className="w-5 h-5 flex-shrink-0" />
  <span>Foam Store</span>
</button>

</div>
        <div className="max-w-2xl mx-auto mb-6 relative">

          <Search className="absolute left-5 top-4 text-gray-400" size={20} />
          <input type="text" placeholder="Search drugs, mattresses, brands..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-14 pr-4 py-4 rounded-full focus:outline-none focus:ring-2 text-sm shadow-sm" 
          style={{ border: `1px solid ${COLORS.line}` }} />
        </div>
        <div className="flex gap-3 mb-10 overflow-x-auto pb-2 justify-center">
          {categories.map(cat => <CategoryChip key={cat} label={cat} active={selectedCategory === cat} onClick={() => setSelectedCategory(cat)} icon={cat === "All"? Filter : cat.includes("Mattress") || cat.includes("Bed")? BedDouble : Pill} />)}
        </div>
        {loading? <p className="text-center py-16">Loading products...</p> : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {filtered.map(item => <ProductCard key={item.id} item={item} qty={qtyInCart(item.id)} onAdd={(delta) => addToCart(item, delta)} />)}
            {filtered.length === 0 && <p className="col-span-full text-center text-gray-400 py-12">No products found</p>}
          </div>
        )}
      </section>

     

     <FloatingPharmacistButton
  waLink={waLink}
  pharmacistNumber={PHARMACIST_WA}
  colors={COLORS}
/>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed inset-0 z-[60] flex justify-end">
          <div className="absolute inset-0 bg-black/40" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md h-full bg-white shadow-2xl flex flex-col">
            <div className="flex items-center justify-between px-6 py-5" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
              <h3 className="display text-2xl font-bold" style={{ color: COLORS.green }}>Your Cart</h3>
              <button onClick={() => setCartOpen(false)}><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto px-6 py-4">
              {cart.length === 0? (
                <div className="h-full flex flex-col items-center justify-center text-center text-gray-400 gap-3">
                  <ShoppingBag size={40} /><p>Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex flex-col gap-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-3 items-center pb-4" style={{ borderBottom: `1px solid ${COLORS.line}` }}>
                      <img src={item.img} alt={item.name} className="w-16 h-16 rounded-xl object-cover" />
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{item.name}</p>
                        <p className="text-sm font-bold" style={{ color: COLORS.green }}>₦{item.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button onClick={() => addToCart(item, -1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.chip }}><Minus size={14} /></button>
                          <span className="text-sm font-semibold w-5 text-center">{item.qty}</span>
                          <button onClick={() => addToCart(item, 1)} className="w-7 h-7 rounded-full flex items-center justify-center" style={{ background: COLORS.chip }}><Plus size={14} /></button>
                        </div>
                      </div>
                      <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-500"><Trash2 size={18} /></button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="px-6 py-5" style={{ borderTop: `1px solid ${COLORS.line}` }}>
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold text-gray-500">Subtotal</span>
                  <span className="text-2xl font-bold" style={{ color: COLORS.green }}>₦{cartTotal.toLocaleString()}</span>
                </div>
                <a href={waLink(ORDERS_WA, checkoutMessage())} target="_blank" className="w-full flex items-center justify-center gap-2 py-4 rounded-full font-bold text-base" style={{ background: COLORS.green, color: "#fff" }}>
                  <Phone size={18} /> Checkout on WhatsApp
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ADMIN MODAL */}
      {showAdminModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[100] px-4">
          <div className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl" style={{ border: `1px solid ${COLORS.line}` }}>
            <button onClick={() => { setShowAdminModal(false); setAdminPassword(""); setPasswordError(""); }} className="absolute top-5 right-5"><X size={22} /></button>
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5" style={{ background: COLORS.green, color: "white" }}><Lock size={30} /></div>
            <h2 className="display text-3xl font-bold text-center mb-2" style={{ color: COLORS.green }}>Admin Access</h2>
            <p className="text-center text-gray-500 mb-6">Enter your password to manage products.</p>
            <div className="relative">
              <input type={showPassword? "text" : "password"} value={adminPassword} onChange={(e) => { setAdminPassword(e.target.value); setPasswordError(""); }} onKeyDown={(e) => { if (e.key === "Enter") verifyAdmin(); }}
                placeholder="Enter password" className="w-full px-5 py-4 pr-14 rounded-xl outline-none" style={{ border: `1px solid ${COLORS.line}` }} />
              <button type="button" onClick={() => setShowPassword((prev) =>!prev)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700">
                {showPassword? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {passwordError && <p className="text-red-500 text-sm mt-2">{passwordError}</p>}
            <button onClick={verifyAdmin} className="w-full mt-6 py-4 rounded-xl font-bold transition hover:opacity-90" style={{ background: COLORS.green, color: "white" }}>Unlock</button>
          </div>
        </div>
      )}
    </div>
  );
}