import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { StudentService } from '../../services/student-service';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './student-page.html',
  styleUrls: ['./student-page.css']
})
export class StudentPage implements OnInit {
  studentForm: FormGroup;
  selectedFile: File | null = null;
  isEditMode: boolean = false;
  students: any[] = [];
  isListView: boolean = true;
  uploadedImage: any = 'https://via.placeholder.com/150';
  currentEditId: string = '';

  constructor(
    private fb: FormBuilder,
    private studentService: StudentService,
    private cdr: ChangeDetectorRef
  ) {
    this.studentForm = this.fb.group({
      studentId: ['', Validators.required],
      name: ['', Validators.required],
      gender: ['', Validators.required],
      score: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.studentService.getAll().subscribe({
      next: (res: any): void => {
        if (res && res.result === 1) {
          this.students = res.data || [];
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
    this.studentForm.reset();
    this.selectedFile = null;
    this.isEditMode = false;
    this.currentEditId = '';
    this.uploadedImage = 'https://via.placeholder.com/150';
    this.studentForm.get('studentId')?.enable();
    this.cdr.detectChanges();
  }

  cancelEdit(): void {
    this.resetForm();
  }

  editStudent(index: number): void {
    this.isEditMode = true;
    const student = this.students[index];
    this.currentEditId = student.studentId;

    this.studentForm.patchValue({
      studentId: student.studentId,
      name: student.name,
      gender: student.gender,
      score: student.score
    });

    this.studentForm.get('studentId')?.disable();

    if (student.studentPicture) {
      this.uploadedImage = 'http://localhost:3000/download/images/' + student.studentPicture;
    } else {
      this.uploadedImage = 'https://via.placeholder.com/150';
    }
    this.cdr.detectChanges();
  }

  deleteStudent(index: number): void {
    const student = this.students[index];
    const id = student.studentId;

    if (confirm(`คุณต้องการลบข้อมูลนักเรียนรหัส ${id} ใช่หรือไม่?`)) {
      this.studentService.deleteData(id).subscribe({
        next: (res: any): void => {
          if (res.result === 1) {
            alert('ลบข้อมูลสำเร็จ! ✅');
            this.getData();
          } else {
            alert('ลบข้อมูลไม่สำเร็จ ❌: ' + res.message);
          }
        },
        error: (err: any): void => {
          console.error(err);
          alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
        }
      });
    }
  }

  onSubmit(): void {
    if (this.studentForm.valid || this.isEditMode) {
      const formValues = this.studentForm.getRawValue();
      const formData = new FormData();

      formData.append('studentId', formValues.studentId || '');
      formData.append('name', formValues.name || '');
      formData.append('gender', formValues.gender || '');
      formData.append('score', formValues.score?.toString() || '0');

      if (this.selectedFile) {
        formData.append('image', this.selectedFile);
      }

      if (this.isEditMode) {
        this.studentService.updateData(this.currentEditId, formData).subscribe({
          next: (res: any): void => {
            if (res.result === 1) {
              alert('แก้ไขข้อมูลนักเรียนสำเร็จ! ✅');
              this.resetForm();
              this.getData();
            } else {
              alert('แก้ไขข้อมูลไม่สำเร็จ ❌: ' + res.message);
            }
          },
          error: (err: any): void => {
            console.error(err);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
          }
        });
      } else {
        this.studentService.insertData(formData).subscribe({
          next: (res: any): void => {
            if (res.result === 1) {
              alert('เพิ่มข้อมูลนักเรียนสำเร็จ! ✅');
              this.resetForm();
              this.getData();
            } else {
              // เปลี่ยนมาแสดงข้อความ Error จาก MySQL โดยตรงเลย
              alert('เพิ่มข้อมูลไม่สำเร็จ! ❌ ' + res.message);
            }
          },
          error: (err: any): void => {
            console.error(err);
            alert('ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ได้');
          }
        });
      }
    } else {
      this.studentForm.markAllAsTouched();
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }
}
