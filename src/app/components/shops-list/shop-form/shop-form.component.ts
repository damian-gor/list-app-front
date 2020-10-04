import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Shop } from 'src/app/models/shop';
import { ShopService } from 'src/app/services/shop/shop.service';

@Component({
  selector: 'app-shop-form',
  templateUrl: './shop-form.component.html',
  styleUrls: ['./shop-form.component.scss']
})
export class ShopFormComponent implements OnInit {

  @Input() shop: Shop;
  @Output() formSubmit: EventEmitter<Shop> = new EventEmitter<Shop>();

  constructor(private shopService: ShopService) { }

  ngOnInit(): void {
    this.resetShop();
  }

  onSubmit(form: NgForm) {
    this.shop.name = form.value.name;
    this.shop.promotionUrl = form.value.promotionUrl;

    if (this.shop.id) {
      this.shopService.updateShop(this.shop).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetShop();
      }
      );
    } else {
      this.shopService.addShop(this.shop).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetShop();
      }
      );
    }
  }

  resetShop() {
    if (!this.shop)
      this.shop = new Shop();
  }

}
