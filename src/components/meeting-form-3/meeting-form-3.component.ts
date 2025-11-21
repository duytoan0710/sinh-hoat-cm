import { ChangeDetectionStrategy, Component, output, input, OnInit, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-meeting-form-3',
  templateUrl: './meeting-form-3.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
})
export class MeetingForm3Component implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  sections = signal({
    discussion: false,
    summary: false,
    application: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    headComments: ['', Validators.required],
    teacherDiscussion: ['', Validators.required],
    summaryAdvantages: ['', Validators.required],
    summaryDisadvantages: ['', Validators.required],
    applicationDiscussion: ['', Validators.required],
    secretarySignature: ['', Validators.required],
    headSignature: ['', Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const data = this.initialData();
    if (data) {
      this.meetingForm.patchValue(data);
    }
  }

  toggleSection(section: keyof typeof this.sections.prototype): void {
    this.sections.update(s => ({ ...s, [section]: !s[section] }));
  }

  onSubmit(): void {
    if (this.meetingForm.valid) {
      this.formSubmitted.emit(this.meetingForm.value);
    } else {
      this.meetingForm.markAllAsTouched();
      this.sections.set({
        discussion: true,
        summary: true,
        application: true,
        signatures: true,
      });
    }
  }
}
