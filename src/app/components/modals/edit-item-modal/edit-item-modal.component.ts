import { Component, OnInit, Inject } from '@angular/core';
import { ProductItem } from '../../../models/product-item';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss']
})
export class EditItemModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<EditItemModalComponent>,
    @Inject(MAT_DIALOG_DATA) public productItem: ProductItem) { }

  ngOnInit(): void {
  }

  updateProductItem(updatedProducItem: ProductItem) {
    this.dialogRef.close(updatedProducItem);
  }

}
