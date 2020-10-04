import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Shop } from 'src/app/models/shop';

@Component({
  selector: 'app-add-shop-modal',
  templateUrl: './add-shop-modal.component.html',
  styleUrls: ['./add-shop-modal.component.scss']
})
export class AddShopModalComponent implements OnInit {

  dialogTitle: string;
  shop: Shop;

  constructor(public dialogRef: MatDialogRef<AddShopModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.shop = this.data.shop;
    console.log(this.shop);
  }

  updateShop(updatedShop: Shop) {
    this.dialogRef.close(updatedShop);
  }

  addShop(newShop: Shop) {
    this.dialogRef.close(newShop);
  }

}
