import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddShopModalComponent } from './add-shop-modal.component';

describe('AddShopModalComponent', () => {
  let component: AddShopModalComponent;
  let fixture: ComponentFixture<AddShopModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddShopModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddShopModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
