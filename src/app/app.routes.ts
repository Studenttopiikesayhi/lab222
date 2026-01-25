import { Routes } from '@angular/router';

// สังเกตว่าข้างหลังไม่มี .component แล้ว เพราะไฟล์คุณชื่อสั้น
import { HomePage } from './pages/home-page/home-page';
import { StudentPage } from './pages/student-page/student-page';
import { TeacherPage } from './pages/teacher-page/teacher-page';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'student', component: StudentPage },
  { path: 'teacher', component: TeacherPage },
];
