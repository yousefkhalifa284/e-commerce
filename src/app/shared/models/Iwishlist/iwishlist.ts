
export interface IWishlist {
  status?: string;
  message?: string;
  data: IWishlistItem[];
}

export interface IWishlistItem {
  sold: number;
  images: string[];
  subcategory: IWishlistSubcategory[];
  ratingsQuantity: number;
  _id: string;
  title: string;
  slug: string;
  description: string;
  quantity: number;
  price: number;
  imageCover: string;
  category: IWishlistCategory;
  brand: IWishlistBrand;
  ratingsAverage: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface IWishlistSubcategory {
  _id: string;
  name: string;
  slug: string;
  category: string;
}

export interface IWishlistCategory {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IWishlistBrand {
  _id: string;
  name: string;
  slug: string;
  image: string;
}

export interface IWishlistResponse {
  status: string;
  message: string;
  data: string[];
}
