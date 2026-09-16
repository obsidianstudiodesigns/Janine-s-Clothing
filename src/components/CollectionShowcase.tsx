import { useState, useMemo } from 'react';
import { Sparkles, Heart, Eye, MessageCircle, Search, SlidersHorizontal, ArrowUpDown, ShieldCheck } from 'lucide-react';
import { ClothingItem } from '../types';
import { CLOTHING_ITEMS, STORE_DETAILS } from '../data/clothingData';

interface CollectionShowcaseProps {
  selectedCategory: 'all' | 'clothing' | 'shoes' | 'bags' | 'accessories';
  onCategoryChange: (cat: 'all' | 'clothing' | 'shoes' | 'bags' | 'accessories') => void;
  onSelectItem: (item: ClothingItem) => void;
  wishlist: string[];
  onToggleWishlist: (id: string) => void;
}

export default function CollectionShowcase({
  selectedCategory,
  onCategoryChange,
  onSelectItem,
  wishlist,
  onToggleWishlist,
}: CollectionShowcaseProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [hoveredItemId, setHoveredItemId] = useState<string | null>(null);

  const categories = [
    { id: 'all' as const, label: 'All Pieces' },
    { id: 'clothing' as const, label: 'Clothing & Gowns' },
    { id: 'shoes' as const, label: 'Shoes & Heels' },
    { id: 'bags' as const, label: 'Luxury Bags' },
    { id: 'accessories' as const, label: 'Accessories' },
  ];

  const filteredItems = useMemo(() => {
    let result = CLOTHING_ITEMS.filter((item) => {
      const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
      const matchesSearch =
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.subCategory.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.material.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.priceZAR - b.priceZAR);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.priceZAR - a.priceZAR);
    }

    return result;
  }, [selectedCategory, searchQuery, sortBy]);

  return (
    <section id="collections" className="py-24 bg-[#0a0a0d] relative">
      {/* Subtle gold glow background element */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#520914]/60 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Interactive Gallery & Stock</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
              Latest Clothing Collections
            </h2>
            <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-xl">
              Hover over garments to discover exquisite details, sizes, and genuine pre-loved pricing. Each treasure is one-of-a-kind.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              placeholder="Search silk, gowns, heels, bags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-full bg-[#16161c] border border-stone-800 text-sm text-stone-200 placeholder:text-stone-500 focus:outline-none focus:border-amber-400/80 transition-colors shadow-inner"
            />
          </div>
        </div>

        {/* Filter Bar & Sort Controls */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-8 border-b border-stone-800/80">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((tab) => (
              <button
                key={tab.id}
                onClick={() => onCategoryChange(tab.id)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === tab.id
                    ? 'bg-[#730f1f] text-amber-200 border border-amber-400/60 shadow-md scale-105'
                    : 'bg-[#15151b] text-stone-400 hover:text-stone-200 hover:bg-stone-800 border border-stone-800'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Sort Selector & Result Count */}
          <div className="flex items-center justify-between w-full sm:w-auto gap-4 text-xs">
            <span className="text-stone-400">
              Showing <strong className="text-amber-300 font-semibold">{filteredItems.length}</strong> styles
            </span>

            <div className="flex items-center gap-1.5 bg-[#15151b] border border-stone-800 px-3 py-1.5 rounded-lg text-stone-300">
              <ArrowUpDown className="w-3.5 h-3.5 text-amber-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent focus:outline-none cursor-pointer text-stone-200"
              >
                <option value="featured" className="bg-stone-900 text-stone-200">Sort: Curated</option>
                <option value="price-asc" className="bg-stone-900 text-stone-200">Price: Low to High</option>
                <option value="price-desc" className="bg-stone-900 text-stone-200">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Clothing Items Grid with Interactive Hover Effects */}
        {filteredItems.length === 0 ? (
          <div className="py-20 text-center text-stone-400">
            <p className="text-lg font-serif text-stone-300">No pieces match your search.</p>
            <p className="text-xs mt-1">Try clearing filters or search terms.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                onCategoryChange('all');
              }}
              className="mt-4 px-4 py-2 bg-stone-800 text-amber-300 rounded-full text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pt-8">
            {filteredItems.map((item) => {
              const isWishlisted = wishlist.includes(item.id);
              const isHovered = hoveredItemId === item.id;
              const displayImg = isHovered && item.secondaryImage ? item.secondaryImage : item.image;

              return (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredItemId(item.id)}
                  onMouseLeave={() => setHoveredItemId(null)}
                  className="group relative rounded-2xl overflow-hidden bg-[#131317] border border-stone-800 hover:border-amber-400/70 shadow-lg hover:shadow-2xl hover:shadow-amber-500/10 transition-all duration-300 hover:-translate-y-2 flex flex-col cursor-pointer"
                  onClick={() => onSelectItem(item)}
                >
                  {/* Image Container with Zoom and Overlay Trigger */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-900">
                    <img
                      src={displayImg}
                      alt={item.name}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-all duration-500 ease-out"
                      referrerPolicy="no-referrer"
                    />

                    {/* Gradient shade */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#131317] via-transparent to-black/20 opacity-80 group-hover:opacity-60 transition-opacity" />

                    {/* Tag / Badge */}
                    {item.tag && (
                      <div className="absolute top-3 left-3">
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#790e1f]/95 text-amber-200 border border-amber-400/40 backdrop-blur-md shadow-md">
                          {item.tag}
                        </span>
                      </div>
                    )}

                    {/* Condition Pill */}
                    <div className="absolute bottom-3 left-3">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-black/75 text-emerald-300 border border-emerald-500/30 backdrop-blur-md">
                        <ShieldCheck className="w-3 h-3" />
                        {item.condition}
                      </span>
                    </div>

                    {/* Interactive Hover Actions Floating Bar */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleWishlist(item.id);
                        }}
                        className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 border ${
                          isWishlisted
                            ? 'bg-rose-900 text-white border-rose-500'
                            : 'bg-black/60 text-stone-300 hover:text-white hover:bg-black border-white/20'
                        }`}
                        title="Save to Wishlist"
                        aria-label="Save to Wishlist"
                      >
                        <Heart className={`w-3.5 h-3.5 ${isWishlisted ? 'fill-rose-400 text-rose-400' : ''}`} />
                      </button>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectItem(item);
                        }}
                        className="p-2 rounded-full bg-black/60 hover:bg-amber-400 hover:text-black text-stone-300 transition-all duration-200 border border-white/20 backdrop-blur-md opacity-0 group-hover:opacity-100"
                        title="Quick View Details"
                        aria-label="Quick View Details"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Quick View Button on Hover overlay */}
                    <div className="absolute inset-x-0 bottom-12 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-200 transform translate-y-2 group-hover:translate-y-0 px-4 pointer-events-none">
                      <span className="px-4 py-2 rounded-full bg-black/85 border border-amber-400/60 text-amber-200 text-xs font-semibold uppercase tracking-wider backdrop-blur-md shadow-xl flex items-center gap-1.5">
                        <Eye className="w-3.5 h-3.5 text-amber-300" />
                        <span>Quick View & Craft Specs</span>
                      </span>
                    </div>
                  </div>

                  {/* Content / Info Details */}
                  <div className="p-4 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-stone-400 mb-1">
                        <span className="uppercase tracking-wider text-amber-400/90 font-medium">
                          {item.subCategory}
                        </span>
                        <span className="bg-stone-800/80 px-2 py-0.5 rounded text-stone-300 font-medium">
                          {item.size}
                        </span>
                      </div>

                      <h3 className="font-serif text-lg font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
                        {item.name}
                      </h3>

                      <p className="text-xs text-stone-400 mt-1 line-clamp-2 leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-stone-800 flex items-center justify-between">
                      <div>
                        <div className="font-serif text-xl font-bold text-amber-300 leading-none">
                          R {item.priceZAR.toLocaleString()}
                        </div>
                        {item.originalPriceZAR && (
                          <div className="text-[10px] text-stone-400 line-through mt-0.5">
                            R {item.originalPriceZAR.toLocaleString()}
                          </div>
                        )}
                      </div>

                      {/* WhatsApp Enquire Button */}
                      <a
                        href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine!%20I'm%20interested%20in%20"${encodeURIComponent(
                          item.name
                        )}"%20(R${item.priceZAR})%20from%20your%20website.%20Is%20it%20available?`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2.5 rounded-full bg-emerald-950/80 hover:bg-emerald-700 text-emerald-300 hover:text-white border border-emerald-500/40 transition-colors shadow-md"
                        title="Enquire on WhatsApp"
                      >
                        <MessageCircle className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Bottom Banner with In-Store Callout */}
        <div className="mt-16 p-6 sm:p-8 rounded-2xl bg-gradient-to-r from-[#590c17] via-[#2f060d] to-[#121217] border border-amber-500/40 shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white">
              Looking for something specific or custom styling?
            </h3>
            <p className="text-sm text-amber-200/80 max-w-xl">
              Janine receives fresh pre-loved items and designer arrivals weekly at 21 Mimosa Street. Send a WhatsApp message or stop by to try on our newest unlisted items!
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={`https://wa.me/${STORE_DETAILS.whatsappNumber}?text=Hi%20Janine,%20I'm%20looking%20for%20a%20specific%20dress/outfit%20for%20an%20upcoming%20event.`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 rounded-full text-xs sm:text-sm font-bold uppercase tracking-wider text-white bg-emerald-700 hover:bg-emerald-600 transition-all shadow-lg flex items-center gap-2 border border-emerald-400/40"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Ask Janine on WhatsApp</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
