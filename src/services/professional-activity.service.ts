
import { Injectable, signal, computed, inject } from '@angular/core';
import { ProfessionalActivity, ActivityType, ObservationType } from '../models/professional-activity.model';
import { MasterDataService } from './master-data.service';

const SIGNATURE_PLACEHOLDER = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxNTAiIGhlaWdodD0iNTAiIHZpZXdCb3g9IjAgMCAxNTAgNTAiPjxwYXRoIGQ9Ik0xMCA0MCBRIDQwIDEwLCA3NSAzMCBUIDE0MCAyMCIgc3Ryb2tlPSJibGFjayIgZmlsbD0idHJhbnNwYXJlbnQiIHN0cm9rZS13aWR0aD0iMiIvPjwvc3ZnPg==';

const MOCK_SESSIONS: ProfessionalActivity[] = [
  // ===== MONTH 8 =====
  {
    id: 'mock-month8-1',
    schoolYear: '2024-2025',
    month: 8,
    activityType: 'regular-meeting',
    title: 'Họp tổ chuyên môn đầu năm - K1',
    creationDate: new Date('2024-08-25T14:30:00Z'),
    status: 'Completed',
    currentStep: 1,
    grade: 'Khối 1',
    data: { 
      generalInfo: { department: 'Tổ 1' },
      meetingData: {
        meetingTime: '14:30', meetingDate: '2024-08-25', location: 'Phòng họp tổ 1', chairperson: 'Nguyễn Văn A', secretary: 'Lê Thị B', director: 'Bùi Thị H', members: ['Trần Văn C', 'Phạm Thị D'], absentWithPermission: 0, absentWithoutPermission: 0, evaluationGood: 'Triển khai tốt các công tác chuẩn bị cho năm học mới.', evaluationBad: 'Chưa có.', planAction: 'Ổn định nề nếp đầu năm, sinh hoạt chủ điểm "Chào năm học mới".', planProfessional: 'Thống nhất kế hoạch giảng dạy học kỳ I.', discussionContent: 'Các thành viên thống nhất cao với kế hoạch.', discussionAgreement: 'Nhất trí 100%.', discussionChanges: 'Không có.', conclusionAgreed: 'Thống nhất triển khai kế hoạch năm học của tổ.', conclusionDisagreed: 'Không có.', boardSuggestions: 'Không có.', headSignature: SIGNATURE_PLACEHOLDER, directorSignature: SIGNATURE_PLACEHOLDER, secretarySignature: SIGNATURE_PLACEHOLDER
      }
    }
  },
  // ===== MONTH 9 =====
  {
    id: 'mock-1',
    schoolYear: '2024-2025',
    month: 9,
    activityType: 'lesson-study',
    title: 'SHCM Tháng 9 - Bài: Phép cộng trong phạm vi 10',
    creationDate: new Date('2024-09-05T09:00:00Z'),
    status: 'Completed',
    currentStep: 5, 
    data: {
      generalInfo: { title: 'SHCM Tháng 9 - Bài: Phép cộng trong phạm vi 10', school: 'Tiểu học Ánh Sao', department: 'Tổ 1'},
      step1: { meetingDate: '2024-09-05', meetingTime: '09:00', location: 'Phòng họp tổ chuyên môn', attendees: ['Nguyễn Văn A', 'Lê Thị B', 'Trần Văn C'], absent: ['Phạm Thị D'], chairperson: 'Nguyễn Văn A', position: 'Tổ trưởng', proposedLesson: 'Phép cộng trong phạm vi 10', reasonForChoice: 'Đây là bài học quan trọng, nền tảng cho các kiến thức toán học sau này của học sinh.', assignedTeacher: 'Lê Thị B', proposedTeachingDate: '2024-09-12T08:00', discussionNotes: 'Thống nhất về phương pháp giảng dạy lấy học sinh làm trung tâm, sử dụng đồ dùng trực quan.', secretarySignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER },
      step2: { lessonTitle: 'Phép cộng trong phạm vi 10', teacher: 'Lê Thị B', objectiveKnowledge: 'Học sinh thực hiện được phép cộng trong phạm vi 10.', objectiveSkills: 'Rèn kỹ năng tính toán nhanh, chính xác.', objectiveAttitude: 'Yêu thích môn toán, tích cực tham gia xây dựng bài.', objectiveCompetency: 'Phát triển năng lực tư duy, giải quyết vấn đề.', discussionNotes: 'Các thành viên đóng góp ý kiến hoàn thiện giáo án, thống nhất các hoạt động dạy học chính.', secretarySignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER },
      step3: { headComments: 'Giờ dạy tốt, giáo viên chuẩn bị bài chu đáo, học sinh sôi nổi, tích cực. Cần phát huy hơn nữa ở các tiết học sau.', teacherDiscussion: 'Các giáo viên khác đồng tình với nhận xét của tổ trưởng. Một vài ý kiến nhỏ về việc phân bổ thời gian cho các hoạt động.', summaryAdvantages: 'Giáo viên tự tin, làm chủ tiết dạy. Học sinh hiểu bài và hoàn thành tốt các bài tập.', summaryDisadvantages: 'Một số học sinh ở cuối lớp còn hơi rụt rè.', applicationDiscussion: 'Áp dụng phương pháp này cho các bài dạy có nội dung tương tự để nâng cao hiệu quả giảng dạy.', secretarySignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER }
    }
  },
   // ===== MONTH 10 =====
  {
    id: 'mock-2',
    schoolYear: '2024-2025',
    month: 10,
    activityType: 'lesson-study',
    title: 'SHCM Tháng 10 - Bài: Cây xanh và môi trường',
    creationDate: new Date('2024-10-02T14:30:00Z'),
    status: 'In Progress',
    currentStep: 2,
    data: {
       generalInfo: { title: 'SHCM Tháng 10 - Bài: Cây xanh và môi trường', school: 'Tiểu học Ánh Sao', department: 'Tổ 2'},
       step1: { meetingDate: '2024-10-02', meetingTime: '14:30', location: 'Thư viện', attendees: ['Trần Văn C', 'Phạm Thị D', 'Hoàng Văn E', 'Vũ Thị F'], absent: ['Đặng Văn G'], chairperson: 'Trần Văn C', position: 'Tổ trưởng', proposedLesson: 'Bài: Cây xanh và môi trường - Môn Tự nhiên và Xã hội lớp 2', reasonForChoice: 'Nội dung bài học gần gũi, thiết thực, giúp học sinh dễ dàng liên hệ với thực tế. Đồng thời, đây là chủ đề tốt để lồng ghép giáo dục ý thức bảo vệ môi trường, một trong những mục tiêu quan trọng của chương trình giáo dục phổ thông mới.', assignedTeacher: 'Phạm Thị D', proposedTeachingDate: '2024-10-10T09:30', discussionNotes: 'Thống nhất tổ chức hoạt động khởi động bằng một bài hát về chủ đề cây xanh.', secretarySignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER },
       step2: { lessonTitle: 'Cây xanh và môi trường', teacher: 'Phạm Thị D', objectiveKnowledge: 'Học sinh nhận biết và kể được tên một số loại cây xanh quen thuộc.', objectiveSkills: 'Rèn luyện kỹ năng quan sát, mô tả, so sánh và làm việc nhóm.', objectiveAttitude: 'Có ý thức chăm sóc, bảo vệ cây xanh.', objectiveCompetency: 'Phát triển năng lực tìm hiểu tự nhiên và xã hội.', discussionNotes: 'Giáo án đã chuẩn bị chi tiết, các hoạt động phân bổ thời gian hợp lý.', secretarySignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER }
    }
  },
  {
    id: 'mock-4',
    schoolYear: '2024-2025',
    month: 10,
    activityType: 'class-observation',
    title: 'Dự giờ GV - Môn Toán lớp 3A',
    creationDate: new Date('2024-10-20T08:30:00Z'),
    status: 'Completed',
    currentStep: 1,
    observationType: 'observation-evaluation-tt27',
    data: { 
      generalInfo: { department: 'Tổ 2' },
      observationData: { teacher: 'Trần Văn C', subject: 'Toán', class: '3A', period: '2', ppct: '25', date: '2024-10-20', session: 'Sáng', lesson: 'Nhân số có hai chữ số với số có một chữ số', observerName: 'Hoàng Văn E', observerPosition: 'Tổ phó chuyên môn', observerDepartment: 'Tổ 2', teachingProcess: [{ teacherActivity: 'GV tổ chức trò chơi khởi động "Ai nhanh hơn"', studentActivity: 'HS tham gia sôi nổi, không khí lớp học vui vẻ.', observerNotes: 'Hoạt động khởi động hiệu quả, thu hút học sinh.' }], score1: 1, score2: 1, score3: 1, score4: 0.75, score5: 2, score6: 1.75, score7: 1.5, score8: 2, score9: 2, score10: 1.75, score11: 2, score12: 1.5, finalRating: 'Khá', advantages: 'Giáo viên chuẩn bị bài giảng chu đáo, sử dụng CNTT hiệu quả. Học sinh tích cực xây dựng bài.', disadvantages: 'Phân bổ thời gian chưa thực sự hợp lý.', teacherSignature: SIGNATURE_PLACEHOLDER, headSignature: SIGNATURE_PLACEHOLDER, observerSignature: SIGNATURE_PLACEHOLDER, }
    }
  },
  {
    id: 'mock-6',
    schoolYear: '2024-2025',
    month: 10,
    activityType: 'regular-meeting',
    title: 'Họp tổ chuyên môn định kỳ tháng 10 - K4,5',
    creationDate: new Date('2024-10-16T10:00:00Z'),
    status: 'Completed',
    currentStep: 1,
    grade: 'Khối 4, 5',
    data: {
      generalInfo: { department: 'Tổ 3' },
      meetingData: { meetingTime: '10:20', meetingDate: '2024-10-16', location: 'Trường Tiểu học Ánh Sao', bghRepresentative: 'Bùi Thị H', chairperson: 'Hoàng Văn E', secretary: 'Vũ Thị F', totalMembers: 5, presentMembers: 5, absentMembers: 0, reportPolitical: 'Đa số giáo viên trong khối có tư tưởng chính trị ổn định vững vàng.', reportProfessional: 'Các lớp thực hiện công tác vận động học sinh ra lớp đạt yêu cầu.', planPolitical: 'Đề nghị tất cả giáo viên trong tổ có tư tưởng ổn định, vững vàng, đoàn kết giúp đỡ nhau.', planDocuments: 'Triển khai các văn bản mới nhất từ Phòng Giáo dục.', planHoChiMinh: 'Tiếp tục học tập: Nêu gương trước học sinh.', planPublicRelations: 'Thực hiện tốt công tác dân vận.', planProfessional: 'Tập trung vào bồi dưỡng học sinh giỏi.', contributions: 'Không có.', leaderComments: 'BGH ghi nhận sự nỗ lực của tổ.', conclusion: 'Tổ thống nhất với phương hướng hoạt động.', headSignature: SIGNATURE_PLACEHOLDER, secretarySignature: SIGNATURE_PLACEHOLDER }
    }
  },
  // ===== MONTH 11 =====
  {
    id: 'mock-7',
    schoolYear: '2024-2025',
    month: 11,
    activityType: 'regular-meeting',
    title: 'Họp tổ chuyên môn định kỳ tháng 11 - K2,3',
    creationDate: new Date('2024-11-15T10:00:00Z'),
    status: 'Completed',
    currentStep: 1,
    grade: 'Khối 2, 3',
    data: {
      generalInfo: { department: 'Tổ 2' },
      meetingData: { meetingTime: '10:00', meetingDate: '2024-11-15', locationRoom: 'Phòng học lớp 2A', presentCount: 6, absentCount: 0, chairperson: 'Trần Văn C', secretary: 'Phạm Thị D', topicLead: 'Phạm Thị D', topicTitle: 'Quy trình dạy học tiết Tập đọc lớp 3', activity1_Opening: 'Lớp trưởng điều hành hoạt động một trò chơi khởi động.', activity2_NewKnowledge: 'Giáo viên giới thiệu bài, ghi mục bài lên bảng, nêu mục tiêu tiết học.', activity3_Practice: 'Tổ chức cho học sinh tìm hiểu bài theo nhóm, trả lời câu hỏi.', activity4_Application: 'Liên hệ thực tế đối với bản thân.', discussionContent: 'Hoàn toàn thống nhất các bước và hình thức lên lớp tiết tập đọc.', consensus: 'Thống nhất quy trình dạy: 1. HD khởi động. 2. HD hình thành kiến thức. 3. HD thực hành, luyện tập. 4. HD vận dụng-sáng tạo.', evaluation: 'Tổ đã thực hiện tốt các hoạt động trong tháng.', classification: 'Tổ xếp loại Tốt.', conclusionTime: '11:30', chairpersonSignature: SIGNATURE_PLACEHOLDER, secretarySignature: SIGNATURE_PLACEHOLDER }
    }
  },
   {
    id: 'mock-8',
    schoolYear: '2024-2025',
    month: 11,
    activityType: 'class-observation',
    title: 'Đánh giá SV - Môn Tiếng Việt lớp 1B',
    creationDate: new Date('2024-11-22T09:00:00Z'),
    status: 'Completed',
    currentStep: 1,
    observationType: 'evaluation-tt27',
    data: {
      generalInfo: { department: 'Tổ 1' },
      evaluationData: { studentName: 'Trần Thị Thảo (SV Sư phạm)', subject: 'Tiếng Việt', date: '2024-11-22', session: 'Sáng', period: '1', class: '1B', lesson: 'Bài: vần OA, OE', attendingTeacher: 'Lê Thị B', c1_1: 1.5, c1_2: 1.5, c2_1: 0.5, c2_2: 1.5, c2_3: 0.5, c2_4: 0.5, c2_5: 1, c2_6: 1, c3_1: 1, c3_2: 2, c3_3: 1, c3_4: 1.5, c3_5: 2, c4_1: 2, c4_2: 1, c4_3: 1, mainActivities: 'Hoạt động 1: Nhận biết vần. Hoạt động 2: Đọc tiếng, từ.', notes: 'Học sinh rất hứng thú với các thẻ từ có hình ảnh minh họa.', generalComments: 'Sinh viên có tác phong sư phạm tốt, chuẩn bị bài chu đáo.', evaluatorSignature: SIGNATURE_PLACEHOLDER }
    }
  },
   // ===== MONTH 12 =====
   {
    id: 'mock-month12-1',
    schoolYear: '2024-2025',
    month: 12,
    activityType: 'lesson-study',
    title: 'SHCM Tháng 12 - Sơ kết Học kỳ I',
    creationDate: new Date('2024-12-20T09:00:00Z'),
    status: 'In Progress',
    currentStep: 1,
    data: {
      generalInfo: { title: 'SHCM Tháng 12 - Sơ kết Học kỳ I', school: 'Tiểu học Ánh Sao', department: 'Tổ 2'}
    }
  },
];

