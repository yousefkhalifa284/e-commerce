
export interface CartDetailsResponse {
  status:         string;
  numOfCartItems: number;
  cartId:         string;
  data:           CartDetails;
}

export interface CartDetails {
  _id:            string;
  cartOwner:      string;
  products:       CartItem[];
  createdAt:      string;
  updatedAt:      string;
  __v:            number;
  totalCartPrice: number;
}

export interface CartItem {
  count:   number;
  _id:     string;
  product: ProductDetails;
  price:   number;
}

export interface ProductDetails {
  subcategory:    Subcategory[];
  _id:            string;
  title:          string;
  quantity:       number;
  imageCover:     string;
  category:       Category;
  brand:          Brand;
  ratingsAverage: number;
  id:             string;
}

export interface Brand {
  _id:   string;
  name:  string;
  slug:  string;
  image: string;
}

export interface Category {
  _id:   string;
  name:  string;
  slug:  string;
  image: string;
}

export interface Subcategory {
  _id:      string;
  name:     string;
  slug:     string;
  category: string;
}
