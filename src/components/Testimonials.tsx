import { Star, Quote, Sparkles } from 'lucide-react';
import { TESTIMONIALS } from '../data/clothingData';

export default function Testimonials() {
  return (
    <section className="py-20 bg-[#0d0d12] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-950/40 border border-amber-500/30 text-amber-300 text-xs uppercase tracking-widest font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Loved by Hermanus Ladies</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight">
            Client Words & Experiences
          </h2>
          <p className="text-sm sm:text-base text-stone-400 mt-2 max-w-lg mx-auto">
            Discover why our boutique has become Hermanus's favourite destination for stylish, high-quality pre-loved fashion.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.id}
              className="p-6 sm:p-7 rounded-2xl bg-[#14141a] border border-stone-800 hover:border-amber-400/40 transition-all duration-300 flex flex-col justify-between shadow-lg"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-stone-700" />
                </div>

                <p className="text-stone-300 text-sm italic leading-relaxed font-light mb-6">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-stone-800/80 flex flex-col">
                <span className="font-serif font-bold text-white text-base">{t.author}</span>
                <span className="text-xs text-amber-400/90 font-medium">{t.location}</span>
                {t.itemPurchased && (
                  <span className="text-[11px] text-stone-400 mt-1 bg-stone-900 px-2 py-0.5 rounded w-fit">
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
