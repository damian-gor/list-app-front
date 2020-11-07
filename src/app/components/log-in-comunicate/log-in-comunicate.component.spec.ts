import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogInComunicateComponent } from './log-in-comunicate.component';

describe('LogInComunicateComponent', () => {
  let component: LogInComunicateComponent;
  let fixture: ComponentFixture<LogInComunicateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogInComunicateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogInComunicateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
