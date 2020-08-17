import { ProductItem } from './product-item';

export class ShoppingList {
    id: number;
    buyerId: number;
    productsList: ProductItem[];
    participantsIdsList: number[];
    shopName: string;
}
