


import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GeneralInfoFormComponent } from './components/general-info-form/general-info-form.component';
import { MeetingForm1Component } from './components/meeting-form-1/meeting-form-1.component';
import { MeetingForm2Component } from './components/meeting-form-2/meeting-form-2.component';
import { MeetingForm3Component } from './components/meeting-form-3/meeting-form-3.component';
import { MeetingMinutesViewerComponent } from './components/meeting-minutes-viewer/meeting-minutes-viewer.component';
import { PrintableMinutesComponent } from './components/printable-minutes/printable-minutes.component';
import { ProfessionalActivityService } from './services/professional-activity.service';
import { PdfService } from './services/pdf.service';
import { ActivityType, ProfessionalActivity } from './models/professional-activity.model';
import { MasterDataService } from './services/master-data.service';
import { RegularMeetingComponent } from './components/regular-meeting/regular-meeting.component';
import { Grade1MeetingFormComponent } from './components/grade1-meeting-form/grade1-meeting-form.component';
import { Grade23MeetingFormComponent } from './components/grade23-meeting-form/grade23-meeting-form.component';
import { Grade45MeetingFormComponent } from './components/grade45-meeting-form/grade45-meeting-form.component';
import { ClassObservationComponent } from './components/class-observation/class-observation.component';
import { EvaluationFormComponent } from './components/evaluation-form/evaluation-form.component';
import { LessonEvaluationFormComponent } from './components/lesson-evaluation-form/lesson-evaluation-form.component';
import { WorkflowGuideComponent } from './components/workflow-guide/workflow-guide.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    GeneralInfoFormComponent,
    MeetingForm1Component,
    MeetingForm2Component,
    MeetingForm3Component,
    MeetingMinutesViewerComponent,
    PrintableMinutesComponent,
    RegularMeetingComponent,
    Grade1MeetingFormComponent,
    Grade23MeetingFormComponent,
    Grade45MeetingFormComponent,
    ClassObservationComponent,
    EvaluationFormComponent,
    LessonEvaluationFormComponent,
    WorkflowGuideComponent
  ]
})
export class AppComponent {
  private activityService = inject(ProfessionalActivityService);
  private pdfService = inject(PdfService);
  private masterDataService = inject(MasterDataService);

  activeSession = this.activityService.activeSession;
  sessionsByMonth = this.activityService.sessionsByMonth;
  availableSchoolYears = this.activityService.availableSchoolYears;
  selectedSchoolYear = this.activityService.selectedSchoolYear;
  availableDepartments = this.masterDataService.getDepartments();
  selectedDepartment = this.activityService.selectedDepartment;


  showSaveConfirmation = signal(false);
  isViewerOpen = signal(false);
  viewerData = signal<ProfessionalActivity | null>(null);
  isWorkflowGuideOpen = signal(false);

  // For PDF generation, we render the component offscreen
  pdfRenderData = signal<ProfessionalActivity | null>(null);

  months = [8, 9, 10, 11, 12, 1, 2, 3, 4, 5];
  
  tabs = [
    { number: 1, title: 'Thông tin chung' },
    { number: 2, title: 'Buổi họp 1: Sinh hoạt triển khai kế hoạch' },
    { number: 3, title: 'Buổi họp 2: Sinh hoạt chuẩn bị bài giảng' },
    { number: 4, title: 'Buổi họp 3: Sinh hoạt tổng kết, rút kinh nghiệm' }
  ];

  expandedMonths = signal<Record<number, boolean>>({});

  openWorkflowGuide(): void {
    this.isWorkflowGuideOpen.set(true);
  }

  closeWorkflowGuide(): void {
    this.isWorkflowGuideOpen.set(false);
  }

  toggleMonth(month: number): void {
    this.expandedMonths.update(current => {
      const newState = { ...current };
      newState[month] = !newState[month];
      return newState;
    });
  }

  startNewActivity(month: number, type: ActivityType): void {
    this.activityService.startNewActivity(month, type);
  }

  selectSession(id: string): void {
    this.activityService.selectSession(id);
  }

  goToDashboard(): void {
    this.activityService.unselectSession();
  }

  changeSchoolYear(event: Event): void {
    const selectedYear = (event.target as HTMLSelectElement).value;
    this.activityService.setSchoolYear(selectedYear);
  }
  
