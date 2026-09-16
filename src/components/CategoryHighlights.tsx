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
    <section id="categories" className="py-20 bg-[#0d0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct from our boutique flyer</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Curated For Every Woman
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-3 max-w-xl mx-auto">
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
                className="group relative rounded-2xl overflow-hidden bg-[#15151a] border border-stone-800 hover:border-amber-400/60 shadow-xl transition-all duration-300 hover:-translate-y-1.5 cursor-pointer flex flex-col"
              >
                {/* Image Container with Hover Zoom */}
                <div className="relative h-64 overflow-hidden bg-stone-900">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#15151a] via-transparent to-black/30" />

                  {/* Top Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase bg-[#6d0d1c]/90 text-amber-200 border border-amber-400/40 backdrop-blur-md">
                      {cat.badge}
                    </span>
                  </div>

                  {/* Category Icon */}
                  <div className="absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center text-amber-300 group-hover:bg-amber-400 group-hover:text-black transition-colors duration-300">
                    <Icon className="w-4 h-4" />
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-400">
                      {cat.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl font-bold text-white group-hover:text-amber-300 transition-colors mt-1">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-stone-400 mt-2 leading-relaxed">
                      {cat.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-stone-800/80 flex items-center justify-between text-xs">
                    <span className="text-stone-400 font-medium">{cat.itemCount}</span>
                    <span className="inline-flex items-center gap-1 font-semibold text-amber-300 group-hover:translate-x-1 transition-transform">
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
