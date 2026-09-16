import { useState } from 'react';
import { X, Heart, MessageCircle, Phone, Sparkles, CheckCircle2, ShieldCheck, MapPin, Tag } from 'lucide-react';
import { ClothingItem } from '../types';
import { STORE_DETAILS } from '../data/clothingData';

interface ItemModalProps {
  item: ClothingItem | null;
  onClose: () => void;
  isWishlisted: boolean;
  onToggleWishlist: (id: string) => void;
}

export default function ItemModal({ item, onClose, isWishlisted, onToggleWishlist }: ItemModalProps) {
  if (!item) return null;

  const [activeImage, setActiveImage] = useState<string>(item.image);

  const whatsappMessage = encodeURIComponent(
    `Hi Janine! I saw the "${item.name}" (Size ${item.size}, priced at R${item.priceZAR}) on your website. Is it still available to try on at 21 Mimosa Street?`
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-4xl bg-[#141419] border border-amber-500/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-black/70 text-stone-300 hover:text-white hover:bg-stone-800 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Garment Image Showcase */}
        <div className="md:w-1/2 relative bg-stone-950 flex flex-col justify-between p-4">
          <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-stone-900 border border-stone-800">
            <img
              src={activeImage}
              alt={item.name}
              className="w-full h-full object-cover object-center transition-all duration-300"
              referrerPolicy="no-referrer"
            />
            {item.tag && (
              <span className="absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase bg-[#7b0d1e] text-amber-200 border border-amber-400/40 shadow-lg">
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
                  activeImage === item.image ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60'
                }`}
              >
                <img src={item.image} alt="View 1" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
              </button>
              <button
                onClick={() => setActiveImage(item.secondaryImage!)}
                className={`w-14 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  activeImage === item.secondaryImage ? 'border-amber-400 scale-105' : 'border-stone-800 opacity-60'
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
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
                {item.subCategory}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/30">
                <ShieldCheck className="w-3 h-3" />
                {item.condition}
              </span>
            </div>

            {/* Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white leading-tight">
              {item.name}
            </h3>

            {/* Pricing Comparison */}
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-3xl font-bold text-amber-300 font-serif">
                R {item.priceZAR.toLocaleString()}
              </span>
              {item.originalPriceZAR && (
                <div className="flex items-center gap-1.5 text-xs text-stone-400">
                  <span>Est. Retail:</span>
                  <span className="line-through text-stone-500">R {item.originalPriceZAR.toLocaleString()}</span>
                  <span className="text-emerald-400 font-semibold">
                    (Save R {(item.originalPriceZAR - item.priceZAR).toLocaleString()})
                  </span>
                </div>
              )}
            </div>

            {/* Specifications Grid */}
            <div className="grid grid-cols-2 gap-3 py-3 border-y border-stone-800 text-xs">
              <div className="bg-stone-900/60 p-2.5 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Size</span>
                <span className="text-white font-semibold text-sm">{item.size}</span>
              </div>
              <div className="bg-stone-900/60 p-2.5 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Colour</span>
                <span className="text-white font-semibold text-sm">{item.color}</span>
              </div>
              <div className="col-span-2 bg-stone-900/60 p-2.5 rounded-lg">
                <span className="text-stone-400 block text-[10px] uppercase tracking-wider">Material & Craft</span>
                <span className="text-stone-200 font-medium">{item.material}</span>
              </div>
            </div>

            {/* Description */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-300 mb-1.5">
                Item Description
              </h4>
              <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
                {item.description}
              </p>
            </div>

            {/* Boutique In-Store Note */}
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/90">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                Available to inspect and try on at <strong>Janine's Clothing</strong> (21 Mimosa street, Hermanus).
                Personal fittings welcomed!
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2.5 pt-2">
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 px-4 rounded-xl text-sm font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-all duration-200 shadow-lg flex items-center justify-center gap-2 border border-emerald-500/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Enquire & Reserve via WhatsApp</span>
            </a>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${STORE_DETAILS.phones[0].tel}`}
                className="py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider text-stone-200 bg-stone-800 hover:bg-stone-700 transition-colors flex items-center justify-center gap-1.5 border border-stone-700"
              >
                <Phone className="w-3.5 h-3.5 text-amber-400" />
                <span>Call Store</span>
              </a>

              <button
                onClick={() => onToggleWishlist(item.id)}
                className={`py-2.5 px-3 rounded-xl text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 border ${
                  isWishlisted
                    ? 'bg-rose-950/60 text-rose-300 border-rose-600/50'
                    : 'bg-stone-800 hover:bg-stone-700 text-stone-300 border-stone-700'
                }`}
              >
                <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
                <span>{isWishlisted ? 'Saved' : 'Wishlist'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
