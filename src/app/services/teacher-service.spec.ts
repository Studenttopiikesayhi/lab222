import { TestBed } from '@angular/core/testing';
import { TeacherService } from './teacher-service';
// 1. นำเข้าโมดูลสำหรับจำลองการยิง API ในโหมดทดสอบ
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('TeacherService', () => {
  let service: TeacherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      // 2. ใส่ HttpClientTestingModule เข้าไป เพื่อป้องกัน Error
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(TeacherService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
