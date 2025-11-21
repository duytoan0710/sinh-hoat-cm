import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { MultiSelectSearchComponent } from '../multi-select-search/multi-select-search.component';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-meeting-form-1',
  templateUrl: './meeting-form-1.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent, MultiSelectSearchComponent],
})
export class MeetingForm1Component implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();
  
  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    basicInfo: false,
    attendees: false,
    content: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    meetingDate: ['', Validators.required],
    meetingTime: ['', Validators.required],
    location: ['', Validators.required],
    attendees: [[] as string[], Validators.required],
    absent: [[] as string[]],
    chairperson: ['', Validators.required],
    position: ['Tổ trưởng', Validators.required],
    proposedLesson: ['', Validators.required],
    reasonForChoice: ['', Validators.required],
    assignedTeacher: ['', Validators.required],
    proposedTeachingDate: ['', Validators.required],
    discussionNotes: [''],
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
      // Open all sections to show validation errors
      this.sections.set({
        basicInfo: true,
        attendees: true,
        content: true,
        signatures: true,
      });
    }
  }
}
