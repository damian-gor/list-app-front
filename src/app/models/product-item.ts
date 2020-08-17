import { ProductUnit } from './enums/product-unit.enum';
import { ProductCategory } from './enums/product-category.enum';
import { ProductItemStatus } from './enums/product-item-status.enum';

export class ProductItem {
    id: number;
    name: string;
    quantity: number;
    unit: ProductUnit;
    category: ProductCategory;
    ownerId: number;
    productStatus: ProductItemStatus;
    sourceProductId: number;
    ifAddToDb: boolean;
}
