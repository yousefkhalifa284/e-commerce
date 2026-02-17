import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashPageComponent } from './cash-page.component';

describe('CashPageComponent', () => {
  let component: CashPageComponent;
  let fixture: ComponentFixture<CashPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
