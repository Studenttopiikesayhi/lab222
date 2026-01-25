import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router'; // 1. นำเข้าเครื่องมือเปลี่ยนหน้า
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  // 2. บรรทัดนี้สำคัญที่สุด! ต้องใส่ RouterOutlet และ RouterLink เข้าไป
  imports: [CommonModule, RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class AppComponent {
  title = 'lab222';
}
