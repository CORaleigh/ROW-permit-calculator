import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PermitListingComponent } from './permit-listing.component';

describe('PermitListingComponent', () => {
  let component: PermitListingComponent;
  let fixture: ComponentFixture<PermitListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PermitListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PermitListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
