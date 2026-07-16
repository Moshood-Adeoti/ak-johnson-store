import { MapPin, Phone } from 'lucide-react';
import React from 'react'


const COLORS = {
  bg: "#F7F5F0", ink: "#1C2B26", green: "#1F5E4C", greenDark: "#16241F",
  greenLight: "#2A7A63", gold: "#C9A15A", line: "#E3DFD3", chip: "#F1EEE5", chipText: "#4B564F",
};

const SHOP_NAME = "AK Johnson Pharmacy & Stores";
 const ORDERS_WA = "2348036252259";
 const ADDRESS = "Odo Oja, Otun-Ekiti, Ekiti State, Nigeria"
 const waLink = (number, msg) => `https://wa.me/${number}?text=${encodeURIComponent(msg)}`

const Footer = () => {
  return (
    <div> 


         {/* FOOTER */}
              <footer style={{ background: COLORS.greenDark }} className="text-white py-14 px-6">
                <div className="container mx-auto text-center">
                  <h3 className="display text-3xl font-bold mb-3">{SHOP_NAME}</h3>

<div className='flex flex-col gap-3 px-4 justify-center items-center mb-6'>
    <h2 className='text-white text-2xl font-mediunm'>
        About us
    </h2>

    <p className="text-white text-sm md:text-base max-w-3xl mx-auto leading-7"> AK Johnson Pharmacy & Stores an integrative pharmacy, the leading pharmacy chain in Nigeria and the fastest growing in West Africa. We are committed to our mission of helping people 
        achieve optimum health and vitality, while delivering superior value to stakeholders.</p>
</div>

                  <p className="flex justify-center items-center gap-2 mb-4 text-sm opacity-80"><MapPin size={16} /> {ADDRESS}</p>
                  <a href={waLink(ORDERS_WA, `Hello ${SHOP_NAME}`)} target="_blank" className="inline-flex items-center gap-2 mt-4 mb-8 px-7 py-3 rounded-full font-semibold text-sm" style={{ background: COLORS.gold, color: COLORS.ink }}><Phone size={16} /> Chat with us</a>
                  <p className="text-xs opacity-50">© 2026 {SHOP_NAME}. All rights reserved.</p>
                </div>
              </footer>
    </div>
  )
}

export default Footer