import { IProduct } from "@/types/products";
import axios from "axios";

interface IGetProducts {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
};


export async function getProducts(filters?: IGetProducts) {
  // Do something cool with the filters

  const response = await axios.get(`https://fakestoreapi.com/products${filters?.filter !== '' && filters?.filter !== 'all' ? `/category/${filters?.filter}` : ""}`, {
    params: {
      search: filters?.search,
      page: filters?.page,
      limit: filters?.limit 
    }
  });
  if(response.status !== 200) throw new Error("Failed to fetch products");
  return response.data as IProduct[];
  
}