import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/student';

  constructor(private http: HttpClient) { }

  public getAll(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  public insertData(formData: FormData): Observable<any> {
    return this.http.post(this.apiUrl, formData);
  }

  public deleteData(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  public updateData(id: string, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData);
  }

  // ==========================================
  // 🛑 ปิดระบบ Login (ของนักศึกษา) ตามคำสั่งอาจารย์ (Teacher Account only)
  // ==========================================
  /*
  public login(credentials: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, credentials);
  }
  */
}
