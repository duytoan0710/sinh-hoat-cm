
import { Component, ChangeDetectionStrategy, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrintableMinutesComponent } from '../printable-minutes/printable-minutes.component';
import { ProfessionalActivity } from '../../models/professional-activity.model';

@Component({
  selector: 'app-meeting-minutes-viewer',
  standalone: true,
  imports: [CommonModule, PrintableMinutesComponent],
  templateUrl: './meeting-minutes-viewer.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeetingMinutesViewerComponent {
  session = input.required<ProfessionalActivity>();
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
