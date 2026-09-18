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
import CartDrawer from './components/CartDrawer';
import LegalModal from './components/LegalModal';
import CookieNotice from './components/CookieNotice';
import CheckoutModal from './components/CheckoutModal';
import InvoiceModal from './components/InvoiceModal';
import { useCart } from './hooks/useCart';
import { createOrder } from './utils/order';
import { findLegalDoc } from './data/legal';
import { ClothingItem, CustomerDetails, Order } from './types';

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

  // Shopping bag → checkout → invoice flow
  const cart = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Legal documents open on a #legal/<id> hash, so each policy has its own
  // shareable URL without pulling in a router.
  const [legalDocId, setLegalDocId] = useState<string | null>(() =>
    window.location.hash.startsWith('#legal/') ? window.location.hash.slice(7) : null
  );

  useEffect(() => {
    const syncFromHash = () => {
      setLegalDocId(
        window.location.hash.startsWith('#legal/') ? window.location.hash.slice(7) : null
      );
    };
    window.addEventListener('hashchange', syncFromHash);
    return () => window.removeEventListener('hashchange', syncFromHash);
  }, []);

  const openLegal = (id: string) => {
    window.location.hash = `legal/${id}`;
    setLegalDocId(id);
  };

  const closeLegal = () => {
    // Drop the hash without adding another history entry.
    history.replaceState(null, '', window.location.pathname + window.location.search);
    setLegalDocId(null);
  };

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

  /** Adding from a card or the item modal always pops the bag open for feedback. */
  const handleAddToCart = (item: ClothingItem) => {
    cart.addItem(item);
    setActiveItem(null);
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  /** Checkout submitted → build the invoice, then empty the bag. */
  const handleSubmitOrder = (customer: CustomerDetails) => {
    const order = createOrder(customer, cart.lines);
    setCompletedOrder(order);
    setIsCheckoutOpen(false);
    cart.clearCart();
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-[#1c1917] flex flex-col selection:bg-[#850e1f] selection:text-white">
      {/* Top Fixed Header */}
      <Header
        onNavigate={handleNavigate}
        onOpenBooking={() => setIsBookingOpen(true)}
        activeSection={activeSection}
        cartCount={cart.itemCount}
        onOpenCart={() => setIsCartOpen(true)}
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
          onAddToCart={handleAddToCart}
          isInCart={cart.isInCart}
        />

        {/* About Janine's Clothing & Hermanus Story */}
        <AboutJanine />

        {/* Testimonials from Hermanus Clients */}
        <Testimonials />

        {/* Visit Hermanus Boutique & Contact Form */}
        <VisitBoutique onOpenBooking={() => setIsBookingOpen(true)} />
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} onOpenLegal={openLegal} />

      {/* Modals & Floating Overlays */}
      <ItemModal
        item={activeItem}
        onClose={() => setActiveItem(null)}
        isWishlisted={activeItem ? wishlist.includes(activeItem.id) : false}
        onToggleWishlist={handleToggleWishlist}
        onAddToCart={handleAddToCart}
        isInCart={activeItem ? cart.isInCart(activeItem.id) : false}
      />

      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />

      {/* Shopping bag */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        lines={cart.lines}
        subtotal={cart.subtotal}
        onSetQuantity={cart.setQuantity}
        onRemove={cart.removeItem}
        onCheckout={handleCheckout}
        onContinueShopping={() => {
          setIsCartOpen(false);
          handleNavigate('collections');
        }}
      />

      {/* Checkout details form */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => {
          setIsCheckoutOpen(false);
          setIsCartOpen(true);
        }}
        lines={cart.lines}
        subtotal={cart.subtotal}
        onSubmit={handleSubmitOrder}
        onOpenLegal={openLegal}
      />

      {/* Generated invoice + WhatsApp send */}
      <InvoiceModal order={completedOrder} onClose={() => setCompletedOrder(null)} />

      {/* Legal documents & cookie notice */}
      <LegalModal doc={findLegalDoc(legalDocId)} onSelect={openLegal} onClose={closeLegal} />
      <CookieNotice onOpenPolicy={openLegal} />

      <FloatingWhatsApp />
    </div>
  );
}
