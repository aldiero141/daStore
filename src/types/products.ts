export interface IProduct {
    id?: number;
    title: string;
    price: string;
    category: string;
    description: string;
    image: string;
    rating?: IRating;
}

export interface IRating {
    rate: number;
    count: number;
}

export interface IProductStore {
    products: Array<IProduct>;
    addProduct: (newProduct: IProduct) => void;
    removeProduct: (id: number) => void;
    updateProduct: (newProducts: Array<IProduct>) => void;
    removeAllProducts: () => void;
  }

export interface ICategoryStore {
    categories: string[];
    addCategory: (newCategory: string) => void;
    removeCategory: (categoryName: string) => void;
    updateCategory: (newCategories: Array<string>) => void;
    removeAllCategory: () => void;
}