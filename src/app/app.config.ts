import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
// 🚀 1. นำเข้า provideHttpClient
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient() // 🚀 2. ใส่โค้ดนี้เพื่อเปิดใช้งานระบบต่อ API
  ]
};
