
import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal, computed } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-lesson-evaluation-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
  templateUrl: './lesson-evaluation-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LessonEvaluationFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    header: false,
    rating: false,
    notes: false,
    signatures: false,
  });

  evaluationForm = this.fb.group({
    studentName: ['', Validators.required],
    subject: ['', Validators.required],
    date: ['', Validators.required],
    session: ['', Validators.required],
    period: ['', Validators.required],
    class: ['', Validators.required],
    lesson: ['', Validators.required],
    attendingTeacher: ['', Validators.required],
    // Rating fields
    c1_1: [null, [Validators.required, Validators.min(0), Validators.max(1.5)]],
    c1_2: [null, [Validators.required, Validators.min(0), Validators.max(1.5)]],
    c2_1: [null, [Validators.required, Validators.min(0), Validators.max(0.5)]],
    c2_2: [null, [Validators.required, Validators.min(0), Validators.max(1.5)]],
    c2_3: [null, [Validators.required, Validators.min(0), Validators.max(0.5)]],
    c2_4: [null, [Validators.required, Validators.min(0), Validators.max(0.5)]],
    c2_5: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    c2_6: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    c3_1: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    c3_2: [null, [Validators.required, Validators.min(0), Validators.max(2)]],
    c3_3: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    c3_4: [null, [Validators.required, Validators.min(0), Validators.max(2)]],
    c3_5: [null, [Validators.required, Validators.min(0), Validators.max(2)]],
    c4_1: [null, [Validators.required, Validators.min(0), Validators.max(2)]],
    c4_2: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    c4_3: [null, [Validators.required, Validators.min(0), Validators.max(1)]],
    // Notes
    mainActivities: [''],
    notes: [''],
    generalComments: [''],
    // Signature
    evaluatorSignature: ['', Validators.required],
  });

  ratingCriteria = [
      { field: 'c1_1', max: 1.5, text: '1.1. Xác định được vị trí, mục tiêu, chuẩn kiến thức và kỹ năng, yêu cầu cần đạt, nội dung cơ bản trọng tâm của tiết dạy, hoạt động giáo dục.' },
      { field: 'c1_2', max: 1.5, text: '1.2. Đảm bảo chính xác, hệ thống, toàn diện (về kiến thức, kỹ năng; năng lực, phẩm chất)' },
      { field: 'c2_1', max: 0.5, text: '2.1. Tổ chức các hoạt động linh hoạt, hợp lý và hiệu quả.' },
      { field: 'c2_2', max: 1.5, text: '2.2. Vận dụng phương pháp và hình thức tổ chức tiết dạy, các hoạt động giáo dục theo hướng phát huy tính tích cực, chủ động, sáng tạo và phù hợp với các đối tượng học sinh.' },
      { field: 'c2_3', max: 0.5, text: '2.3. Nhận xét và đánh giá kết quả hoạt động của học sinh theo đúng Thông tư 27/2020.' },
      { field: 'c2_4', max: 0.5, text: '2.4. Khai thác nội dung dạy học, liên hệ, cập nhật những vấn đề xã hội, nhân văn gắn với thực tế địa phương nhằm phát triển năng lực, phẩm chất của học sinh.' },
      { field: 'c2_5', max: 1, text: '2.5. Sử dụng hợp lý, hiệu quả các phương tiện, thiết bị dạy học, tác phong sư phạm chuẩn mực, lời nói mạch lạc, truyền cảm.' },
      { field: 'c2_6', max: 1, text: '2.6. Xử lí tốt tình huống sư phạm, phân bổ thời gian hợp lý, kịp thời giúp đỡ học sinh có khó khăn trong hoạt động giáo dục, học sinh khuyết tật (nếu có).' },
      { field: 'c3_1', max: 1, text: '3.1. Chuẩn bị đầy đủ đồ dùng học tập và sử dụng hiệu quả; biết làm việc theo yêu cầu của giáo viên.' },
      { field: 'c3_2', max: 2, text: '3.2. Mạnh dạn, tự tin khi hợp tác với bạn và giao tiếp trước lớp.' },
      { field: 'c3_3', max: 1, text: '3.3. Biết đánh giá kết quả hoạt động của mình và của bạn.' },
      { field: 'c3_4', max: 2, text: '3.4. Biết lắng nghe, tìm kiếm sự trợ giúp của thầy cô, bạn bè để hoàn thành nhiệm vụ.' },
      { field: 'c3_5', max: 2, text: '3.5. Tích cực, chủ động làm việc cá nhân, nhóm hiệu quả.' },
      { field: 'c4_1', max: 2, text: '4.1. Học sinh nắm được kiến thức, kỹ năng cơ bản của bài học, năng lực, phẩm chất được hình thành và phát triển.' },
      { field: 'c4_2', max: 1, text: '4.2. Biết vận dụng những điều đã học để giải quyết các vấn đề tương tự trong thực tiễn cuộc sống.' },
      { field: 'c4_3', max: 1, text: '4.3. Các hoạt động giáo dục diễn ra tự nhiên, nhẹ nhàng và hiệu quả phù hợp với đặc điểm học sinh tiểu học.' },
  ];
  
  totalScore = signal(0);

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const data = this.initialData();
    if (data) {
      this.evaluationForm.patchValue(data);
    }

    // Initial calculation
    this.calculateTotalScore();
    
    // Subscribe to changes to recalculate
    this.evaluationForm.valueChanges.subscribe(() => {
      this.calculateTotalScore();
    });
  }

  private calculateTotalScore(): void {
    const formValue = this.evaluationForm.getRawValue();
    const total = this.ratingCriteria.reduce((acc, curr) => {
        const score = formValue[curr.field as keyof typeof formValue];
        return acc + (parseFloat(score as any) || 0);
    }, 0);
    this.totalScore.set(total);
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
        rating: true,
        notes: true,
        signatures: true,
      });
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
  }
}
