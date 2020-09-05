import { Component, OnInit, Inject } from '@angular/core';
import { ProductItem } from '../../../models/product-item';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  dialogTitle: string;
  productItem: ProductItem;

  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.productItem = this.data.productItem;
  }

  updateProductItem(updatedProducItem: ProductItem) {
    this.dialogRef.close(updatedProducItem);
  }

  addProductItem(newProductItem: ProductItem) {
    this.dialogRef.close(newProductItem);
  }

}
