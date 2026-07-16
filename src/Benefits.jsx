import React from 'react'

const data = [
{name: " Convenience ", img: "https://healthplusnigeria.com/cdn/shop/files/woman-receiving-a-package.webp?v=1716892775&width=320",  p: "No more waiting in line – have your medications delivered directly to your hom"},
{name: " Safety", img: "https://healthplusnigeria.com/cdn/shop/files/closeup_view_of_a_sealed_prescription_med.webp?v=1716892795&width=320",  p: "All our medications are sourced from certified manufacturers and pharmacies."},
{name: "Consultation", img: "https://healthplusnigeria.com/cdn/shop/files/smilng-pharmacist-consulting-on-laptop.webp?v=1716892834&width=320",  p: "Need advice? Our pharmacists are here to guide you 24/7."}

]




const Benefits = () => {
  return (
<div className="bg-green-900 w-full px-4 md:px-8 py-20">
<div className='flex md:flex-row  items-center justify-center flex-col gap-6  mx-4 rounded-lg'>
    {data.map((box, idx) => (

<div className='bg-white px-4 py-4 flex gap-4 flex-col md:flex-1 w-4/5 rounded-lg hover:scale-104 duration-500 ease-in-out' key={idx}>

<h1 className='text-black text-md md:text-xl md:font-semibold font-normal'>
{box.name}
</h1>
<p className='text-black/60 text-sm'>
    {box.p}
</p>

<img
    src={box.img}
    alt=""
    className="w-full h-52 object-cover rounded-lg"
/>



</div>

    ))}

</div>


    </div>
  )
}

export default Benefits