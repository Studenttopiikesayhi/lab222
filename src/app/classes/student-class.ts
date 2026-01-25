export class Student {
  studentId: string = "";
  name: string = "";
  score: number = 0;
  gender: string = "";

  // 👇 เพิ่มบรรทัดนี้ครับ (เจาะช่องพิเศษสำหรับรูปอัปโหลด)
  customImage?: string = "";
}
