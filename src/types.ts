export interface ClothingItem {
  id: string;
  name: string;
  category: 'clothing' | 'shoes' | 'bags' | 'accessories';
  subCategory: string;
  priceZAR: number;
  originalPriceZAR?: number;
  condition: 'Pristine / Like New' | 'Excellent Pre-Loved' | 'Vintage Designer' | 'Never Worn';
  size: string;
  color: string;
  material: string;
  image: string;
  secondaryImage?: string;
  description: string;
  featured?: boolean;
  tag?: string;
}

export interface Testimonial {
  id: string;
  author: string;
  location: string;
  rating: number;
  comment: string;
  itemPurchased?: string;
}
