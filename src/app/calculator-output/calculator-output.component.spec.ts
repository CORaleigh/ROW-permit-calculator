import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CalculatorOutputComponent } from './calculator-output.component';

describe('CalculatorOutputComponent', () => {
  let component: CalculatorOutputComponent;
  let fixture: ComponentFixture<CalculatorOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CalculatorOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CalculatorOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
