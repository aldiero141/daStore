import { create } from 'zustand'
import { IProduct, IProductStore } from '../types/products'

export const ProductStore = create<IProductStore>((set) => ({
  products: [],
  addProduct: (newProduct: IProduct) => set((state) => ({ products: [...state.products, newProduct] })),
  removeProduct: (id: number) => set((state) => ({ products: state.products.filter((product) => product.id !== id) })),
  updateProduct: (newProducts: Array<IProduct>) => set({ products: newProducts }),
  removeAllProducts: () => set({ products: [] }),
}))

