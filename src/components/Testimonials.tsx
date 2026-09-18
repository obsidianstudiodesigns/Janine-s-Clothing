import { Star, Quote } from 'lucide-react';
import { TESTIMONIALS } from '../data/clothingData';

export default function Testimonials() {
  return (
    <section className="py-20 bg-stone-50 border-t border-stone-200 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-stone-950 tracking-tight">
            Client Words & Experiences
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2 max-w-lg mx-auto">
            Discover why our boutique has become Hermanus's favourite destination for stylish, high-quality pre-loved fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-white border border-stone-200 hover:border-amber-400/70 transition-all duration-300 flex flex-col justify-between shadow-sm"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-500">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-300" />
                </div>

                <p className="text-stone-700 text-sm italic leading-relaxed mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex flex-col">
                <span className="font-serif font-bold text-stone-950 text-base">{t.author}</span>
                <span className="text-xs text-[#7c0f1e] font-bold">{t.location}</span>
                {t.itemPurchased && (
                  <span className="text-[11px] text-stone-600 mt-1 bg-stone-100 border border-stone-200 px-2 py-0.5 rounded w-fit">
                    Acquired: {t.itemPurchased}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
