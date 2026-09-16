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
    <footer className="bg-[#08080a] text-stone-300 border-t border-amber-900/40 relative">
      {/* Top Banner with Brand Slogan */}
      <div className="bg-[#4d0712] text-amber-200 py-6 px-4 border-b border-amber-800/40 text-center">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 justify-center">
            <Heart className="w-4 h-4 fill-rose-400 text-rose-400" />
            <span className="font-serif italic text-base sm:text-lg text-amber-100 font-semibold">
              "{STORE_DETAILS.tagline}"
            </span>
          </div>
          <div className="text-xs uppercase tracking-widest text-amber-300/90 font-medium">
            {STORE_DETAILS.slogan}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 bg-black/50 p-1 shrink-0 shadow-lg flex items-center justify-center">
                <img src={logoTrans} alt="Logo" className="w-full h-full object-contain" referrerPolicy="no-referrer" />
              </div>
              <div>
                <span className="block font-serif text-2xl font-bold text-white tracking-tight leading-none">
                  Janine's Clothing
                </span>
                <span className="block text-[10px] tracking-[0.25em] text-amber-300 font-semibold uppercase mt-1">
                  Hermanus Boutique
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm font-light">
              Hermanus’s premier destination for quality pre-loved ladies fashion, evening gowns, designer shoes, and luxury handbags. Bringing affordable elegance to every wardrobe.
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-900 border border-stone-800 text-[11px] text-amber-300">
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>New Curated Arrivals Every Week</span>
              </span>
            </div>
          </div>

          {/* Quick Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300 font-serif">
              Boutique
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-amber-300 transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('collections')} className="hover:text-amber-300 transition-colors">
                  Latest Collections
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('categories')} className="hover:text-amber-300 transition-colors">
                  Clothing, Shoes & Bags
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-amber-300 transition-colors">
                  About Janine's
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('visit')} className="hover:text-amber-300 transition-colors">
                  Visit 21 Mimosa Street
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300 font-serif">
              Contact & Location
            </h4>
            <div className="space-y-2.5 text-xs text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  {STORE_DETAILS.street}, {STORE_DETAILS.town}, Western Cape, {STORE_DETAILS.country}
                </span>
              </div>

              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${STORE_DETAILS.phones[0].tel}`} className="hover:text-amber-300 transition-colors">
                  {STORE_DETAILS.phones[0].display} (Shop)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300 transition-colors text-emerald-400 font-medium"
                >
                  {STORE_DETAILS.phones[1].display} (WhatsApp)
                </a>
              </div>

              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${STORE_DETAILS.email}`} className="hover:text-amber-300 transition-colors">
                  {STORE_DETAILS.email}
                </a>
              </div>
            </div>
          </div>

          {/* Boutique Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-amber-300 font-serif">
              Trading Hours
            </h4>
            <div className="space-y-1.5 text-xs">
              {STORE_DETAILS.hours.map((h, i) => (
                <div key={i} className="flex justify-between items-center text-stone-300 py-1 border-b border-stone-800/80">
                  <span className="font-medium text-stone-400">{h.days}</span>
                  <span className="text-amber-200/90">{h.times}</span>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={scrollToTop}
                className="w-full py-2 px-3 rounded-lg bg-stone-900 hover:bg-stone-800 text-stone-300 text-xs flex items-center justify-center gap-2 transition-colors border border-stone-800"
              >
                <ArrowUp className="w-3.5 h-3.5 text-amber-400" />
                <span>Back to Top</span>
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Credits & GitHub CI/CD Notice */}
        <div className="mt-14 pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <p>© {new Date().getFullYear()} Janine's Clothing Hermanus. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>Website Designed by <strong className="text-stone-300">Obsidian Studio Designs</strong></span>
            <span>•</span>
            <span className="text-amber-400/80">GitHub Pages Automated Build Enabled</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
