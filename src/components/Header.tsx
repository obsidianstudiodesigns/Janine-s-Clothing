import { useState, useEffect } from 'react';
import { Phone, MapPin, Mail, MessageCircle, Menu, X, Sparkles, Clock } from 'lucide-react';
import { STORE_DETAILS } from '../data/clothingData';

interface HeaderProps {
  onNavigate: (sectionId: string) => void;
  onOpenBooking: () => void;
  activeSection: string;
}

export default function Header({ onNavigate, onOpenBooking, activeSection }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'hero' },
    { label: 'Collections', id: 'collections' },
    { label: 'Categories', id: 'categories' },
    { label: 'About Janine’s', id: 'about' },
    { label: 'Visit Hermanus', id: 'visit' },
    { label: 'Contact', id: 'contact' },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setIsMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Announcement Bar - Brand details from flyer */}
      <div className="bg-[#5c0814] text-[#f7eedf] text-xs py-1.5 px-4 border-b border-[#8b1424]/40 font-medium">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-200">
              <Sparkles className="w-3.5 h-3.5 text-amber-300 shrink-0" />
              <span className="font-serif italic font-semibold">{STORE_DETAILS.tagline}</span>
            </span>
            <span className="hidden lg:inline-block text-white/40">•</span>
            <span className="hidden lg:flex items-center gap-1.5 text-white/90">
              <MapPin className="w-3.5 h-3.5 text-amber-300/90 shrink-0" />
              {STORE_DETAILS.street}, {STORE_DETAILS.town}
            </span>
          </div>

          <div className="flex items-center gap-4 ml-auto">
            <a
              href={`tel:${STORE_DETAILS.phones[0].tel}`}
              className="flex items-center gap-1 hover:text-amber-300 transition-colors"
              title="Call Boutique"
            >
              <Phone className="w-3 h-3 text-amber-300" />
              <span>{STORE_DETAILS.phones[0].display}</span>
            </a>
            <span className="text-white/40">|</span>
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20visiting%20your%20website%20and%20would%20like%20to%20enquire%20about%20your%20clothing%20collections`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 hover:text-emerald-300 transition-colors text-emerald-200 font-semibold"
              title="WhatsApp Janine"
            >
              <MessageCircle className="w-3.5 h-3.5 text-emerald-400" />
              <span className="hidden sm:inline">WhatsApp:</span>
              <span>{STORE_DETAILS.phones[1].display}</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0e0e12]/95 backdrop-blur-md shadow-2xl py-2.5 border-b border-amber-900/30'
            : 'bg-gradient-to-b from-[#0e0e12]/95 via-[#0e0e12]/80 to-transparent py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo & Brand Identity */}
          <button
            onClick={() => handleLinkClick('hero')}
            className="flex items-center gap-3 group text-left focus:outline-none"
            id="brand-logo-btn"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-amber-400/80 shadow-lg group-hover:scale-105 transition-transform duration-300 bg-white">
              <img
                src="./images/logo.jpg"
                alt="Janine's Clothing Hermanus"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div>
              <span className="block font-serif text-xl sm:text-2xl font-bold tracking-tight text-white group-hover:text-amber-300 transition-colors leading-none">
                Janine's Clothing
              </span>
              <span className="block text-[10px] tracking-[0.25em] text-amber-300/90 font-semibold uppercase mt-1">
                Hermanus Boutique
              </span>
            </div>
          </button>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeSection === link.id
                    ? 'text-amber-300 bg-amber-950/40 border border-amber-500/40 shadow-sm'
                    : 'text-stone-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Action CTA & Contact */}
          <div className="hidden lg:flex items-center gap-3">
            <button
              onClick={onOpenBooking}
              className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-amber-300 bg-[#700c1c] hover:bg-[#881023] border border-amber-400/50 rounded-full transition-all duration-200 shadow-md hover:shadow-amber-500/20 hover:scale-[1.02] flex items-center gap-1.5"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Book a Styling</span>
            </button>
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'd%20like%20to%20ask%20about%20your%20available%20stock%20today.`}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-emerald-700/80 hover:bg-emerald-600 text-white transition-all duration-200 border border-emerald-400/40 shadow-md"
              title="Chat with Janine on WhatsApp"
            >
              <MessageCircle className="w-4 h-4" />
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-stone-300 hover:text-white hover:bg-white/10 focus:outline-none"
            aria-label="Toggle Navigation Menu"
            id="mobile-menu-toggle-btn"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#111116]/98 backdrop-blur-xl border-b border-amber-900/40 px-6 py-6 space-y-4 shadow-2xl animate-in slide-in-from-top duration-300">
          <div className="grid grid-cols-1 gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleLinkClick(link.id)}
                className={`text-left px-4 py-3 rounded-lg text-base font-medium transition-all ${
                  activeSection === link.id
                    ? 'bg-[#6b0f1e] text-amber-200 font-semibold border-l-4 border-amber-400'
                    : 'text-stone-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-4 border-t border-stone-800 space-y-3">
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-3 text-center text-xs font-semibold uppercase tracking-wider text-amber-200 bg-[#720e1e] hover:bg-[#851224] rounded-lg border border-amber-400/40 transition-colors shadow-md"
            >
              Book a Private Styling / Fitting
            </button>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <a
                href={`tel:${STORE_DETAILS.phones[0].tel}`}
                className="flex items-center justify-center gap-1.5 py-2.5 bg-stone-900 text-stone-200 rounded-lg border border-stone-800"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Store</span>
              </a>
              <a
                href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20contacting%20you%20from%20your%20website`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 py-2.5 bg-emerald-900/70 text-emerald-200 rounded-lg border border-emerald-700/50 font-medium"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </a>
            </div>

            <p className="text-[11px] text-stone-400 text-center pt-2">
              📍 21 Mimosa Street, Hermanus, South Africa
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
