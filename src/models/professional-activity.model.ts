
export type ActivityType = 'lesson-study' | 'regular-meeting' | 'class-observation';
export type ObservationType = 
  | 'observation-evaluation-tt27' // Phiếu dự giờ đánh giá tiết dạy (Thông tư 27) - Built
  | 'evaluation-tt27'               // Phiếu đánh giá giờ dạy (Thông tư 27) - Built
  | 'evaluation-it'                 // Phiếu dự giờ tiết dạy có ứng dụng CNTT - Not built
  | 'evaluation-vnen';              // Phiếu đánh giá tiết dạy theo mô hình VNEN - Not built

export interface ProfessionalActivity {
  id: string;
  schoolYear: string;
  month: number; // 1-12
  activityType: ActivityType;
  title: string;
  creationDate: Date;
  status: 'In Progress' | 'Completed';
  currentStep: number; // For multi-step processes like lesson-study
  grade?: 'Khối 1' | 'Khối 2, 3' | 'Khối 4, 5' | null; // For regular-meetings
  observationType?: ObservationType | null; // For class-observation
  data: {
    // For lesson-study
    generalInfo?: any;
    step1?: any;
    step2?: any;
    step3?: any;
    // For regular meetings
    meetingData?: any;
    // For class-observation
    observationData?: any; 
    evaluationData?: any;
  }
}