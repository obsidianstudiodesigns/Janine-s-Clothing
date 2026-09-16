import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import CategoryHighlights from './components/CategoryHighlights';
import CollectionShowcase from './components/CollectionShowcase';
import AboutJanine from './components/AboutJanine';
import VisitBoutique from './components/VisitBoutique';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';
import ItemModal from './components/ItemModal';
import BookingModal from './components/BookingModal';
import FloatingWhatsApp from './components/FloatingWhatsApp';
import { ClothingItem } from './types';

export default function App() {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'clothing' | 'shoes' | 'bags' | 'accessories'>('all');
  const [activeItem, setActiveItem] = useState<ClothingItem | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('janines_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    try {
      localStorage.setItem('janines_wishlist', JSON.stringify(wishlist));
    } catch {
      // ignore
    }
  }, [wishlist]);

  const handleToggleWishlist = (id: string) => {
    setWishlist((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectCategoryHighlight = (cat: 'all' | 'clothing' | 'shoes' | 'bags' | 'accessories') => {
    setSelectedCategory(cat);
    handleNavigate('collections');
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col selection:bg-[#850e1f] selection:text-white">
      {/* Top Fixed Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
      />

      {/* Main Landing & Sections */}
      <main className="flex-1">
        {/* Landing Page Hero (Responsive: Desktop & Mobile landing images) */}
        <Hero
          onExploreClick={() => handleNavigate('collections')}
          onVisitClick={() => handleNavigate('visit')}
        />

        {/* 4 Pillars from Flyer 3: Clothing, Shoes, Bags, And Much More */}
        <CategoryHighlights onSelectCategory={handleSelectCategoryHighlight} />

        {/* Interactive Collections Showcase with Hover Effects */}
        <CollectionShowcase
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          onSelectItem={setActiveItem}
          wishlist={wishlist}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* About Janine's Clothing & Hermanus Story */}
        <AboutJanine />

        {/* Testimonials from Hermanus Clients */}
        <Testimonials />

        {/* Visit Hermanus Boutique & Contact Form */}
        <VisitBoutique onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />

      {/* Modals & Floating Overlays */}
      <ItemModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        isWishlisted={activeItem ? wishlist.includes(activeItem.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      <FloatingWhatsApp />
    </div>
  );
}

