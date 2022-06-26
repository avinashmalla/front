import { Category } from "./category";

export interface Product{
    id: string,
    description: string,
    title: string,
    price: number,
    category: Category,
    images: string[]
}

export interface FetchProductsParams{
    offset: number,
    limit: number
}