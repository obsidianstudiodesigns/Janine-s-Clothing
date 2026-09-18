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

export interface CartLine {
  item: ClothingItem;
  quantity: number;
}

export interface CustomerDetails {
  firstName: string;
  surname: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  province: string;
  postalCode: string;
  delivery: 'collect' | 'courier';
  notes: string;
}

export interface Order {
  invoiceNumber: string;
  issuedAt: string;
  customer: CustomerDetails;
  lines: CartLine[];
  subtotalZAR: number;
  deliveryZAR: number;
  totalZAR: number;
}
