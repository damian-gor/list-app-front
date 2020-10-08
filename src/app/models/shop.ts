import { ShoppingListDTO } from './shopping-list-dto';

export class Shop {
    id: number;
    name: string;
    promotionUrl: string;
    shoppingLists: ShoppingListDTO[];
}
