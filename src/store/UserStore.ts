import { create } from 'zustand'
import { IUser, IUserStore } from '../types/users'

export const UserStore = create<IUserStore>((set) => ({
  users: [],
  addUser: (newUser: IUser) => set((state) => ({ users: [...state.users, newUser] })),
  removeUser: (id: number) => set((state) => ({ users: state.users.filter((user) => user.id !== id) })),
  updateUsers: (newUsers: Array<IUser>) => set({ users: newUsers }),
  removeAllUser: () => set({ users: [] }),
}))

