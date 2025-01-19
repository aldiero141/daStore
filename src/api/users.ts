import { IUser } from "@/types/users";
import axios from "axios";

interface IGetUsers {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
};


export async function getUsers(filters?: IGetUsers) {
  const url = 'https://fakestoreapi.com/users'

  const response = await axios.get(url, {
    params: {
      search: filters?.search,
      page: filters?.page,
      limit: filters?.limit 
    }
  });
  if(response.status !== 200) throw new Error("Failed to fetch products");
  return response.data as IUser[];
  
}