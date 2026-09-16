import { MapPin, Phone, Mail, Clock, Heart, Sparkles, MessageCircle, ArrowUp } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';
import logoTrans from '../assets/images/logo trans.jpg';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-stone-700 border-t border-stone-200 relative">
      {/* Top Banner with Brand Slogan */}
      <div className="bg-[#7c0f1e] text-white py-5 px-4 text-center shadow-xs">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 justify-center">
            <Heart className="w-4 h-4 fill-amber-300 text-amber-300" />
            <span className="font-serif italic text-base sm:text-lg text-amber-100 font-medium">
              "{STORE_DETAILS.tagline}"
            </span>
          </div>
          <div className="text-xs uppercase tracking-widest text-amber-200 font-bold">
            {STORE_DETAILS.slogan}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#7c0f1e] bg-white p-1 shrink-0 shadow-sm flex items-center justify-center">
                <img src={logoTrans} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-stone-950 tracking-tight leading-none">
                  Janine's Clothing
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-[#7c0f1e] font-bold uppercase mt-1">
                  Hermanus Boutique
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-600 leading-relaxed max-w-sm">
              Hermanus’s premier destination for quality pre-loved ladies fashion, evening gowns, designer shoes, and luxury handbags. Bringing affordable elegance to every wardrobe.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-50 border border-stone-200 text-[11px] text-[#7c0f1e] font-semibold shadow-2xs">
                <Sparkles className="w-3 h-3 text-amber-600" />
                <span>New Curated Arrivals Every Week</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7c0f1e] font-serif">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="text-stone-600 hover:text-[#7c0f1e] transition-colors font-medium">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="text-stone-600 hover:text-[#7c0f1e] transition-colors font-medium">
                  Latest Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="text-stone-600 hover:text-[#7c0f1e] transition-colors font-medium">
                  Clothing, Shoes & Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="text-stone-600 hover:text-[#7c0f1e] transition-colors font-medium">
                  About Janine's
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="text-stone-600 hover:text-[#7c0f1e] transition-colors font-medium">
                  Visit 21 Mimosa Street
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7c0f1e] font-serif">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-stone-700">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#7c0f1e] shrink-0 mt-0.5" />
                <span>
                  {STORE_DETAILS.street}, {STORE_DETAILS.town}, Western Cape, {STORE_DETAILS.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#7c0f1e] shrink-0" />
                <a href={`tel:${STORE_DETAILS.phones[0].tel}`} className="text-stone-800 hover:text-[#7c0f1e] transition-colors font-medium">
                  {STORE_DETAILS.phones[0].display} (Shop)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-800 transition-colors text-emerald-700 font-semibold"
                >
                  {STORE_DETAILS.phones[1].display} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#7c0f1e] shrink-0" />
                <a href={`mailto:${STORE_DETAILS.email}`} className="text-stone-800 hover:text-[#7c0f1e] transition-colors font-medium">
                  {STORE_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Boutique Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-[#7c0f1e] font-serif">
              Trading Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              {STORE_DETAILS.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-stone-700 py-1 border-b border-stone-100">
                  <span className="font-semibold text-stone-800">{h.days}</span>
                  <span className="text-stone-900 font-medium">{h.times}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-lg bg-stone-50 hover:bg-stone-100 text-stone-700 text-xs flex items-center justify-center gap-2 transition-colors border border-stone-200"
              >
                <ArrowUp className="w-3.5 h-3.5 text-[#7c0f1e]" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits */}
        <div className="mt-14 pt-8 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Janine's Clothing Hermanus. All rights reserved.</p>
          <div>
            <span>Website Designed by <strong className="text-stone-800">Obsidian Studio Designs</strong></span>
          </div>
        </div>
      </div>
    </footer>
  );
}
