import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HomePage } from './home-page';
import { FormsModule } from '@angular/forms';

describe('TEST FOR HOME PAGE (AREA CALCULATOR)', () => {
  let component: HomePage;
  let fixture: ComponentFixture<HomePage>;
  let el: HTMLElement; // สร้างตัวแปร el แบบอาจารย์ เพื่อใช้ดึงหน้าเว็บ

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomePage, FormsModule] // ต้องมี FormsModule เพราะคุณใช้ ngModel
    })
      .compileComponents();

    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
    el = fixture.nativeElement as HTMLElement; // ดึง DOM ของหน้าเว็บมาเก็บใน el
    fixture.detectChanges(); // อัปเดต UI ครั้งแรก
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Integration test ตามแบบอาจารย์เป๊ะๆ
  it('CASE 3: Integration Test -> Width = 6, HEIGHT = 5', async () => {
    // 1. จำลองการหาช่องกรอกและปุ่มจาก ID ที่เราเพิ่งเติมไป
    const widthInput = el.querySelector('#recWidth') as HTMLInputElement;
    const heightInput = el.querySelector('#recHeight') as HTMLInputElement;
    const calcButton = el.querySelector('#recButton') as HTMLButtonElement;

    // 2. จำลองการพิมพ์เลข 6 และ 5
    widthInput.value = '6';
    widthInput.dispatchEvent(new Event('input')); // บังคับให้ Angular รับรู้การพิมพ์

    heightInput.value = '5';
    heightInput.dispatchEvent(new Event('input'));

    // 3. จำลองการกดปุ่มคำนวณ
    calcButton.click();
    fixture.detectChanges(); // สั่งอัปเดตหน้าเว็บหลังกดปุ่ม

    // 4. ตรวจสอบผลลัพธ์ว่า 6 * 5 ต้องเท่ากับ 30
    const resultText = el.querySelector('.rectangle-card .result b')?.textContent;
    expect(resultText).toBe('30');
  });
});
