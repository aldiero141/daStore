import { create } from 'zustand'
import { ICategoryStore } from '../types/products'

export const CategoryStore = create<ICategoryStore>((set) => ({
  categories:  [],
  addCategory: (newCategory: string) => set((state) => ({ categories: [...state.categories, newCategory] })),
  updateCategory: (newCategories: Array<string>) => set({ categories: newCategories }),
  removeAllCategory: () => set({ categories: [] }),
}))

