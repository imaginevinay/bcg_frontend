import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PolicyCentreComponent } from './policy-centre.component';

describe('PolicyCentreComponent', () => {
  let component: PolicyCentreComponent;
  let fixture: ComponentFixture<PolicyCentreComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PolicyCentreComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PolicyCentreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
