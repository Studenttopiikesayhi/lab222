import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Teacher } from '../../classes/teacher-class';

@Component({
  selector: 'app-teacher-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './teacher-page.html',
  styleUrl: './teacher-page.css'
})
export class TeacherPage {
  isListView: boolean = true;
  uploadedImage: string = 'https://via.placeholder.com/150?text=No+Image';

  // ตัวแปรสำหรับโหมดแก้ไข
  isEditMode: boolean = false;
  editingIndex: number = -1;

  teacherForm = new FormGroup({
    teacherId: new FormControl('', [Validators.required, Validators.pattern(/^T\d+/)]),
    teacherName: new FormControl('', [Validators.required]),
    department: new FormControl('', [Validators.required]),
  });

  teachers: Teacher[] = [
    { teacherId: 'T001', teacherName: 'อ.วัชรพงศ์', department: 'Software Engineering', teacherPicture: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Felix' },
    { teacherId: 'T002', teacherName: 'อ.สมหญิง', department: 'Computer Science', teacherPicture: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Aneka' },
    { teacherId: 'T003', teacherName: 'อ.สมชาย', department: 'Information Technology', teacherPicture: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Bob' }
  ];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.uploadedImage = e.target.result; };
      reader.readAsDataURL(file);
    }
  }

  // ฟังก์ชันบันทึก (รองรับทั้งเพิ่มใหม่ และ แก้ไข)
  onSubmit() {
    if (this.teacherForm.valid) {
      const formValues = this.teacherForm.value;

      const teacherData: Teacher = {
        teacherId: formValues.teacherId || '',
        teacherName: formValues.teacherName || '',
        department: formValues.department || '',
        teacherPicture: 'https://api.dicebear.com/9.x/avataaars/svg?seed=' + formValues.teacherId,
        customImage: this.uploadedImage.includes('base64') ? this.uploadedImage : undefined
      };

      if (this.isEditMode) {
        // 🔄 โหมดแก้ไข: บันทึกทับตำแหน่งเดิม
        // เช็คว่าถ้าไม่ได้เปลี่ยนรูป ให้ใช้รูปเดิม
        const originalTeacher = this.teachers[this.editingIndex];
        teacherData.customImage = teacherData.customImage ? teacherData.customImage : originalTeacher.customImage;

        this.teachers[this.editingIndex] = teacherData;

        alert('แก้ไขข้อมูลอาจารย์เรียบร้อย!');
        this.cancelEdit(); // ออกจากโหมดแก้ไข
      } else {
        // ➕ โหมดเพิ่มใหม่
        this.teachers.push(teacherData);
        alert('เพิ่มอาจารย์ท่านใหม่เรียบร้อย!');
        this.resetForm();
      }
    } else {
      this.teacherForm.markAllAsTouched();
      alert('กรุณากรอกข้อมูลให้ครบถ้วน');
    }
  }

  // ฟังก์ชันเตรียมข้อมูลเพื่อแก้ไข
  editTeacher(index: number) {
    this.isEditMode = true;
    this.editingIndex = index;
    const t = this.teachers[index];

    // ดึงข้อมูลใส่ฟอร์ม
    this.teacherForm.patchValue({
      teacherId: t.teacherId,
      teacherName: t.teacherName,
      department: t.department
    });

    // ดึงรูปมาโชว์
    this.uploadedImage = t.customImage ? t.customImage : t.teacherPicture;

    // เลื่อนหน้าจอขึ้นไปที่ฟอร์ม (UX)
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // ฟังก์ชันลบข้อมูล 🗑️
  deleteTeacher(index: number) {
    if (confirm('ยืนยันการลบข้อมูลอาจารย์ท่านนี้?')) {
      this.teachers.splice(index, 1);
    }
  }

  // ยกเลิกการแก้ไข
  cancelEdit() {
    this.isEditMode = false;
    this.editingIndex = -1;
    this.resetForm();
  }

  resetForm() {
    this.teacherForm.reset();
    this.uploadedImage = 'https://via.placeholder.com/150?text=No+Image';
  }

  toggleView() { this.isListView = !this.isListView; }
}
