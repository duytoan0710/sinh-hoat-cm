import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MasterDataService {
  private schools = signal<string[]>([
    'Tiểu học Ánh Sao',
    'Tiểu học Kim Đồng',
    'THCS Lê Lợi',
    'THCS Trưng Vương',
    'THPT Chuyên Hà Nội - Amsterdam'
  ]);

  private departments = signal<string[]>([
    'Tổ 1',
    'Tổ 2',
    'Tổ 3',
    'Tổ Tự nhiên',
    'Tổ Xã hội',
    'Tổ Ngoại ngữ'
  ]);

  private teachers = signal<string[]>([
    'Nguyễn Văn A',
    'Lê Thị B',
    'Trần Văn C',
    'Phạm Thị D',
    'Hoàng Văn E',
    'Vũ Thị F',
    'Đặng Văn G',
    'Bùi Thị H'
  ]);

  // In a real app, this would come from an authentication or user context service
  getCurrentUserInfo() {
    return {
      school: 'Tiểu học Ánh Sao',
      department: 'Tổ 2'
    };
  }

  getSchools() {
    return this.schools.asReadonly();
  }

  getDepartments() {
    return this.departments.asReadonly();
  }

  getTeachers() {
    return this.teachers.asReadonly();
  }
}