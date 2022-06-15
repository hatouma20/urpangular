import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VirementResultComponent } from './virement-result.component';

describe('VirementResultComponent', () => {
  let component: VirementResultComponent;
  let fixture: ComponentFixture<VirementResultComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VirementResultComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VirementResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
