import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListStockWithAttributesComponent } from './list-stock-with-attributes.component';

describe('ListStockWithAttributesComponent', () => {
  let component: ListStockWithAttributesComponent;
  let fixture: ComponentFixture<ListStockWithAttributesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListStockWithAttributesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListStockWithAttributesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
