import { Ibrand } from "../brands/ibrand.interface";
import { Icategory } from "../categories/icategory.interface";
import { Isubcategory } from "../subcategories/isubcategory.interface";

export interface Iproducts {

  sold: number | null;
  images: string[];
  subcategory: Isubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  priceAfterDiscount?: number; // موجود في بعض المنتجات فقط
  imageCover: string;
  category: Icategory;
  brand: Ibrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  id: string;
  __v?: number;
  reviews?: any[]
}


