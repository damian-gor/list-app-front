import { ProductUnit } from './enums/product-unit.enum';
import { ProductCategory } from './enums/product-category.enum';

export class Product {
    id: number;
    name: string;
    category: ProductCategory;
    unit: ProductUnit;
}
