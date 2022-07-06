import { Category } from "./category";

export interface Product{
    id: string,
    title: string,
    price: number,
    description: string,
    category: Category,
    images: string[]
}

export interface FetchProductsParams{
    offset: number,
    limit: number
}

export interface ProductReducerType{
    productList: Product[],
    product: Product
}