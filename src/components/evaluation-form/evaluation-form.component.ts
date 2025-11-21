
import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormArray, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-evaluation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
  templateUrl: './evaluation-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EvaluationFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    header: false,
    process: false,
    rating: false,
    evaluation: false,
    signatures: false,
  });

  evaluationForm = this.fb.group({
    teacher: ['', Validators.required],
    subject: ['', Validators.required],
    class: ['', Validators.required],
    period: ['', Validators.required],
    ppct: ['', Validators.required],
    date: ['', Validators.required],
    session: ['', Validators.required],
    lesson: ['', Validators.required],
    observerName: ['', Validators.required],
    observerPosition: ['', Validators.required],
    observerDepartment: ['', Validators.required],
    teachingProcess: this.fb.array([]),
    // Rating fields
    score1: [null, [Validators.min(0), Validators.max(1)]],
    score2: [null, [Validators.min(0), Validators.max(1)]],
    score3: [null, [Validators.min(0), Validators.max(1)]],
    score4: [null, [Validators.min(0), Validators.max(1)]],
    score5: [null, [Validators.min(0), Validators.max(2)]],
    score6: [null, [Validators.min(0), Validators.max(2)]],
    score7: [null, [Validators.min(0), Validators.max(2)]],
    score8: [null, [Validators.min(0), Validators.max(2)]],
    score9: [null, [Validators.min(0), Validators.max(2)]],
    score10: [null, [Validators.min(0), Validators.max(2)]],
    score11: [null, [Validators.min(0), Validators.max(2)]],
    score12: [null, [Validators.min(0), Validators.max(2)]],
    finalRating: ['', Validators.required],
    advantages: ['', Validators.required],
    disadvantages: ['', Validators.required],
    teacherSignature: ['', Validators.required],
    headSignature: ['', Validators.required],
    observerSignature: ['', Validators.required],
  });

  ratingCriteria = [
    { name: 'score1', content: 'Kế hoạch và tài liệu dạy học (tối đa 1,0 điểm/tiêu chí)', criteria: 'Chuỗi hoạt động phù hợp với mục tiêu, nội dung và phương pháp dạy học được sử dụng.' },
    { name: 'score2', content: '', criteria: 'Mỗi nhiệm vụ học tập thể hiện rõ mục tiêu, nội dung, kỹ thuật tổ chức và sản phẩm cần đạt được.' },
    { name: 'score3', content: '', criteria: 'Thiết bị dạy học và học liệu được sử dụng phù hợp với các hoạt động của HS.' },
    { name: 'score4', content: '', criteria: 'Phương án kiểm tra, đánh giá trong quá trình tổ chức hoạt động của học sinh hợp lý.' },
    { name: 'score5', content: 'Hoạt động của GV (tối đa 2,0 điểm/tiêu chí)', criteria: 'Phương pháp và hình thức chuyển giao nhiệm vụ học tập hấp dẫn. Nội dung đảm bảo chính xác, logic, khoa học, làm rõ được trọng tâm.' },
    { name: 'score6', content: '', criteria: 'Khả năng theo dõi, quan sát, phát hiện kịp thời những khó khăn của HS và có biện pháp hỗ trợ, khuyến khích HS hợp tác, giúp đỡ nhau khi thực hiện nhiệm vụ.' },
    { name: 'score7', content: '', criteria: 'Nội dung đảm bảo mức độ phân hóa, phù hợp với khả năng của HS. Lồng ghép, tích hợp, liên hệ thực tế có tính giáo dục.' },
    { name: 'score8', content: '', criteria: 'Kết quả hoạt động và thảo luận của HS được tổng hợp, phân tích đánh giá, sửa lỗi kịp thời; đảm bảo phân bổ thời gian hợp lí cho các hoạt động.' },
    { name: 'score9', content: 'Hoạt động của HS (tối đa 2,0 điểm/tiêu chí)', criteria: 'Khả năng tiếp nhận và sẵn sàng thực hiện nhiệm vụ học tập của HS.' },
    { name: 'score10', content: '', criteria: 'HS tích cực, chủ động, sáng tạo, hợp tác trong việc thực hiện các nhiệm vụ học tập.' },
    { name: 'score11', content: '', criteria: 'HS tham gia tích cực trong trình bày, trao đổi, thảo luận về kết quả thực hiện nhiệm vụ học tập.' },
    { name: 'score12', content: '', criteria: 'Kết quả thực hiện các nhiệm vụ học tập: đảm bảo kiến thức, phù hợp với từng hoạt động.' },
  ];

  totalScore = signal(0);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const data = this.initialData();
    if (data) {
      this.evaluationForm.patchValue(data);
       if (data.teachingProcess) {
        // Clear existing rows before patching
        this.teachingProcess.clear();
        data.teachingProcess.forEach((p: any) => this.addProcessRow(p));
      }
    }
    if(this.teachingProcess.length === 0) {
      this.addProcessRow();
      this.addProcessRow();
      this.addProcessRow();
      this.addProcessRow();
    }
    
    // Initial calculation
    this.calculateTotalScore();
    
    // Subscribe to changes to recalculate
    this.evaluationForm.valueChanges.subscribe(() => {
      this.calculateTotalScore();
    });
  }

  private calculateTotalScore(): void {
    const formValue = this.evaluationForm.value;
    let total = 0;
    for (let i = 1; i <= 12; i++) {
        const scoreKey = `score${i}` as keyof typeof formValue;
        const score = formValue[scoreKey];
        total += parseFloat(score as any) || 0;
    }
    this.totalScore.set(total);
  }

  get teachingProcess(): FormArray {
    return this.evaluationForm.get('teachingProcess') as FormArray;
  }

  addProcessRow(data: any = null): void {
    const row = this.fb.group({
      teacherActivity: [data?.teacherActivity || ''],
      studentActivity: [data?.studentActivity || ''],
      observerNotes: [data?.observerNotes || ''],
    });
    this.teachingProcess.push(row);
  }

  removeProcessRow(index: number): void {
    if (this.teachingProcess.length > 1) {
      this.teachingProcess.removeAt(index);
    }
  }

  toggleSection(section: keyof ReturnType<typeof this.sections>): void {
    this.sections.update(s => ({ ...s, [section]: !s[section] }));
  }

  onSubmit(): void {
    if (this.evaluationForm.valid) {
      this.formSubmitted.emit(this.evaluationForm.value);
    } else {
      this.evaluationForm.markAllAsTouched();
      this.sections.set({
        header: true,
        process: true,
        rating: true,
        evaluation: true,
        signatures: true,
      });
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
  }
}
