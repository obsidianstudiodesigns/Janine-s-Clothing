import { Sparkles, ArrowRight, Shirt, Footprints, ShoppingBag, Gem } from 'lucide-react';

interface CategoryHighlightsProps {
  onSelectCategory: (category: 'all' | 'clothing' | 'shoes' | 'bags' | 'accessories') => void;
}

export default function CategoryHighlights({ onSelectCategory }: CategoryHighlightsProps) {
  const categories = [
    {
      id: 'clothing' as const,
      title: 'Clothing',
      subtitle: 'Couture & Everyday Chic',
      description: 'Elegant evening gowns, silk blouses, tailored separates, and statement winter coats.',
      image: './images/collection-clothing.jpg',
      icon: Shirt,
      itemCount: 'Dresses, Tops & Gowns',
      badge: 'Featured Flyer Category',
    },
    {
      id: 'shoes' as const,
      title: 'Shoes',
      subtitle: 'Designer Footwear & Heels',
      description: 'Italian suede stilettos, metallic gala sandals, comfortable chic flats, and designer boots.',
      image: './images/collection-shoes.jpg',
      icon: Footprints,
      itemCount: 'Sizes EU 36 – 41',
      badge: 'Flyer Highlight',
    },
    {
      id: 'bags' as const,
      title: 'Bags',
      subtitle: 'Luxury Handbags & Clutches',
      description: 'Timeless quilted leather purses, formal minaudières, crossbody bags, and boutique totes.',
      image: './images/collection-bags.jpg',
      icon: ShoppingBag,
      itemCount: 'Designer Leather & Evening',
      badge: 'Flyer Highlight',
    },
    {
      id: 'accessories' as const,
      title: 'And Much More',
      subtitle: 'Jewellery & Finishing Touches',
      description: 'Baroque pearl earrings, French wool berets, pure silk scarves, and artisan gold jewellery.',
      image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
      icon: Gem,
      itemCount: 'Jewellery, Scarves & Belts',
      badge: 'Janine’s Special Finds',
    },
  ];

  return (
    <section id="categories" className="py-20 bg-[#f6f2ea] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100/80 border border-amber-300/80 text-amber-900 text-xs uppercase tracking-widest font-bold mb-3 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-700" />
            <span>Direct from our boutique flyer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-950 tracking-tight">
            Curated For Every Woman
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto">
            From glamorous evening attire to everyday pre-loved elegance, Janine’s hand-picks every piece with style and quality in mind.
          </p>
        </div>

        {/* 4 Interactive Category Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className="group relative rounded-2xl overflow-hidden bg-white border border-stone-200 hover:border-amber-400/80 shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-64 overflow-hidden bg-stone-100">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#7c0f1e] text-white border border-amber-300/40 backdrop-blur-md shadow-sm">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Category Icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md border border-stone-200 flex items-center justify-center text-[#7c0f1e] group-hover:bg-[#7c0f1e] group-hover:text-white transition-colors duration-300 shadow-sm">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-widest text-[#7c0f1e]">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-stone-900 group-hover:text-[#7c0f1e] transition-colors mt-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-100 flex items-center justify-between text-xs">
                    <span className="text-stone-500 font-medium">{cat.itemCount}</span>
                    <span className="inline-flex items-center gap-1 font-bold text-[#7c0f1e] group-hover:translate-x-1 transition-transform">
                      Browse
                      <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
