import { IProduct } from "@/types/products";
import axios from "axios";

interface IGetProducts {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
};

interface IPostProduct {
  data: IProduct;
};


export async function getProducts(filters?: IGetProducts) {
  const filter = filters?.filter !== '' && filters?.filter !== 'all' ? filters?.filter : '';
  const url = filter ? `https://fakestoreapi.com/products/category/${filter}` : "https://fakestoreapi.com/products";

  const response = await axios.get(url, {
    params: {
      search: filters?.search,
      page: filters?.page,
      limit: filters?.limit 
    }
  });
  if(response.status !== 200) throw new Error("Failed to fetch products");
  return response.data as IProduct[];
  
}

export async function getCategories() {
  const url = 'https://fakestoreapi.com/products/categories'

  const response = await axios.get(url);
  if(response.status !== 200) throw new Error("Failed to fetch products");
  return response.data as string[];
  
}

export async function postProduct(payload: IPostProduct) {
  const url = 'https://fakestoreapi.com/products'

  const response = await axios.post(url, payload.data );
  if(response.status !== 200) throw new Error("Failed to fetch products");
  console.log(response.data)
  return response.data as IProduct[];
}