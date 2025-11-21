

import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-grade45-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
  templateUrl: './grade45-meeting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grade45MeetingFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    attendees: false,
    content: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    meetingTime: ['', Validators.required],
    meetingDate: ['', Validators.required],
    location: ['', Validators.required],
    bghRepresentative: [''],
    chairperson: ['', Validators.required],
    secretary: ['', Validators.required],
    totalMembers: [0, [Validators.required, Validators.min(0)]],
    presentMembers: [0, [Validators.required, Validators.min(0)]],
    absentMembers: [0, [Validators.required, Validators.min(0)]],
    reportPolitical: ['', Validators.required],
    reportProfessional: ['', Validators.required],
    planPolitical: ['', Validators.required],
    planDocuments: [''],
    planHoChiMinh: [''],
    planPublicRelations: [''],
    planProfessional: ['', Validators.required],
    contributions: [''],
    leaderComments: [''],
    conclusion: ['', Validators.required],
    headSignature: ['', Validators.required],
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
        attendees: true,
        content: true,
        signatures: true,
      });
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
  }
}