import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app'; // 👈 แก้ตรงนี้: เรียกหา AppComponent (ไม่ใช่ App เฉยๆ)

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
