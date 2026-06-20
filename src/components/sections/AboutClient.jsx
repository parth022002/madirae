"use client";

import { useState } from "react";
import Image from "next/image";
import { MapPin, Phone, Clock, FileText } from "lucide-react";
import PageTransition from "@/components/animations/PageTransition";
import ScrollReveal from "@/components/animations/ScrollReveal";

const timeline = [
  ["Sourcing", "Himalayan water, coastal cane, Goan cashew apples, Ratnagiri Alphonso, and wild Mahua flowers."],
  ["Distillation", "Small-batch copper work, clean fermentation, patient oak, and controlled carbonation."],
  ["Heritage", "Mahua flowers, Rajputana saffron notes, Goan Feni, and mountain Chhang reimagined for modern bars."],
  ["Ritual", "Bottle design, pairing logic, and cocktail essentials built for memorable social moments."]
];

const manufacturingUnits = [
  {
    name: "Goan Reserve Distillery",
    location: "Near Goa Border, Goa/Karnataka Region",
    description: "Dedicated to the copper pot still distillation of single-press cashew apples for heritage Feni and slow cold-fermented wildflower honey meads.",
    type: "Distillery & Meadery",
    status: "Active Operations",
    image: "/images/about/goan_distillery.jpeg"
  },
  {
    name: "Sahyadri Craft Brewery & Winery",
    location: "Sahyadri Ranges, Maharashtra",
    description: "Our core facility for brewing fruit-forward sour ales and stouts, and fermenting Deccan Jamun and Karonda berry wines.",
    type: "Brewery & Winery",
    status: "Active Operations",
    image: "/images/about/sahyadri_brewery.jpeg"
  }
];

const stores = [
  {
    name: "MADIRÆ & Co. Flagship Boutique",
    state: "Karnataka",
    city: "Bengaluru",
    address: "12/4, Richmond Road, Indiranagar Hub, Bengaluru, Karnataka - 560025",
    phone: "+91 80 4910 2855",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-CL2-KA-560025-2026",
    image: "/images/stores/1.jpg",
    featured: true
  },
  {
    name: "Koramangala Heritage Cellars",
    state: "Karnataka",
    city: "Bengaluru",
    address: "104, 5th Block, Koramangala Industrial Layout, Bengaluru, Karnataka - 560095",
    phone: "+91 80 4322 8110",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-CL2-KA-560095-2026",
    image: "/images/stores/2.jpg",
    featured: false
  },
  {
    name: "Koregaon Park Select Lounge",
    state: "Maharashtra",
    city: "Pune",
    address: "12, Lane No. 6, Koregaon Park, Pune, Maharashtra - 411001",
    phone: "+91 20 4911 2044",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-MH-FL3-PUN-411001-2026",
    image: "/images/stores/3.jpg",
    featured: false
  },
  {
    name: "Bandra West Boutique Reserves",
    state: "Maharashtra",
    city: "Mumbai",
    address: "88, Carter Road, Bandra West, Mumbai, Maharashtra - 400050",
    phone: "+91 22 2640 1844",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-MH-FL3-MUM-400050-2026",
    image: "/images/stores/4.jpg",
    featured: false
  },
  {
    name: "Nungambakkam Premium Cellars",
    state: "Tamil Nadu",
    city: "Chennai",
    address: "45, Khader Nawaz Khan Road, Nungambakkam, Chennai, Tamil Nadu - 600006",
    phone: "+91 44 2822 9311",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-TN-FL2-CH-600006-2026",
    image: "/images/stores/5.jpg",
    featured: false
  },
  {
    name: "Jubilee Hills Selection Lounge",
    state: "Telangana",
    city: "Hyderabad",
    address: "12, Road No. 36, Jubilee Hills, Hyderabad, Telangana - 500033",
    phone: "+91 40 2355 4910",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-TG-FL2-HYD-500033-2026",
    image: "/images/stores/6.jpg",
    featured: false
  },
  {
    name: "Beach Road Heritage Spirits",
    state: "Andhra Pradesh",
    city: "Visakhapatnam",
    address: "102, Beach Road, Pandurangapuram, Visakhapatnam, Andhra Pradesh - 530003",
    phone: "+91 891 256 4930",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-AP-CL2-VSP-530003-2026",
    image: "/images/stores/7.jpg",
    featured: false
  },
  {
    name: "Hazratganj Connoisseur Vault",
    state: "Uttar Pradesh",
    city: "Lucknow",
    address: "18/2, Mahatma Gandhi Marg, Hazratganj, Lucknow, Uttar Pradesh - 226001",
    phone: "+91 522 402 1899",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-UP-FL2-LKO-226001-2026",
    image: "/images/stores/8.jpg",
    featured: false
  },
  {
    name: "Park Street Distill Emporium",
    state: "West Bengal",
    city: "Kolkata",
    address: "56, Park Street, Near Assembly Place, Kolkata, West Bengal - 700016",
    phone: "+91 33 2229 4801",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-WB-FL2-KOL-700016-2026",
    image: "/images/stores/9.jpg",
    featured: false
  },
  {
    name: "C-Scheme Royal Cellars",
    state: "Rajasthan",
    city: "Jaipur",
    address: "9, Bhagwan Das Road, C-Scheme, Jaipur, Rajasthan - 302001",
    phone: "+91 141 405 2811",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-RJ-CL2-JPR-302001-2026",
    image: "/images/stores/10.jpg",
    featured: false
  },
  {
    name: "Sector 26 Craft Lounge Outpost",
    state: "Punjab",
    city: "Chandigarh Hub",
    address: "412, Sector 26 East, Chandigarh Corridor, Punjab - 160019",
    phone: "+91 172 279 4910",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-PB-FL2-CHD-160019-2026",
    image: "/images/stores/11.jpg",
    featured: false
  },
  {
    name: "Golf Course Road Elite Vault",
    state: "Haryana",
    city: "Gurugram",
    address: "B-24, Central Plaza, Golf Course Road, Sector 54, Gurugram, Haryana - 122002",
    phone: "+91 124 492 1855",
    hours: "10:00 AM - 10:00 PM",
    license: "EX-HR-FL2-GGN-122002-2026",
    image: "/images/stores/12.jpg",
    featured: false
  }
];

