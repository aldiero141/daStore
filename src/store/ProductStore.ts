import { create } from 'zustand'
import { IProduct, IProductStore } from '../types/products'

export const ProductStore = create<IProductStore>((set) => ({
  products: [],
  addProduct: (newProduct: IProduct) => set((state) => ({ products: [...state.products, newProduct] })),
  updateProduct: (newProducts: Array<IProduct>) => set({ products: newProducts }),
  removeAllProducts: () => set({ products: [] }),
}))

