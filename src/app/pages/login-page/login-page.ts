import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

// 🚀 นำเข้า Services ทั้งสองตัว (เช็ค path ให้ตรงกับของบอสนะครับ)
import { TeacherService } from '../../services/teacher-service';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login-page.html',
  styleUrls: ['./login-page.css']
})
export class LoginPageComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private studentService: StudentService,
    private router: Router
  ) {
    // 💡 ปรับฟอร์มให้มี 3 ช่อง: role, userId, password
    this.loginForm = this.fb.group({
      role: ['teacher', Validators.required], // ตั้งค่าเริ่มต้นให้อยู่ที่ปุ่ม "อาจารย์"
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const formValues = this.loginForm.getRawValue();
      const selectedRole = formValues.role; // ดูว่าผู้ใช้เลือกเป็น teacher หรือ student

      // 💡 แปลงตัวแปร userId ให้เป็นชื่อที่ Backend ต้องการ (teacherId หรือ studentId)
      let credentials: any = {};
      if (selectedRole === 'teacher') {
        credentials = { teacherId: formValues.userId, password: formValues.password };
      } else {
        credentials = { studentId: formValues.userId, password: formValues.password };
      }

      // 🚀 แยกการยิง API ตามสถานะที่เลือก
      if (selectedRole === 'teacher') {
        this.teacherService.login(credentials).subscribe({
          next: (res: any) => this.handleLoginResponse(res, '/teacher'),
          error: (err: any) => this.handleError(err)
        });
      } else if (selectedRole === 'student') {
        this.studentService.login(credentials).subscribe({
          next: (res: any) => this.handleLoginResponse(res, '/student'),
          error: (err: any) => this.handleError(err)
        });
      }

    } else {
      this.loginForm.markAllAsTouched();
      alert('กรุณากรอกรหัสผู้ใช้งานและรหัสผ่านให้ครบถ้วน');
    }
  }

  // ฟังก์ชันสำหรับจัดการ Alert การเก็บ Token และการเด้งเปลี่ยนหน้า
  private handleLoginResponse(res: any, targetRoute: string): void {
    if (res.result === 1 && res.status === 200) {
      alert('✅ ' + res.message);

      // 🚀 จุดสำคัญที่เพิ่มเข้ามา: เก็บ "ตั๋ว" (Token) ลงเครื่องเพื่อใช้ในการดึงข้อมูล
      if (res.token) {
        localStorage.setItem('token', res.token);
      }

      // เก็บข้อมูลผู้ใช้เดิมที่บอสทำไว้
      localStorage.setItem('currentUser', JSON.stringify(res.data));

      // เด้งไปหน้าที่ถูกต้อง
      this.router.navigate([targetRoute]);
    } else {
      alert('❌ ' + res.message);
    }
  }

  private handleError(err: any): void {
    console.error(err);
    alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
  }
}
