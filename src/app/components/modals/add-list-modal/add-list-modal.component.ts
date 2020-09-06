import { Component, OnInit, Inject } from '@angular/core';
import { ShoppingListDTO } from 'src/app/models/shopping-list-dto';
import { MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-add-list-modal',
  templateUrl: './add-list-modal.component.html',
  styleUrls: ['./add-list-modal.component.scss']
})
export class AddListModalComponent implements OnInit {

  dialogTitle: string;
  list: ShoppingListDTO;

  constructor(
    public dialogRef: MatDialogRef<AddListModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
    this.dialogTitle = this.data.dialogTitle;
    this.list = this.data.list;
  }

  createNewList (newList: ShoppingListDTO) {
    this.dialogRef.close(newList);
  }

  editList(updatedList: ShoppingListDTO) {
    this.dialogRef.close(updatedList);
  }

}