export default function AboutClient() {
  const [selectedState, setSelectedState] = useState("All");

  const statesList = [
    "All", "Karnataka", "Tamil Nadu", "Maharashtra", "Telangana", 
    "Andhra Pradesh", "Uttar Pradesh", "West Bengal", "Rajasthan", "Punjab", "Haryana"
  ];

  const filteredStores = selectedState === "All" 
    ? stores 
    : stores.filter(store => store.state === selectedState);

  return (
    <PageTransition>
      {/* Title Hero Block */}
      <section className="relative min-h-[60vh] overflow-hidden pt-28 flex items-center">
        <Image src="/images/products/P14/Product-images-P14-P14.png" alt="Rajputana Kesar Kasturi bottle" fill priority className="object-cover opacity-60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 z-10">
          <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">Our Heritage</p>
          <h1 className="mt-4 max-w-4xl font-display font-serif text-4xl sm:text-6xl text-champagne leading-tight">
            Indian Ingredients, Patient Craft, Modern Taste.
          </h1>
        </div>
      </section>

      {/* Brand Story Section */}
      <section className="section-padding relative overflow-hidden bg-mahogany">
        <div className="absolute inset-0 opacity-15">
          <Image src="/images/products/P40/Product-images-P40-P40.png" alt="MADIRÆ & Co. cocktail kit" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#171412] via-[#171412]/95 to-black/80" />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-4 sm:px-6 lg:grid-cols-[0.8fr_1fr] lg:px-8 z-10">
          <ScrollReveal>
            <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">Brand History</p>
            <h2 className="section-title mt-3 font-serif">Crafting A Legacy</h2>
            <p className="mt-6 text-sm leading-7 text-smoke font-sans">
              Headquartered in Bengaluru and available in 10+ states across India, MADIRÆ & Co. began with a simple idea: Indian ingredients, regions, and drinking occasions can create a brand that feels aspirational, approachable, and proudly local.
            </p>
          </ScrollReveal>
          <div className="grid gap-4">
            {timeline.map(([title, copy], index) => (
              <ScrollReveal key={title} className="bg-black/40 border border-white/5 p-5 rounded-xl">
                <div className="flex gap-5 font-sans">
                  <span className="font-display font-serif text-3xl text-gold">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display font-serif text-xl text-champagne">{title}</h3>
                    <p className="mt-2 text-xs leading-6 text-smoke opacity-80">{copy}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Manufacturing Facilities Section */}
      <section className="section-padding bg-[#070605] relative overflow-hidden border-b border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mb-12 text-center max-w-3xl mx-auto">
            <span className="inline-block rounded-full bg-gold/10 border border-gold/25 px-4 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Manufacturing & Distillation
            </span>
            <h2 className="section-title mt-3 font-serif">State-of-the-Art Facilities</h2>
            <p className="mt-3 text-xs leading-6 text-smoke opacity-80 font-sans">
              Our blends are crafted across two specialized facilities, carefully chosen to stay close to native ingredients and traditions.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {manufacturingUnits.map((unit, idx) => (
              <div key={idx} className="bg-[#121110] border border-white/10 rounded-2xl overflow-hidden flex flex-col justify-between group hover:border-gold/30 transition-all duration-300 shadow-lg">
                {/* Image Showcase Panel */}
                <div className="relative aspect-video w-full overflow-hidden bg-black border-b border-white/10">
                  <Image 
                    src={unit.image} 
                    alt={unit.name} 
                    fill 
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  <span className="absolute top-4 left-4 inline-flex rounded bg-emerald-500/10 px-2.5 py-0.5 text-[9px] font-bold text-emerald-400 border border-emerald-500/20 backdrop-blur-sm">
                    {unit.status}
                  </span>
                  <span className="absolute bottom-4 left-4 text-[10px] uppercase tracking-wider text-gold font-bold font-sans">
                    {unit.type}
                  </span>
                </div>

                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className="font-display font-serif text-2xl text-champagne">{unit.name}</h3>
                    <p className="text-xs text-smoke opacity-80 mt-3 leading-6 font-sans">{unit.description}</p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-2 text-xs text-smoke opacity-60 font-sans">
                    <MapPin className="h-4 w-4 text-gold shrink-0" />
                    <span>{unit.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Boutique Stores Section */}
      <section id="boutique-stores" className="section-padding bg-[#0e0d0c] relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          
          <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-white/10 pb-6">
            <div>
              <p className="text-xs uppercase tracking-widest text-gold font-bold font-sans">Boutique Locations</p>
              <h2 className="section-title mt-2 font-serif">Our Licensed Outlets</h2>
            </div>
            
            {/* Filter Tabs */}
            <div className="flex flex-wrap gap-2">
              {statesList.map(st => (
                <button
                  key={st}
                  onClick={() => setSelectedState(st)}
                  className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider rounded border transition duration-300 ${
                    selectedState === st
                      ? "bg-gold border-gold text-ink"
                      : "bg-black/40 border-white/10 text-smoke hover:border-gold/30"
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Featured Store Panel */}
          {selectedState === "All" && (
            <div className="mb-12 bg-black/40 border border-gold/20 rounded-2xl overflow-hidden shadow-lg relative z-10">
              <div className="grid lg:grid-cols-[1.1fr_0.9fr] items-stretch">
                <div className="relative min-h-[300px] lg:min-h-[400px]">
                  <Image 
                    src="/images/stores/1.jpg" 
                    alt="MADIRÆ Flagship Store Interior" 
                    fill 
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 55vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/25 to-transparent" />
                  <div className="absolute top-5 left-5 bg-gold text-ink text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded">
                    Flagship Boutique
                  </div>
                </div>
                <div className="p-8 sm:p-10 flex flex-col justify-between space-y-6">
                  <div>
                    <span className="text-xs uppercase tracking-wider text-gold font-bold font-sans">Featured Hub</span>
                    <h3 className="font-display font-serif text-3xl text-champagne mt-2">MADIRÆ Indiranagar Flagship</h3>
                    <p className="text-xs leading-6 text-smoke/90 mt-4 font-sans">
                      Our flagship lounge in Bengaluru's Indiranagar showcases the complete MADIRÆ & Co. catalog. Experience physical tastings, explore our ingredients timeline, and receive personalized pairing consultations from our certified sommeliers.
                    </p>
                  </div>
                  
                  <div className="space-y-3.5 border-t border-white/10 pt-6 text-xs font-sans text-smoke opacity-80">
                    <div className="flex items-start gap-3">
                      <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                      <span>12/4, Richmond Road, Indiranagar Hub, Bengaluru, Karnataka - 560025</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-gold shrink-0" />
                      <span>10:00 AM - 10:00 PM Daily (Dry Days Closed)</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gold shrink-0" />
                      <a href="tel:+918049102855" className="hover:underline">+91 80 4910 2855</a>
                    </div>
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-gold shrink-0" />
                      <span className="font-mono text-[10px]">Excise License: EX-CL2-KA-560025-2026</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Grid of Stores */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredStores.map((store, idx) => (
              <div 
                key={idx}
                className="bg-[#121110] border border-white/10 rounded-xl overflow-hidden shadow-md flex flex-col justify-between hover:border-gold/25 transition duration-300"
              >
                <div>
                  <div className="relative aspect-[16/10] bg-black/80">
                    <Image 
                      src={store.image} 
                      alt={store.name} 
                      fill 
                      className="object-cover opacity-80 hover:opacity-100 transition duration-500"
                      sizes="(max-width: 768px) 50vw, 30vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur border border-white/10 px-2 py-0.5 rounded text-[9px] text-gold uppercase tracking-wider font-bold font-sans">
                      {store.city}, {store.state}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="font-display font-serif text-xl text-champagne mb-3">{store.name}</h3>
                    <div className="space-y-3 font-sans text-xs text-smoke opacity-80 leading-5">
                      <div className="flex items-start gap-2.5">
                        <MapPin className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                        <span>{store.address}</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Clock className="h-4 w-4 text-gold shrink-0" />
                        <span>{store.hours} (Dry Days Closed)</span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <Phone className="h-4 w-4 text-gold shrink-0" />
                        <a href={`tel:${store.phone.replaceAll(" ", "")}`} className="hover:underline">{store.phone}</a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0 mt-4">
                  <div className="border-t border-white/5 pt-3 flex items-center gap-2 text-[9px] font-mono text-smoke opacity-60">
                    <FileText className="h-3.5 w-3.5 text-gold" />
                    <span>Lic: {store.license}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredStores.length === 0 && (
            <div className="text-center py-20 bg-black/30 border border-white/5 rounded-xl">
              <MapPin className="h-10 w-10 text-smoke opacity-40 mx-auto mb-4" />
              <p className="text-xs text-smoke font-sans">No partner boutiques registered in {selectedState} currently.</p>
            </div>
          )}

        </div>
      </section>
    </PageTransition>
  );
}
