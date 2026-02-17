// import { inject, Injectable, PLATFORM_ID } from '@angular/core';
// import { TranslateService } from '@ngx-translate/core';
// import { isPlatformBrowser } from '@angular/common';

// @Injectable({
//   providedIn: 'root',
// })
// export class Mytranslate {

//   translateService: TranslateService = inject(TranslateService);
//   platformId = inject(PLATFORM_ID);

//   constructor() {
//     let defaultlang: string = 'en';

//     if (isPlatformBrowser(this.platformId)) {
//       if (localStorage.getItem('lang') !== null) {
//         defaultlang = localStorage.getItem('lang')!;
//       }
//     }

//     this.translateService.setFallbackLang(defaultlang);
//     this.translateService.use(defaultlang);
//     this.changeDirection(defaultlang);
//   }

//   changLang(lang: string) {
//     if (isPlatformBrowser(this.platformId)) {
//       localStorage.setItem('lang', lang);
//     }

//     this.translateService.setFallbackLang(lang);
//     this.translateService.use(lang);
//     this.changeDirection(lang);
//   }

//   changeDirection(lang: string) {
//     if (isPlatformBrowser(this.platformId)) {
//       document.dir = lang === 'ar' ? 'rtl' : 'ltr';
//     }
//   }
// }
