import { useState } from 'react';
import { X, Heart, MessageCircle, Phone, ShieldCheck, MapPin, ShoppingBag, Check } from 'lucide-react';
import { ClothingItem } from '../types';
import { STORE_DETAILS } from '../data/clothingData';

interface ItemModalProps {
  item: ClothingItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
  onAddToCart: (item: ClothingItem) => void;
  isInCart: boolean;
}

export default function ItemModal({ item, onClose, isWishlisted, onToggleWishlist, onAddToCart, isInCart }: ItemModalProps) {
  if (!item) return null;

  const [activeImage, setActiveImage] = useState<string>(item.image);

  const whatsappMessage = encodeURIComponent(
    `Hi Janine! I saw the "${item.name}" (Size ${item.size}, priced at R${item.priceZAR}) on your website. Is it still available to try on at 21 Mimosa Street?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-stone-100 text-stone-600 hover:text-stone-900 hover:bg-stone-200 transition-colors shadow-xs"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Garment Image Showcase */}
        <div className="md:w-1/2 relative bg-stone-50 md:border-r border-stone-200 flex flex-col justify-between p-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-stone-200 shadow-xs">
            <img
              src={activeImage}
              alt={item.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {item.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#7c0f1e] text-white border border-amber-300/40 shadow-md">
                {item.tag}
              </span>
            )}
          </div>

          {/* Secondary Thumbnail Toggle */}
          {item.secondaryImage && (
            <div className="flex items-center gap-2 mt-3">
              <button
                onClick={() => setActiveImage(item.image)}
                className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === item.image ? 'border-[#7c0f1e] scale-105 shadow-xs' : 'border-stone-200 opacity-70'
                }`}
              >
                <img src={item.image} alt="View 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
              <button
                onClick={() => setActiveImage(item.secondaryImage!)}
                className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === item.secondaryImage ? 'border-[#7c0f1e] scale-105 shadow-xs' : 'border-stone-200 opacity-70'
                }`}
              >
                <img src={item.secondaryImage} alt="View 2" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
            </div>
          )}
        </div>

        {/* Garment Details & Actions */}
        <div className="md:w-1/2 p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            {/* Category & Condition */}
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <span className="text-xs font-bold uppercase tracking-widest text-[#7c0f1e]">
                {item.subCategory}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3 h-3 text-emerald-600" />
                {item.condition}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-950 leading-tight">
              {item.name}
            </h3>

            {/* Pricing Comparison */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-[#7c0f1e] font-serif">
                R {item.priceZAR.toLocaleString()}
              </span>
              {item.originalPriceZAR && (
                <div className="flex items-center gap-1.5 text-xs text-stone-500">
                  <span>Est. Retail:</span>
                  <span className="line-through text-stone-400">R {item.originalPriceZAR.toLocaleString()}</span>
                  <span className="text-emerald-700 font-semibold">
                    (Save R {(item.originalPriceZAR - item.priceZAR).toLocaleString()})
                  </span>
                </div>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-200 text-xs">
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider font-semibold">Size</span>
                <span className="text-stone-900 font-bold text-sm">{item.size}</span>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider font-semibold">Colour</span>
                <span className="text-stone-900 font-bold text-sm">{item.color}</span>
              </div>
              <div className="col-span-2 bg-stone-50 p-2.5 rounded-lg border border-stone-100">
                <span className="text-stone-500 block text-[10px] uppercase tracking-wider font-semibold">Material & Craft</span>
                <span className="text-stone-800 font-medium">{item.material}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-700 mb-1.5">
                Item Description
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Boutique In-Store Note */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50/80 border border-amber-200 text-xs text-amber-900">
              <MapPin className="w-4 h-4 text-[#7c0f1e] shrink-0 mt-0.5" />
              <span>
                Available to inspect and try on at <strong>Janine's Clothing</strong> (21 Mimosa street, Hermanus).
                Personal fittings welcomed!
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <button
              onClick={() => onAddToCart(item)}
              className={`w-full py-3.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider transition-all duration-200 shadow-md flex items-center justify-center gap-2 ${
                isInCart
                  ? 'bg-emerald-50 text-emerald-800 border border-emerald-200 hover:bg-emerald-100'
                  : 'bg-[#7c0f1e] text-white hover:bg-[#911223]'
              }`}
            >
              {isInCart ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>In Your Bag &mdash; Add Another</span>
                </>
              ) : (
                <>
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Bag</span>
                </>
              )}
            </button>

            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 shadow-md flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire & Reserve via WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${STORE_DETAILS.phones[0].tel}`}
                className="py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider text-stone-800 bg-stone-100 hover:bg-stone-200 transition-colors flex items-center justify-center gap-1.5 border border-stone-200"
              >
                <Phone className="w-3.5 h-3.5 text-amber-600" />
                <span>Call Store</span>
              </a>

              <button
                onClick={() => onToggleWishlist(item.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border ${
                  isWishlisted
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : 'bg-stone-100 hover:bg-stone-200 text-stone-700 border-stone-200'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-600 text-rose-600' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
