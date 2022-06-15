import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChequeComponenetComponent } from './cheque-componenet.component';

describe('ChequeComponenetComponent', () => {
  let component: ChequeComponenetComponent;
  let fixture: ComponentFixture<ChequeComponenetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChequeComponenetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChequeComponenetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
