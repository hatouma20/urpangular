import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStockComponentComponent } from './add-stock-component.component';

describe('AddStockComponentComponent', () => {
  let component: AddStockComponentComponent;
  let fixture: ComponentFixture<AddStockComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddStockComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
