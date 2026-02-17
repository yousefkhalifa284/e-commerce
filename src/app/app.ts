import { Component, computed, signal, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { initFlowbite } from 'flowbite';
import { FlowbiteService } from './core/services/flowbiteServices/flowbite';
import { jwtDecode } from "jwt-decode";

import { environment } from './../environments/environment';
import { platformBrowser } from '@angular/platform-browser';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,],


templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('e-commerce');
  private platform_id = inject(PLATFORM_ID);
  constructor(private flowbiteService: FlowbiteService) {}

  ngOnInit(): void {
//     if(isPlatformBrowser(this.platform_id)){
//     const token = localStorage.getItem('token')!;
//     if(token){
// const decodedToken: any = jwtDecode(token);
//     console.log(decodedToken);
//     }

//   }
    console.log(environment.apiUrl);

    this.flowbiteService.loadFlowbite((flowbite) => {
      initFlowbite();
    });

  }

}
