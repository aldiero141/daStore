import { IProduct } from "@/types/products";
import axios from "axios";

interface IGetProducts {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
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