

import { ChangeDetectionStrategy, Component, output, input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalActivity, ObservationType } from '../../models/professional-activity.model';
import { ProfessionalActivityService } from '../../services/professional-activity.service';
import { EvaluationFormComponent } from '../evaluation-form/evaluation-form.component';
import { LessonEvaluationFormComponent } from '../lesson-evaluation-form/lesson-evaluation-form.component';

@Component({
  selector: 'app-class-observation',
  standalone: true,
  imports: [CommonModule, EvaluationFormComponent, LessonEvaluationFormComponent],
  templateUrl: './class-observation.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassObservationComponent {
  session = input.required<ProfessionalActivity>();
  back = output<void>();
  formSubmitted = output<any>();
  viewClicked = output<void>();
  downloadClicked = output<void>();

  private activityService = inject(ProfessionalActivityService);

  selectObservationType(type: ObservationType): void {
    this.activityService.setSessionObservationType(type);
  }

  goBack(): void {
    this.back.emit();
  }

  goBackToTypeSelection(): void {
    this.activityService.setSessionObservationType(null);
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