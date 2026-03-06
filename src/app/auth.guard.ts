import { inject } from '@angular/core';
import { Router } from '@angular/router';

// 🚀 รปภ. หน้าเว็บ (ถ้าไม่มีตั๋ว ห้ามเข้าหน้าจัดการ)
export const authGuard = () => {
  const router = inject(Router);
  const token = localStorage.getItem('token'); // ไปดูในเก๊ะว่ามีตั๋วไหม

  if (token) {
    return true; // มีตั๋ว... เชิญผ่านได้
  } else {
    // ไม่มีตั๋ว... เด้งกลับไปหน้า login ทันที
    alert('กรุณาเข้าสู่ระบบก่อนนะ');
    router.navigate(['/login']);
    return false;
  }
};
