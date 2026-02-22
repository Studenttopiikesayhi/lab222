import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TeacherService } from '../../services/teacher-service';

@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-page.html',
  styleUrls: ['./teacher-page.css']
})
export class TeacherPageComponent implements OnInit {
  teacherForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  teachers: any[] = [];
  isListView: boolean = true;
  uploadedImage: any = 'https://via.placeholder.com/150';
  currentEditId: string = '';

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    private cdr: ChangeDetectorRef
  ) {
    this.teacherForm = this.fb.group({
      teacherId: ['', Validators.required],
      teacherName: ['', Validators.required],
      department: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.teacherService.getAll().subscribe({
      next: (res: any): void => {
        if (res && res.result === 1) {
          this.teachers = res.data || [];
          this.cdr.detectChanges();
        }
      },
      error: (err: any): void => console.error('Error fetching data:', err)
    });
  }

  toggleView(): void {
    this.isListView = !this.isListView;
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.uploadedImage = e.target.result;
        this.cdr.detectChanges();
      };
      reader.readAsDataURL(this.selectedFile as Blob);
    }
  }

  resetForm(): void {
    this.teacherForm.reset();
    this.selectedFile = null;
    this.isEditMode = false;
    this.currentEditId = '';
    this.uploadedImage = 'https://via.placeholder.com/150';
    this.teacherForm.get('teacherId')?.enable();
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    this.resetForm();
  }

  editTeacher(index: number): void {
    const teacher = this.teachers[index];

    // 🚀 ดักจับข้อมูลผี: ถ้าในฐานข้อมูลไม่มีรหัสอาจารย์ ให้เด้งเตือนและหยุดการทำงาน
    if (!teacher.teacherId || teacher.teacherId.trim() === '') {
      alert('❌ ไม่สามารถแก้ไขได้: ข้อมูลนี้ไม่มีรหัสอาจารย์ (ข้อมูลอาจไม่สมบูรณ์)');
      return;
    }

    this.isEditMode = true;
    this.currentEditId = teacher.teacherId;

    this.teacherForm.patchValue({
      teacherId: teacher.teacherId,
      teacherName: teacher.teacherName,
      department: teacher.department
    });

    this.teacherForm.get('teacherId')?.disable();

    if (teacher.teacherPicture) {
      this.uploadedImage = 'http://localhost:3000/download/images/' + teacher.teacherPicture;
    } else {
      this.uploadedImage = 'https://via.placeholder.com/150';
    }
    this.cdr.detectChanges();
  }

  deleteTeacher(index: number): void {
    const teacher = this.teachers[index];
    const id = teacher.teacherId;

    // 🚀 ดักจับข้อมูลผี: ถ้าข้อมูลไม่มีรหัส ไม่ให้ส่ง API ไปลบ เพราะเซิร์ฟเวอร์จะพัง
    if (!id || id.trim() === '') {
      alert('❌ ไม่สามารถลบได้: ข้อมูลนี้ไม่มีรหัสอาจารย์อยู่ในระบบ');
      return;
    }

    if (confirm(`คุณต้องการลบข้อมูลอาจารย์รหัส ${id} ใช่หรือไม่?`)) {
      this.teacherService.deleteData(id).subscribe({
        next: (res: any): void => {
          if (res.result === 1) {
            alert('ลบข้อมูลสำเร็จ! ✅');
            this.getData();
          } else {
            alert('ลบข้อมูลไม่สำเร็จ ❌ (อาจารย์ท่านนี้อาจมีข้อมูลอยู่ในระบบอื่น): ' + res.message);
          }
        },
        error: (err: any): void => {
          console.error(err);
          alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.teacherForm.valid || this.isEditMode) {
      const formValues = this.teacherForm.getRawValue();
      const formData = new FormData();

      formData.append('teacherId', formValues.teacherId || '');
      formData.append('teacherName', formValues.teacherName || '');
      formData.append('department', formValues.department || '');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditMode) {
        this.teacherService.updateData(this.currentEditId, formData).subscribe({
          next: (res: any): void => {
            if (res.result === 1) {
              alert('แก้ไขข้อมูลอาจารย์สำเร็จ! ✅');
              this.resetForm();
              this.getData();
            } else {
              alert('แก้ไขข้อมูลไม่สำเร็จ ❌: ' + res.message);
            }
          },
          error: (err: any): void => {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อ');
          }
        });
      } else {
        this.teacherService.insertData(formData).subscribe({
          next: (res: any): void => {
            if (res.result === 1) {
              alert('เพิ่มข้อมูลอาจารย์สำเร็จ! ✅');
              this.resetForm();
              this.getData();
            } else {
              alert('เพิ่มข้อมูลไม่สำเร็จ! ❌ ' + res.message);
            }
          },
          error: (err: any): void => {
            console.error(err);
            alert('เกิดข้อผิดพลาดในการเชื่อมต่อกับเซิร์ฟเวอร์');
          }
        });
      }
    } else {
      this.teacherForm.markAllAsTouched();
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
}
