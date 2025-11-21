
import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-grade23-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
  templateUrl: './grade23-meeting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grade23MeetingFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    header: false,
    content: false,
    discussion: false,
    summary: false,
    evaluation: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    meetingTime: ['', Validators.required],
    meetingDate: ['', Validators.required],
    locationRoom: ['', Validators.required],
    presentCount: [0, [Validators.required, Validators.min(0)]],
    absentCount: [0, [Validators.required, Validators.min(0)]],
    chairperson: ['', Validators.required],
    secretary: ['', Validators.required],
    topicLead: ['', Validators.required],
    topicTitle: ['', Validators.required],
    activity1_Opening: [''],
    activity2_NewKnowledge: [''],
    activity3_Practice: [''],
    activity4_Application: [''],
    discussionContent: [''],
    consensus: [''],
    evaluation: [''],
    classification: [''],
    conclusionTime: ['', Validators.required],
    chairpersonSignature: ['', Validators.required],
    secretarySignature: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const data = this.initialData();
    if (data) {
      this.meetingForm.patchValue(data);
    }
  }

  toggleSection(section: keyof ReturnType<typeof this.sections>): void {
    this.sections.update(s => ({ ...s, [section]: !s[section] }));
  }

  onSubmit(): void {
    if (this.meetingForm.valid) {
      this.formSubmitted.emit(this.meetingForm.value);
    } else {
      this.meetingForm.markAllAsTouched();
      this.sections.set({
        header: true,
        content: true,
        discussion: true,
        summary: true,
        evaluation: true,
        signatures: true,
      });
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
  }
}