@Injectable({ providedIn: 'root' })
export class ProfessionalActivityService {
  private masterDataService = inject(MasterDataService);
  private sessionsState = signal<ProfessionalActivity[]>(MOCK_SESSIONS);
  private activeSessionId = signal<string | null>(null);

  // Helper to determine the current school year
  private getCurrentSchoolYear(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth(); // 0-11
    // School year runs from August to July
    return month >= 7 ? `${year}-${year + 1}` : `${year - 1}-${year}`;
  }

  private selectedSchoolYearState = signal<string>(this.getCurrentSchoolYear());
  private selectedDepartmentState = signal<string>('all');

  // Public signals
  sessions = this.sessionsState.asReadonly();
  selectedSchoolYear = this.selectedSchoolYearState.asReadonly();
  selectedDepartment = this.selectedDepartmentState.asReadonly();

  availableSchoolYears = computed(() => {
    const years = this.sessionsState().map(s => s.schoolYear);
    const uniqueYears = [...new Set(years)];
    if (!uniqueYears.includes(this.getCurrentSchoolYear())) {
      uniqueYears.push(this.getCurrentSchoolYear());
    }
    return uniqueYears.sort().reverse();
  });
  
  activeSession = computed(() => {
    const id = this.activeSessionId();
    if (!id) return null;
    return this.sessionsState().find(s => s.id === id) ?? null;
  });