  changeDepartment(event: Event): void {
    const selectedDept = (event.target as HTMLSelectElement).value;
    this.activityService.setDepartment(selectedDept);
  }

  navigateToTab(tabNumber: number): void {
    this.activityService.updateStep(tabNumber);
  }

  private showConfirmation(): void {
    this.showSaveConfirmation.set(true);
    setTimeout(() => this.showSaveConfirmation.set(false), 3000);
  }

  saveGeneralInfo(data: any): void {
    this.activityService.saveGeneralInfoData(data);
    this.showConfirmation();
  }

  saveStep1(data: any): void {
    this.activityService.saveStepData(1, data);
    this.showConfirmation();
  }

  saveStep2(data: any): void {
    this.activityService.saveStepData(2, data);
    this.showConfirmation();
  }

  saveStep3(data: any): void {
    this.activityService.saveStepData(3, data);
    this.showConfirmation();
  }

  saveRegularMeeting(data: any): void {
    this.activityService.saveRegularMeetingData(data);
    this.showConfirmation();
  }
  
  saveClassObservationData(data: any): void {
    const session = this.activeSession();
    if (!session) return;

    if (session.observationType === 'observation-evaluation-tt27') {
      this.activityService.saveObservationData(data);
    } else if (session.observationType === 'evaluation-tt27') {
      this.activityService.saveLessonEvaluationData(data);
    }
    this.showConfirmation();
  }


  finishProcess(): void {
    this.activityService.completeSession();
    alert('Hoàn tất quy trình sinh hoạt chuyên môn!');
    this.goToDashboard();
  }

  openViewer(session: ProfessionalActivity, step?: number): void {
    let hasData = false;
    switch(session.activityType) {
      case 'lesson-study':
        hasData = !!session.data[`step${(step ?? session.currentStep) - 1}`];
        break;
      case 'regular-meeting':
        hasData = !!session.data.meetingData;
        break;
      case 'class-observation':
        if (session.observationType === 'observation-evaluation-tt27') {
          hasData = !!session.data.observationData;
        } else if (session.observationType === 'evaluation-tt27') {
          hasData = !!session.data.evaluationData;
        }
        break;
    }

    if (!hasData) {
      alert('Chưa có dữ liệu cho biên bản này.');
      return;
    }
    this.viewerData.set({ ...session, currentStep: step ?? session.currentStep });
    this.isViewerOpen.set(true);
  }

  closeViewer(): void {
    this.isViewerOpen.set(false);
    this.viewerData.set(null);
  }

  downloadPdf(session: ProfessionalActivity, step?: number): void {
     let hasData = false;
     let fileNameSuffix = '';

      switch(session.activityType) {
        case 'lesson-study':
          const stepKey = `step${(step ?? session.currentStep) - 1}`;
          hasData = !!session.data[stepKey];
          fileNameSuffix = `_Buoi${(step ?? session.currentStep) - 1}`;
          break;
        case 'regular-meeting':
          hasData = !!session.data.meetingData;
          fileNameSuffix = `_${session.grade?.replace(/\s/g, '')}`;
          break;
        case 'class-observation':
           if (session.observationType === 'observation-evaluation-tt27') {
            hasData = !!session.data.observationData;
            fileNameSuffix = '_PhieuDuGio_TT27';
          } else if (session.observationType === 'evaluation-tt27') {
            hasData = !!session.data.evaluationData;
            fileNameSuffix = '_PhieuDanhGia_TT27';
          }
          break;
      }

    if (!hasData) {
      alert('Chưa có dữ liệu để tải về.');
      return;
    }
    
    this.pdfRenderData.set({ ...session, currentStep: step ?? session.currentStep });

    // Allow Angular to render the hidden component
    setTimeout(() => {
      const fileName = `BienBan${fileNameSuffix}_${session.title.replace(/\s/g, '_')}.pdf`;
      this.pdfService.downloadPdf('pdf-source-container', fileName)
        .then(() => {
          this.pdfRenderData.set(null); // Clean up
        })
        .catch(err => {
          console.error(err);
          this.pdfRenderData.set(null);
        });
    }, 100);
  }
}