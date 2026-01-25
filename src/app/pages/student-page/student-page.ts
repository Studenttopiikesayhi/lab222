import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms'; // 👈 นำเข้าเครื่องมือ Pro
import { Student } from '../../classes/student-class';

@Component({
  selector: 'app-student-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule], // 👈 ใช้ Reactive Forms
  templateUrl: './student-page.html',
  styleUrl: './student-page.css'
})
export class StudentPage {
  isListView: boolean = true;
  uploadedImage: string = 'https://via.placeholder.com/150?text=No+Image';

  // ตัวแปรเช็คว่ากำลัง "แก้ไข" อยู่หรือเปล่า?
  isEditMode: boolean = false;
  editingStudentIndex: number = -1; // จำตำแหน่งคนที่จะแก้

  // 1. สร้าง Form Control + กฎเหล็ก (Validators) 🛡️
  studentForm = new FormGroup({
    studentId: new FormControl('', [Validators.required]),
    name: new FormControl('', [Validators.required]),
    score: new FormControl(0, [Validators.required, Validators.min(0), Validators.max(100)]), // คะแนนต้อง 0-100
    gender: new FormControl('male', [Validators.required])
  });

  students: Student[] = [
    { studentId: '6601', name: 'นายสมชาย (เรียนเก่ง)', score: 85, gender: 'male' },
    { studentId: '6602', name: 'นางสาวสมหญิง (พยายาม)', score: 49, gender: 'female' },
    { studentId: '6603', name: 'นายจาทร (ปานกลาง)', score: 62, gender: 'male' },
    { studentId: '6604', name: 'นางสาวมานี (ท็อปห้อง)', score: 95, gender: 'female' },
    { studentId: '6605', name: 'นายชูใจ (ขาดเรียน)', score: 0, gender: 'male' }
  ];

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => { this.uploadedImage = e.target.result; };
      reader.readAsDataURL(file);
    }
  }

  // 2. ฟังก์ชันบันทึก (ฉลาดขึ้น: แยกแยะได้ว่า "เพิ่มใหม่" หรือ "บันทึกทับ")
  onSubmit() {
    if (this.studentForm.valid) {
      const formValues = this.studentForm.value;

      const studentData: Student = {
        studentId: formValues.studentId || '',
        name: formValues.name || '',
        score: formValues.score || 0,
        gender: formValues.gender || 'male',
        customImage: this.uploadedImage.includes('base64') ? this.uploadedImage : undefined
      };

      if (this.isEditMode) {
        // 🔄 กรณีแก้ไข: บันทึกทับคนเดิม
        this.students[this.editingStudentIndex] = {
          ...studentData,
          // ถ้าไม่ได้อัปรูปใหม่ ให้ใช้รูปเดิม (logic นี้ซับซ้อนนิดนึงแต่ work)
          customImage: studentData.customImage ? studentData.customImage : this.students[this.editingStudentIndex].customImage
        };
        alert('แก้ไขข้อมูลเรียบร้อย!');
        this.isEditMode = false;
        this.editingStudentIndex = -1;
      } else {
        // ➕ กรณีเพิ่มใหม่
        this.students.push(studentData);
        alert('เพิ่มนักเรียนเรียบร้อย!');
      }

      // Reset Form
      this.studentForm.reset({ score: 0, gender: 'male' }); // reset แล้วตั้งค่า default
      this.uploadedImage = 'https://via.placeholder.com/150?text=No+Image';
    } else {
      this.studentForm.markAllAsTouched(); // ฟ้องแดงทั้งแผง
      alert('กรุณากรอกข้อมูลให้ถูกต้อง (คะแนนต้อง 0-100)');
    }
  }

  // 3. ฟังก์ชันดึงข้อมูลมาแก้ไข (Future Feature 🔮)
  editStudent(index: number) {
    const s = this.students[index];
    this.isEditMode = true;
    this.editingStudentIndex = index;

    // ยัดข้อมูลใส่ฟอร์ม (Magic ของ Reactive Forms!)
    this.studentForm.patchValue({
      studentId: s.studentId,
      name: s.name,
      score: s.score,
      gender: s.gender
    });

    // เอารูปมาโชว์ด้วย
    if (s.customImage) {
      this.uploadedImage = s.customImage;
    } else {
      this.uploadedImage = `https://api.dicebear.com/9.x/avataaars/svg?seed=${s.studentId}`;
    }
  }

  // ปุ่มยกเลิกการแก้ไข
  cancelEdit() {
    this.isEditMode = false;
    this.editingStudentIndex = -1;
    this.studentForm.reset({ score: 0, gender: 'male' });
    this.uploadedImage = 'https://via.placeholder.com/150?text=No+Image';
  }

  toggleView() { this.isListView = !this.isListView; }
}
