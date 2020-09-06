import { ProductItemDTO } from "./product-item-dto";
import { UserDTO } from "./user-dto";

export class ShoppingListDTO {
    id: number;
    buyer: UserDTO;
    productsList: ProductItemDTO[];
    participantsList: UserDTO[];
    shopName: string;
}
