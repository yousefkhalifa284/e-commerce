import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProudctsSectionComponent } from './proudcts-section.component';

describe('ProudctsSectionComponent', () => {
  let component: ProudctsSectionComponent;
  let fixture: ComponentFixture<ProudctsSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProudctsSectionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProudctsSectionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
