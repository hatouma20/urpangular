import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockComponentComponent } from './list-stock-component.component';

describe('ListStockComponentComponent', () => {
  let component: ListStockComponentComponent;
  let fixture: ComponentFixture<ListStockComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
