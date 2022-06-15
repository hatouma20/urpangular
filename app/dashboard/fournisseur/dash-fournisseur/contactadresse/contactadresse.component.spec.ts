import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactadresseComponent } from './contactadresse.component';

describe('ContactadresseComponent', () => {
  let component: ContactadresseComponent;
  let fixture: ComponentFixture<ContactadresseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactadresseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactadresseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
