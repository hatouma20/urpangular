import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FournisseurProfileComponent } from './fournisseur-profile.component';

describe('FournisseurProfileComponent', () => {
  let component: FournisseurProfileComponent;
  let fixture: ComponentFixture<FournisseurProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FournisseurProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FournisseurProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
