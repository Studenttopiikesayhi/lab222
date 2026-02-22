import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// 🚀 ต้องมี FormsModule เพื่อให้ [(ngModel)] ใน HTML ทำงานได้
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, FormsModule], // 🚀 ใส่ FormsModule ตรงนี้
  templateUrl: './home-page.html',
  styleUrls: ['./home-page.css']
})
export class HomePage {
  // ตัวแปรสำหรับสี่เหลี่ยม
  width: number = 0;
  length: number = 0;
  rectArea: number = 0;

  // ตัวแปรสำหรับสามเหลี่ยม
  triBase: number = 0;
  triHeight: number = 0;
  triArea: number = 0;

  // ตัวแปรสำหรับวงกลม
  radius: number = 0;
  cirArea: number = 0;

  // ฟังก์ชันคำนวณพื้นที่สี่เหลี่ยม (กว้าง x ยาว)
  calRect(): void {
    this.rectArea = this.width * this.length;
  }

  // ฟังก์ชันคำนวณพื้นที่สามเหลี่ยม (1/2 x ฐาน x สูง)
  calTri(): void {
    this.triArea = 0.5 * this.triBase * this.triHeight;
  }

  // ฟังก์ชันคำนวณพื้นที่วงกลม (Pi x r^2)
  calCircle(): void {
    this.cirArea = Math.PI * (this.radius * this.radius);
  }
}
