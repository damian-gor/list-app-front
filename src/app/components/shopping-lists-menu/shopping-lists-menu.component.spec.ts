import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShoppingListsMenuComponent } from './shopping-lists-menu.component';

describe('ShoppingListsMenuComponent', () => {
  let component: ShoppingListsMenuComponent;
  let fixture: ComponentFixture<ShoppingListsMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShoppingListsMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShoppingListsMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
