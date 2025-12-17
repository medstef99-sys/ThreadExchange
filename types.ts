export interface Listing {
  id: string;
  title: string;
  price: number;
  description: string;
  image: string;
  category: Category;
  condition: Condition;
  sellerName: string;
  sellerContact: string; // Email or Phone
  location: string;
  createdAt: Date;
}

export enum Category {
  ALL = 'All',
  MEN = 'Men',
  WOMEN = 'Women',
  KIDS = 'Kids',
  ACCESSORIES = 'Accessories',
  SHOES = 'Shoes'
}

export enum Condition {
  NEW = 'New with Tags',
  LIKE_NEW = 'Like New',
  GOOD = 'Good',
  FAIR = 'Fair'
}

export type ViewState = 'browse' | 'sell';