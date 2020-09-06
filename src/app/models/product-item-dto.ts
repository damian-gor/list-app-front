import { ProductUnit } from './enums/product-unit.enum';
import { ProductCategory } from './enums/product-category.enum';
import { ProductItemStatus } from './enums/product-item-status.enum';
import { UserDTO } from "./user-dto";

export class ProductItemDTO {
    id: number;
    name: string;
    quantity: number;
    unit: ProductUnit;
    category: ProductCategory;
    author: UserDTO;
    productStatus: ProductItemStatus;
    sourceProductId: number;
    ifAddToDb: boolean;
}
