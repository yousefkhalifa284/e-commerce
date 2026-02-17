import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesDetailesComponent } from './categories-detailes.component';

describe('CategoriesDetailesComponent', () => {
  let component: CategoriesDetailesComponent;
  let fixture: ComponentFixture<CategoriesDetailesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategoriesDetailesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategoriesDetailesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
