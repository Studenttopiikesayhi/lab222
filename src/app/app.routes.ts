import { Routes } from '@angular/router';

// นำเข้า Component ทั้ง 3 หน้า (เช็คให้แน่ใจว่าชื่อไฟล์และ Class ตรงตามนี้ครับ)
import { HomePage } from './pages/home-page/home-page';
import { StudentPage } from './pages/student-page/student-page';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page';

export const routes: Routes = [
  // 🚀 1. ตั้งค่าถ้าเข้ามาหน้าเว็บเปล่าๆ (localhost:4200) ให้เด้งไปที่หน้า home ทันที
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // 🚀 2. เส้นทางสำหรับหน้าต่างๆ
  { path: 'home', component: HomePage },
  { path: 'student', component: StudentPage },
  { path: 'teacher', component: TeacherPageComponent },
];
