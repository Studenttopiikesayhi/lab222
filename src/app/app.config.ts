import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './auth.interceptor'; // 👈 นำเข้าตัวที่เราเพิ่งสร้าง

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // 🚀 เปิดใช้งานการส่งตั๋ว (Token) ไปพร้อมกับคำขอข้อมูล
    provideHttpClient(withInterceptors([authInterceptor]))
  ]
};
