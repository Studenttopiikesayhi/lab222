import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login-page/login-page';
import { TeacherPageComponent } from './pages/teacher-page/teacher-page';
import { StudentPageComponent } from './pages/student-page/student-page';
// นำเข้าหน้า Home (เครื่องคิดเลข)
import { HomePage } from './pages/home-page/home-page';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  // เพิ่มเส้นทางหน้าหลัก
  { path: 'home', component: HomePage },

  { path: 'login', component: LoginPageComponent },
  {
    path: 'teacher',
    component: TeacherPageComponent,
    canActivate: [authGuard] // ตรวจสอบตั๋วก่อนเข้าหน้าอาจารย์
  },
  {
    path: 'student',
    component: StudentPageComponent,
    canActivate: [authGuard] // ตรวจสอบตั๋วก่อนเข้าหน้านักเรียน
  },

  // ถ้าไม่ใส่ path ให้เด้งไปหน้า home
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];
