import { Sparkles, MapPin, Phone, ArrowDown, ChevronRight, MessageCircle, Award } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';
import logoTrans from '../assets/images/logo trans.jpg';
import landingPageImg from '../assets/images/landing page.jpg';

interface HeroProps {
  onExploreClick: () => void;
  onVisitClick: () => void;
}

export default function Hero({ onExploreClick, onVisitClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 overflow-hidden">
      {/* Background Wallpaper: landing page.jpg with enhanced visibility */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={landingPageImg}
          alt="Janine's Clothing Luxury Showroom Display"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Delicate overlays that preserve the brightness and clarity of the wallpaper while ensuring UI readability */}
        <div className="absolute inset-x-0 top-0 h-44 bg-gradient-to-b from-[#0a0a0d]/90 via-[#0a0a0d]/40 to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-black/25 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#0a0a0d] via-[#0a0a0d]/60 to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6 sm:mt-4">
        {/* Prestigious Location & Quality Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/60 border border-amber-400/50 text-amber-200 text-xs sm:text-sm font-medium tracking-wide shadow-2xl backdrop-blur-md mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span className="drop-shadow">21 Mimosa Street, Hermanus, South Africa</span>
          <span className="text-amber-400/50">•</span>
          <span className="text-white drop-shadow">Curated Ladies Fashion</span>
        </div>

        {/* Brand Main Title & Typography */}
        <div className="mb-2">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            Janine's Clothing
          </h1>
          <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-amber-300 font-semibold mt-1 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
            Hermanus Luxury Boutique
          </p>
        </div>

        {/* Central Logo: Replaced the tagline box with logo trans.jpg */}
        <div className="my-4 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-600">
          <div className="relative group p-1">
            <img
              src={logoTrans}
              alt="Janine's Clothing Logo"
              className="w-48 sm:w-64 md:w-80 max-w-[85vw] h-auto object-contain drop-shadow-[0_12px_32px_rgba(0,0,0,0.9)] hover:scale-105 transition-transform duration-300 rounded-2xl"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Categories Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-5">
          {['Clothing', 'Shoes', 'Bags', 'And Much More'].map((cat, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-amber-400/30 text-xs sm:text-sm font-semibold tracking-wider text-stone-100 uppercase hover:border-amber-400 hover:text-amber-200 transition-colors shadow-lg drop-shadow-md"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Interactive Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-amber-100 bg-[#720e1e]/90 hover:bg-[#881224] backdrop-blur-sm border border-amber-400/70 shadow-2xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            id="hero-explore-collections-btn"
          >
            <span>View Latest Collections</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onVisitClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-stone-100 bg-black/60 hover:bg-black/80 border border-stone-600 hover:border-amber-400 backdrop-blur-md shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
            id="hero-visit-store-btn"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Visit 21 Mimosa Street</span>
          </button>

          <a
            href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20viewing%20your%20website%20and%20would%20like%20to%20know%20what's%20in%20store%20today.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 backdrop-blur-md shadow-2xl transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Badges / Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-white/20 text-left">
          <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-stone-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Pre-Loved Luxury</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Curated high-end fashion at accessible prices.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-stone-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Pristine Quality</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Every garment is hand-inspected and steamed.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-stone-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Hermanus Heart</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Conveniently located at 21 Mimosa Street.
            </p>
          </div>

          <div className="bg-black/60 backdrop-blur-md p-3.5 rounded-xl border border-stone-800 shadow-xl">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Phone className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Personal Styling</span>
            </div>
            <p className="text-xs text-stone-300 leading-relaxed">
              Warm hospitality & friendly advice from Janine.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onExploreClick}
            className="text-stone-300 hover:text-amber-300 transition-colors flex flex-col items-center gap-1 text-xs uppercase tracking-widest drop-shadow-md"
          >
            <span>Scroll To Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
