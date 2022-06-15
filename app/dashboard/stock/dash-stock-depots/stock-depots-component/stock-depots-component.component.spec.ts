import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAttributesComponentComponent } from './stock-depots-component.component';

describe('StockAttributesComponentComponent', () => {
  let component: StockAttributesComponentComponent;
  let fixture: ComponentFixture<StockAttributesComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAttributesComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAttributesComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
