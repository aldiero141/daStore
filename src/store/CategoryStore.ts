import { create } from 'zustand'
import { ICategoryStore } from '../types/products'

export const CategoryStore = create<ICategoryStore>((set) => ({
  categories:  [],
  addCategory: (newCategory: string) => set((state) => ( { categories: [newCategory, ...state.categories] })),
  removeCategory: (categoryName: string) => set((state) => ({ categories: state.categories.filter((category) => category !== categoryName) })),
  updateCategory: (newCategories: Array<string>) => set({ categories: newCategories }),
  removeAllCategory: () => set({ categories: [] }),
}))

