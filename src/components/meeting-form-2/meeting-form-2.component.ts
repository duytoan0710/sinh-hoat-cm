import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-meeting-form-2',
  templateUrl: './meeting-form-2.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent],
})
export class MeetingForm2Component implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    basicInfo: false,
    objectives: false,
    discussion: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    lessonTitle: ['', Validators.required],
    teacher: ['', Validators.required],
    objectiveKnowledge: ['', Validators.required],
    objectiveSkills: ['', Validators.required],
    objectiveAttitude: ['', Validators.required],
    objectiveCompetency: ['', Validators.required],
    discussionNotes: ['', Validators.required],
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
        basicInfo: true,
        objectives: true,
        discussion: true,
        signatures: true,
      });
    }
  }
}