import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes'; // นำเข้า routes ที่เราเขียนไว้

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes) // 👈 ต้องมีบรรทัดนี้!
  ]
};
