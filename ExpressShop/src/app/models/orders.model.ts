import { Cart, CartItem } from "./cart.model";

export interface Orders{
    user_id:number;
    items:CartItem[];
}