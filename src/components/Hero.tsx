import { Sparkles, MapPin, Phone, ArrowDown, ChevronRight, MessageCircle, Heart, Award } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

interface HeroProps {
  onExploreClick: () => void;
  onVisitClick: () => void;
}

export default function Hero({ onExploreClick, onVisitClick }: HeroProps) {
  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-20 pb-16 overflow-hidden">
      {/* Responsive Background: Desktop showroom on desktop, Mobile portrait on mobile */}
      <div className="absolute inset-0 z-0">
        {/* Desktop Image (md and up) */}
        <div className="hidden md:block absolute inset-0">
          <img
            src="./images/hero-desktop.jpg"
            alt="Janine's Clothing Luxury Showroom Display"
            className="w-full h-full object-cover object-center scale-[1.02] transform transition-transform duration-1000 ease-out"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Mobile Image (smaller than md) */}
        <div className="block md:hidden absolute inset-0">
          <img
            src="./images/hero-mobile.jpg"
            alt="Janine's Clothing Mobile Showroom Display"
            className="w-full h-full object-cover object-top"
            referrerPolicy="no-referrer"
          />
        </div>

        {/* Luxury Vignette & Crimson Atmospheric Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0b0b0e] via-[#0b0b0e]/75 to-[#3b050c]/80 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b0b0e]/90 via-[#0b0b0e]/60 to-[#0b0b0e]/90" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-12 sm:mt-8">
        {/* Prestigious Location & Quality Tag */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#3d060e]/90 border border-amber-400/40 text-amber-200 text-xs sm:text-sm font-medium tracking-wide shadow-xl backdrop-blur-md mb-6 animate-in fade-in slide-in-from-bottom-3 duration-700">
          <MapPin className="w-3.5 h-3.5 text-amber-400" />
          <span>21 Mimosa Street, Hermanus, South Africa</span>
          <span className="text-amber-400/50">•</span>
          <span className="text-white/90">Curated Ladies Fashion</span>
        </div>

        {/* Brand Main Title & Typography */}
        <div className="mb-4">
          <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-2xl">
            Janine's Clothing
          </h1>
          <p className="text-sm sm:text-base md:text-lg tracking-[0.3em] uppercase text-amber-300 font-semibold mt-2">
            Hermanus Luxury Boutique
          </p>
        </div>

        {/* Core Tagline Extracted Directly from Flyer 3 */}
        <div className="my-6 max-w-3xl mx-auto">
          <div className="relative inline-block px-6 py-3 rounded-2xl bg-[#520914]/80 backdrop-blur-md border border-amber-400/50 shadow-2xl">
            <div className="flex items-center justify-center gap-2 text-rose-200">
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400 shrink-0" />
              <p className="font-serif text-xl sm:text-2xl md:text-3xl font-semibold italic text-amber-100 tracking-normal">
                {STORE_DETAILS.tagline}
              </p>
              <Heart className="w-4 h-4 fill-rose-400 text-rose-400 shrink-0" />
            </div>
            <p className="text-xs sm:text-sm text-amber-200/90 font-medium tracking-wider uppercase mt-1">
              {STORE_DETAILS.slogan}
            </p>
          </div>
        </div>

        {/* Categories Pill Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 my-6">
          {['Clothing', 'Shoes', 'Bags', 'And Much More'].map((cat, idx) => (
            <span
              key={idx}
              className="px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs sm:text-sm font-medium tracking-wider text-stone-200 uppercase hover:border-amber-400/60 hover:text-amber-200 transition-colors"
            >
              {cat}
            </span>
          ))}
        </div>

        {/* Interactive Action CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8">
          <button
            onClick={onExploreClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-amber-100 bg-[#720e1e] hover:bg-[#881224] border border-amber-400/60 shadow-xl hover:shadow-amber-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 flex items-center justify-center gap-2 group"
            id="hero-explore-collections-btn"
          >
            <span>View Latest Collections</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>

          <button
            onClick={onVisitClick}
            className="w-full sm:w-auto px-8 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-stone-200 bg-black/60 hover:bg-black/80 border border-stone-700 hover:border-amber-400/50 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
            id="hero-visit-store-btn"
          >
            <MapPin className="w-4 h-4 text-amber-400" />
            <span>Visit 21 Mimosa Street</span>
          </button>

          <a
            href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20viewing%20your%20website%20and%20would%20like%20to%20know%20what's%20in%20store%20today.`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-4 rounded-full text-sm font-bold uppercase tracking-wider text-emerald-200 bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-500/50 backdrop-blur-md shadow-lg transition-all duration-200 flex items-center justify-center gap-2"
          >
            <MessageCircle className="w-4 h-4 text-emerald-400" />
            <span>WhatsApp Us</span>
          </a>
        </div>

        {/* Trust Badges / Value Pillars */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mt-12 pt-8 border-t border-white/10 text-left">
          <div className="bg-[#15151a]/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Sparkles className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Pre-Loved Luxury</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Curated high-end fashion at accessible prices.
            </p>
          </div>

          <div className="bg-[#15151a]/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Award className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Pristine Quality</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Every garment is hand-inspected and steamed.
            </p>
          </div>

          <div className="bg-[#15151a]/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <MapPin className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Hermanus Heart</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Conveniently located at 21 Mimosa Street.
            </p>
          </div>

          <div className="bg-[#15151a]/80 backdrop-blur-md p-3.5 rounded-xl border border-stone-800">
            <div className="flex items-center gap-2 text-amber-400 mb-1">
              <Phone className="w-4 h-4" />
              <span className="font-serif text-sm font-bold text-white">Personal Styling</span>
            </div>
            <p className="text-xs text-stone-400 leading-relaxed">
              Warm hospitality & friendly advice from Janine.
            </p>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-8 flex justify-center">
          <button
            onClick={onExploreClick}
            className="text-stone-400 hover:text-amber-300 transition-colors flex flex-col items-center gap-1 text-xs uppercase tracking-widest"
          >
            <span>Scroll To Explore</span>
            <ArrowDown className="w-4 h-4 animate-bounce text-amber-400" />
          </button>
        </div>
      </div>
    </section>
  );
}
