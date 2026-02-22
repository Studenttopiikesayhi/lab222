import { ComponentFixture, TestBed } from '@angular/core/testing';

// 🛠️ แก้ไข: เปลี่ยนชื่อคลาสเป็น TeacherPageComponent ให้ตรงกับไฟล์หลัก
import { TeacherPageComponent } from './teacher-page';

describe('TeacherPageComponent', () => {
  let component: TeacherPageComponent;
  let fixture: ComponentFixture<TeacherPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeacherPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TeacherPageComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
