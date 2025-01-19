import { IUser } from "@/types/users";
import axios from "axios";

interface IGetUsers {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
};

interface IPostUsers {
  data: IUser;
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

export async function postUser(payload: IPostUsers) {
  const url = 'https://fakestoreapi.com/users'

  const response = await axios.post(url, payload.data );
  if(response.status !== 200) throw new Error("Failed to fetch products");
  console.log(response.data)
  return response.data as IUser[];
}