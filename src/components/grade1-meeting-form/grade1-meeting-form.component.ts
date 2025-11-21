
import { ChangeDetectionStrategy, Component, output, input, OnInit, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';
import { MultiSelectSearchComponent } from '../multi-select-search/multi-select-search.component';
import { SignatureInputComponent } from '../signature-input/signature-input.component';

@Component({
  selector: 'app-grade1-meeting-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, SignatureInputComponent, MultiSelectSearchComponent],
  templateUrl: './grade1-meeting-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Grade1MeetingFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private masterDataService = inject(MasterDataService);
  teachers = this.masterDataService.getTeachers();

  sections = signal({
    timeAndPlace: false,
    attendees: false,
    content: false,
    discussion: false,
    suggestions: false,
    signatures: false,
  });

  meetingForm = this.fb.group({
    meetingDate: ['', Validators.required],
    meetingTime: ['', Validators.required],
    location: ['', Validators.required],
    chairperson: ['', Validators.required],
    secretary: ['', Validators.required],
    director: [''],
    members: [[] as string[], Validators.required],
    absentWithPermission: [0, Validators.min(0)],
    absentWithoutPermission: [0, Validators.min(0)],
    evaluationGood: ['', Validators.required],
    evaluationBad: ['', Validators.required],
    planAction: ['', Validators.required],
    planProfessional: ['', Validators.required],
    discussionContent: [''],
    discussionAgreement: [''],
    discussionChanges: [''],
    conclusionAgreed: ['', Validators.required],
    conclusionDisagreed: [''],
    boardSuggestions: [''],
    headSignature: ['', Validators.required],
    directorSignature: [''],
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
        timeAndPlace: true,
        attendees: true,
        content: true,
        discussion: true,
        suggestions: true,
        signatures: true,
      });
      alert('Vui lòng điền đầy đủ các thông tin bắt buộc.');
    }
  }
}
