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
      {/* Background Wallpaper: landing page.jpg prominently visible */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img
          src={landingPageImg}
          alt="Janine's Clothing Luxury Showroom Display"
          className="w-full h-full object-cover object-center scale-[1.01] transition-transform duration-1000 ease-out"
          referrerPolicy="no-referrer"
        />

        {/* Subtle, refined scrims that preserve full visibility of the boutique showroom while maintaining text clarity */}
        <div className="absolute inset-0 bg-white/15 pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-[#faf8f5]/80 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#faf8f5] to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-6 sm:mt-4">
        {/* Prestigious Location & Quality Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/90 border border-amber-400/60 text-stone-800 text-xs sm:text-sm font-medium tracking-wide shadow-md backdrop-blur-md mb-4 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <MapPin className="w-3.5 h-3.5 text-[#7c0f1e]" />
          <span className="font-semibold text-stone-900">21 Mimosa Street, Hermanus, South Africa</span>
          <span className="text-amber-500">•</span>
          <span className="text-stone-600">Curated Ladies Fashion</span>
        </div>

        {/* Brand Main Title & Typography */}
        <div className="mb-2">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-950 leading-tight drop-shadow-sm">
            Janine's Clothing
          </h1>
          <p className="text-xs sm:text-sm md:text-base tracking-[0.3em] uppercase text-[#7c0f1e] font-extrabold mt-1 drop-shadow-xs">
            Hermanus Luxury Boutique
          </p>
        </div>

        {/* Central Logo: Framed in a pristine white luxury medallion so it stands out spectacularly */}
        <div className="my-5 flex flex-col items-center justify-center animate-in fade-in zoom-in duration-600">
          <div className="relative group p-4 sm:p-6 rounded-3xl bg-white/95 backdrop-blur-md border-2 border-amber-300/80 shadow-[0_20px_50px_rgba(124,15,30,0.12)] hover:shadow-[0_25px_60px_rgba(124,15,30,0.2)] hover:scale-[1.02] transition-all duration-300 max-w-sm sm:max-w-md">
            <img
              src={logoTrans}
              alt="Janine's Clothing Logo"
              className="w-48 sm:w-64 md:w-72 max-w-[75vw] h-auto object-contain mx-auto"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        {/* Categories Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-5">
          {['Clothing', 'Shoes', 'Bags', 'And Much More'].map((cat, idx) => (
            <span
              key={idx}
              className="px-4 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-stone-300 text-xs sm:text-sm font-semibold tracking-wider text-stone-800 uppercase hover:border-[#7c0f1e] hover:text-[#7c0f1e] transition-colors shadow-xs"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Interactive Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-6">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-[#7c0f1e] hover:bg-[#921325] border border-amber-400/40 shadow-xl hover:shadow-2xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            id="hero-explore-collections-btn"
          >
            <span>View Latest Collections</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onVisitClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-stone-900 bg-white hover:bg-stone-50 border border-stone-300 hover:border-amber-500 shadow-md transition-all duration-200 flex items-center justify-center gap-2"
            id="hero-visit-store-btn"
          >
            <MapPin className="w-4 h-4 text-[#7c0f1e]" />
            <span>Visit 21 Mimosa Street</span>
          </button>

          <a
            href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20viewing%20your%20website%20and%20would%20like%20to%20know%20what's%20in%20store%20today.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Badges / Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-stone-300/60 text-left">
          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 text-[#7c0f1e] mb-1">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span className="font-serif text-sm font-bold text-stone-950">Pre-Loved Luxury</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Curated high-end fashion at accessible prices.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 text-[#7c0f1e] mb-1">
              <Award className="w-4 h-4 text-amber-600" />
              <span className="font-serif text-sm font-bold text-stone-950">Pristine Quality</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Every garment is hand-inspected and steamed.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 text-[#7c0f1e] mb-1">
              <MapPin className="w-4 h-4 text-amber-600" />
              <span className="font-serif text-sm font-bold text-stone-950">Hermanus Heart</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Conveniently located at 21 Mimosa Street.
            </p>
          </div>

          <div className="bg-white/95 backdrop-blur-md p-4 rounded-xl border border-stone-200/90 shadow-md hover:shadow-lg transition-shadow">
            <div className="flex items-center gap-2 text-[#7c0f1e] mb-1">
              <Phone className="w-4 h-4 text-amber-600" />
              <span className="font-serif text-sm font-bold text-stone-950">Personal Styling</span>
            </div>
            <p className="text-xs text-stone-600 leading-relaxed">
              Warm hospitality & friendly advice from Janine.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onExploreClick}
            className="text-stone-600 hover:text-[#7c0f1e] transition-colors flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
          >
            <span>Scroll To Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-[#7c0f1e]" />
          </button>
        </div>
      </div>
    </section>
  );
}
