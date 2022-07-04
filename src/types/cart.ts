import { ProductInCart } from "./products";

export interface Cart {
    products: ProductInCart[],
    total: number
}