  sessionsByMonth = computed(() => {
    const year = this.selectedSchoolYearState();
    const department = this.selectedDepartmentState();

    const filtered = this.sessionsState().filter(s => {
      const yearMatch = s.schoolYear === year;
      const deptData = s.data.generalInfo?.department;
      const departmentMatch = department === 'all' || deptData === department;
      return yearMatch && departmentMatch;
    });

    const grouped = filtered.reduce((acc, session) => {
      const { month, activityType } = session;
      if (!acc[month]) {
        acc[month] = {};
      }
      if (!acc[month][activityType]) {
        acc[month][activityType] = [];
      }
      acc[month][activityType].push(session);
      return acc;
    }, {} as Record<number, Record<string, ProfessionalActivity[]>>);

    return grouped;
  });
  
  setSchoolYear(year: string): void {
    this.selectedSchoolYearState.set(year);
  }

  setDepartment(department: string): void {
    this.selectedDepartmentState.set(department);
  }
  
  startNewActivity(month: number, activityType: ActivityType): void {
     const activityTitles: Record<ActivityType, string> = {
      'lesson-study': 'Sinh hoạt chuyên môn theo Nghiên cứu bài học mới',
      'regular-meeting': 'Sinh hoạt tổ chuyên môn định kỳ mới',
      'class-observation': 'Dự giờ mới'
    };
    
    const currentUserInfo = this.masterDataService.getCurrentUserInfo();
    const selectedDept = this.selectedDepartmentState();
    
    const newSession: ProfessionalActivity = {
      id: self.crypto.randomUUID(),
      schoolYear: this.selectedSchoolYearState(),
      month: month,
      activityType: activityType,
      title: activityTitles[activityType],
      creationDate: new Date(),
      status: 'In Progress',
      currentStep: activityType === 'lesson-study' ? 1 : 0, // 0 for grade/type selection
      grade: null,
      observationType: null,
      data: {
        generalInfo: {
          school: currentUserInfo.school,
          department: selectedDept === 'all' ? currentUserInfo.department : selectedDept,
          title: activityTitles[activityType]
        }
      }
    };
    this.sessionsState.update(sessions => [newSession, ...sessions]);
    this.activeSessionId.set(newSession.id);
  }

