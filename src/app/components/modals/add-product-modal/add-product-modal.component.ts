import { Component, OnInit, Inject } from '@angular/core';
import { Product } from '../../../models/product';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-product-modal',
  templateUrl: './add-product-modal.component.html',
  styleUrls: ['./add-product-modal.component.scss']
})
export class AddProductModalComponent implements OnInit {

  dialogTitle: string;
  product: Product;

  constructor(
    public dialogRef: MatDialogRef<AddProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.product = this.data.product;
  }

  updateProduct(updatedProduc: Product) {
    this.dialogRef.close(updatedProduc);
  }

  addProduct(newProduct: Product) {
    this.dialogRef.close(newProduct);
  }

}