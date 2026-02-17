import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FotterComponent } from './footer.component';

describe('FotterComponent', () => {
  let component: FotterComponent;
  let fixture: ComponentFixture<FotterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FotterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FotterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
