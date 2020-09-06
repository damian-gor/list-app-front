import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { ShoppingListService } from 'src/app/services/shoppingList/shopping-list.service';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-list-form',
  templateUrl: './list-form.component.html',
  styleUrls: ['./list-form.component.scss']
})
export class ListFormComponent implements OnInit {

  @Input() list: ShoppingListDTO;
  @Output() formSubmit: EventEmitter<ShoppingListDTO> = new EventEmitter<ShoppingListDTO>();

  constructor(private shoppingListService: ShoppingListService) { this.resetList() }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm) {
    this.list.shopName = form.value.shopName;

    if (this.list.id == null)
      this.shoppingListService.addShoppingList(this.list).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetList();
      }); else {
      this.formSubmit.emit(this.list);
      this.shoppingListService.updateShoppingList(this.list).subscribe(result => {
        this.formSubmit.emit(result);
        form.reset();
        this.resetList();
      });
    }
  }

  resetList() {
    this.list = new ShoppingListDTO();
  }
}