  selectSession(id: string): void {
    this.activeSessionId.set(id);
  }

  unselectSession(): void {
    this.activeSessionId.set(null);
  }
  
  setSessionGrade(grade: 'Khối 1' | 'Khối 2, 3' | 'Khối 4, 5' | null): void {
     this.sessionsState.update(sessions =>
      sessions.map(s =>
        s.id === this.activeSessionId() ? { ...s, grade: grade } : s
      )
    );
  }
  
  setSessionObservationType(type: ObservationType | null): void {
     this.sessionsState.update(sessions =>
      sessions.map(s =>
        s.id === this.activeSessionId() ? { ...s, observationType: type } : s
      )
    );
  }

  saveGeneralInfoData(data: any): void {
    this.sessionsState.update(sessions =>
      sessions.map(s => {
        if (s.id === this.activeSessionId()) {
          const updatedSession = { ...s, data: { ...s.data, generalInfo: data } };
          if (data.title) {
            updatedSession.title = data.title;
          }
          return updatedSession;
        }
        return s;
      })
    );
  }

  saveStepData(step: 1 | 2 | 3, data: any): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => {
        if (s.id === this.activeSessionId()) {
          return { ...s, data: { ...s.data, [`step${step}`]: data } };
        }
        return s;
      })
    );
  }

  saveRegularMeetingData(data: any): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => {
        if (s.id === this.activeSessionId()) {
          return { ...s, data: { ...s.data, meetingData: data } };
        }
        return s;
      })
    );
  }
  
  saveObservationData(data: any): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => {
        if (s.id === this.activeSessionId()) {
          return { ...s, data: { ...s.data, observationData: data } };
        }
        return s;
      })
    );
  }

  saveLessonEvaluationData(data: any): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => {
        if (s.id === this.activeSessionId()) {
          return { ...s, data: { ...s.data, evaluationData: data } };
        }
        return s;
      })
    );
  }
  
  updateStep(newStep: number): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => 
        s.id === this.activeSessionId() ? { ...s, currentStep: newStep } : s
      )
    );
  }

  completeSession(): void {
    this.sessionsState.update(sessions => 
      sessions.map(s => 
        s.id === this.activeSessionId() ? { ...s, status: 'Completed', currentStep: 5 } : s
      )
    );
  }
}
