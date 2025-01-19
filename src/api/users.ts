import { IUser } from "@/types/users";
import axios from "axios";

interface IGetUsers {
  search?: string;
  filter?: string;
  page?: number;
  limit?: number | null;
};

interface IPostUser {
  data: IUser;
};

interface IUpdateUser {
  data: IUser;
  id: number;
};

interface IDeleteUser {
  id: number;
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
  if(response.status !== 200) throw new Error("Failed to fetch users");
  return response.data as IUser[];
}

export async function postUser(payload: IPostUser) {
  const url = 'https://fakestoreapi.com/users'

  const response = await axios.post(url, payload.data );
  if(response.status !== 200) throw new Error("Failed to add user");
  return response.data as IUser[];
}

export async function updateUser(payload: IUpdateUser) {
  const url = `https://fakestoreapi.com/users/${payload.id}`

  const response = await axios.put(url, payload.data );
  if(response.status !== 200) throw new Error("Failed to update user");
  return response.data as IUser[];
}

export async function deleteUser(payload: IDeleteUser) {
  const url = `https://fakestoreapi.com/users/${payload.id}`

  const response = await axios.delete(url);
  if(response.status !== 200) throw new Error("Failed to delete user");
  return response.data as IUser[];
}