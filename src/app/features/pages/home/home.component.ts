import { Component } from '@angular/core';
import { text } from 'stream/consumers';
import { ProudctsSectionComponent } from './components/proudcts-section/proudcts-section.component';
import { CategoriesSectionComponent } from './components/categories-section/categories-section.component';
import { MainSliderComponent } from './components/main-slider/main-slider.component';

@Component({
  selector: 'app-home',
  imports: [ProudctsSectionComponent, CategoriesSectionComponent,MainSliderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {


}
