

import { ChangeDetectionStrategy, Component, output, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalActivity } from '../../models/professional-activity.model';
import { Grade1MeetingFormComponent } from '../grade1-meeting-form/grade1-meeting-form.component';
import { ProfessionalActivityService } from '../../services/professional-activity.service';
import { Grade23MeetingFormComponent } from '../grade23-meeting-form/grade23-meeting-form.component';
import { Grade45MeetingFormComponent } from '../grade45-meeting-form/grade45-meeting-form.component';

@Component({
  selector: 'app-regular-meeting',
  standalone: true,
  imports: [CommonModule, Grade1MeetingFormComponent, Grade23MeetingFormComponent, Grade45MeetingFormComponent],
  templateUrl: './regular-meeting.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegularMeetingComponent {
  session = input.required<ProfessionalActivity>();
  back = output<void>();
  formSubmitted = output<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private activityService = inject(ProfessionalActivityService);

  selectGrade(grade: 'Khối 1' | 'Khối 2, 3' | 'Khối 4, 5'): void {
    this.activityService.setSessionGrade(grade);
  }

  goBack(): void {
    this.back.emit();
  }

  goBackToGradeSelection(): void {
     this.activityService.setSessionGrade(null);
  }

  onFormSubmitted(data: any): void {
    this.formSubmitted.emit(data);
  }

  onViewClicked(): void {
    this.viewClicked.emit();
  }

  onDownloadClicked(): void {
    this.downloadClicked.emit();
  }
}