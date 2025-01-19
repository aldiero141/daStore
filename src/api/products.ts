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
interface IUpdateProduct {
  data: IProduct;
  id: number;
};

interface IDeleteProduct {
  id: number;
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
  if(response.status !== 200) throw new Error("Failed to add product");
  return response.data as IProduct[];
}

export async function updateProduct(payload: IUpdateProduct) {
  const url = `https://fakestoreapi.com/products/${payload.id}`

  const response = await axios.put(url, payload.data );
  if(response.status !== 200) throw new Error("Failed to update product");
  return response.data as IProduct[];
}

export async function deleteProduct(payload: IDeleteProduct) {
  const url = `https://fakestoreapi.com/products/${payload.id}`

  const response = await axios.delete(url);
  if(response.status !== 200) throw new Error("Failed to delete product");
  return response.data as IProduct[];
}