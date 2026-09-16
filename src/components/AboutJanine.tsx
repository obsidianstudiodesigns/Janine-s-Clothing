import { Heart, Sparkles, Check, Recycle, MapPin, Award } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

export default function AboutJanine() {
  const values = [
    {
      icon: Sparkles,
      title: 'Curated Elegance',
      desc: 'Each garment is hand-selected for high quality, contemporary cuts, and timeless appeal.',
    },
    {
      icon: Recycle,
      title: 'Sustainable Pre-Loved Luxury',
      desc: 'Extending the lifecycle of beautiful designer pieces while making high fashion affordable.',
    },
    {
      icon: Award,
      title: 'Pristine Inspection',
      desc: 'Every item is meticulously cleaned, steamed, and checked for immaculate condition.',
    },
    {
      icon: Heart,
      title: 'Warm Personal Styling',
      desc: 'Janine provides honest advice, friendly service, and a relaxed boutique shopping experience.',
    },
  ];

  return (
    <section id="about" className="py-24 bg-[#0d0d12] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#700d1d]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Visual Showcase: Boutique & Badge */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border border-amber-500/30 shadow-2xl bg-stone-900 aspect-[4/5]">
              <img
                src="./images/boutique.jpg"
                alt="Janine's Clothing Boutique Showroom"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />

              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-[#141419]/90 backdrop-blur-md border border-amber-500/30 flex items-center gap-4 shadow-xl">
                <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-amber-400 shrink-0 bg-white shadow-md">
                  <img
                    src="./images/logo.jpg"
                    alt="Janine's Logo"
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-white text-base">Janine's Clothing</h4>
                  <p className="text-xs text-amber-300 font-medium">Hermanus, South Africa</p>
                  <p className="text-[11px] text-stone-300 mt-0.5">21 Mimosa Street</p>
                </div>
              </div>
            </div>

            {/* Accent gold frame box */}
            <div className="hidden sm:block absolute -bottom-6 -right-6 w-40 h-40 border-2 border-amber-400/20 rounded-3xl -z-10 pointer-events-none" />
          </div>

          {/* Editorial Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Hermanus, Western Cape</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Stylish Ladies Fashion with a Passion for Quality & Value
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-300 leading-relaxed font-light">
              <p>
                Nestled in beautiful <strong>Hermanus</strong>, <strong>Janine's Clothing</strong> was founded with a singular belief: every woman deserves to look and feel radiant in high-end fashion without an exorbitant price tag.
              </p>
              <p>
                As expressed on our boutique flyer, our ethos is simple yet profound: <span className="text-amber-200 font-serif italic font-normal">"Good quality pre-loved clothing at affordable prices"</span> and <span className="text-amber-200 font-serif italic font-normal">"Janine's Clothing has something for everyone!"</span>
              </p>
              <p>
                Whether you are attending a glamorous wedding in the Hemel-en-Aarde valley, a formal evening gala, or searching for chic casual blouses, designer handbags, or comfortable luxury shoes, our curated racks offer one-of-a-kind wardrobe treasures.
              </p>
            </div>

            {/* 4 Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              {values.map((val, idx) => {
                const Icon = val.icon;
                return (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-[#141419] border border-stone-800 hover:border-amber-400/50 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 text-amber-300 font-serif font-bold text-base mb-1">
                      <Icon className="w-4 h-4 text-amber-400 shrink-0" />
                      <span>{val.title}</span>
                    </div>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {val.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
