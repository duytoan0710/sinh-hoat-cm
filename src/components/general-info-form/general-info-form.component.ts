import { ChangeDetectionStrategy, Component, output, input, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterDataService } from '../../services/master-data.service';

@Component({
  selector: 'app-general-info-form',
  templateUrl: './general-info-form.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
})
export class GeneralInfoFormComponent implements OnInit {
  formSubmitted = output<any>();
  initialData = input<any>();
  
  private masterDataService = inject(MasterDataService);

  generalForm = this.fb.group({
    title: ['', Validators.required],
    school: [{ value: '', disabled: true }, Validators.required],
    department: [{ value: '', disabled: true }, Validators.required],
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    const data = this.initialData();
    // If editing an existing record, use its data.
    if (data && data.school && data.department) {
      this.generalForm.patchValue(data);
    } else {
      // If creating a new record, populate with default user info.
      const userInfo = this.masterDataService.getCurrentUserInfo();
      this.generalForm.patchValue({
        ...userInfo,
        title: data?.title || ''
      });
    }
  }

  onSubmit(): void {
    if (this.generalForm.valid) {
      // Use getRawValue() to include the values of disabled controls
      this.formSubmitted.emit(this.generalForm.getRawValue());
    } else {
      this.generalForm.markAllAsTouched();
    }
  }
}