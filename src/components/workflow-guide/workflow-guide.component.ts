import { Component, ChangeDetectionStrategy, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-workflow-guide',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './workflow-guide.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowGuideComponent {
  close = output<void>();

  onClose(): void {
    this.close.emit();
  }
}
