import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TeacherService {
  private apiUrl = 'http://localhost:3000/teacher';

  constructor(private http: HttpClient) { }

  // 🚀 ดึงข้อมูลทั้งหมด
  public getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  // 🚀 เพิ่มข้อมูลอาจารย์
  public insertData(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  // 🚀 ลบข้อมูลอาจารย์
  public deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // 🚀 แก้ไขข้อมูลอาจารย์
  public updateData(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // ==========================================
  // 🔐 ระบบ Login
  // ==========================================

  // 🚀 ส่งข้อมูลไปเช็ค Login ที่ Backend
  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
}
