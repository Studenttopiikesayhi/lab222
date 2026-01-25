import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // เพิ่ม CommonModule เพื่อใช้ Pipe จัดตัวเลข

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './home-page.html',
  styleUrl: './home-page.css'
})
export class HomePage {
  // --- 1. ส่วนของสี่เหลี่ยม (Rectangle) ---
  width: number = 0;
  length: number = 0;
  rectArea: number = 0;

  calRect() {
    this.rectArea = this.width * this.length;
  }

  // --- 2. ส่วนของสามเหลี่ยม (Triangle) ---
  triBase: number = 0;
  triHeight: number = 0;
  triArea: number = 0;

  calTri() {
    this.triArea = 0.5 * this.triBase * this.triHeight;
  }

  // --- 3. ส่วนของวงกลม (Circle) ---
  radius: number = 0;
  cirArea: number = 0;

  calCircle() {
    this.cirArea = Math.PI * (this.radius * this.radius);
  }
}
