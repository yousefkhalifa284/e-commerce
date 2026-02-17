import { Component, Input } from '@angular/core';
import { Icategory } from '../../models/categories/icategory.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-category-card',
  imports: [RouterLink],
  templateUrl: './category-card.component.html',
  styleUrl: './category-card.component.css',
})
export class CategoryCardComponent {
@Input({required: true}) category!:Icategory;
}
