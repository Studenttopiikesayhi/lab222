// src/app/auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. ไปหยิบตั๋วในเก๊ะที่ชื่อ 'token'
  const myToken = localStorage.getItem('token');

  // 2. ถ้ามีตั๋ว ให้เอามาห้อยคอ (แนบไปกับ Header)
  if (myToken) {
    const authReq = req.clone({
      setHeaders: {
        // ต้องมีคำว่า Bearer และเว้นวรรค 1 ที ตามที่ auth-guard.js ของสั่งไว้
        Authorization: `Bearer ${myToken}`
      }
    });
    return next(authReq);
  }

  return next(req);
};
