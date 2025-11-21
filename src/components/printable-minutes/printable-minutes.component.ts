
import { Component, ChangeDetectionStrategy, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfessionalActivity } from '../../models/professional-activity.model';

@Component({
  selector: 'app-printable-minutes',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './printable-minutes.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PrintableMinutesComponent {
  session = input.required<ProfessionalActivity>();

  get currentDate(): Date {
    return new Date();
  }

  ratingCriteria = [
    { name: 'score1', content: 'Kế hoạch và tài liệu dạy học (tối đa 1,0 điểm/tiêu chí)', criteria: 'Chuỗi hoạt động phù hợp với mục tiêu, nội dung và phương pháp dạy học được sử dụng.' },
    { name: 'score2', content: '', criteria: 'Mỗi nhiệm vụ học tập thể hiện rõ mục tiêu, nội dung, kỹ thuật tổ chức và sản phẩm cần đạt được.' },
    { name: 'score3', content: '', criteria: 'Thiết bị dạy học và học liệu được sử dụng phù hợp với các hoạt động của HS.' },
    { name: 'score4', content: '', criteria: 'Phương án kiểm tra, đánh giá trong quá trình tổ chức hoạt động của học sinh hợp lý.' },
    { name: 'score5', content: 'Hoạt động của GV (tối đa 2,0 điểm/tiêu chí)', criteria: 'Phương pháp và hình thức chuyển giao nhiệm vụ học tập hấp dẫn. Nội dung đảm bảo chính xác, logic, khoa học, làm rõ được trọng tâm.' },
    { name: 'score6', content: '', criteria: 'Khả năng theo dõi, quan sát, phát hiện kịp thời những khó khăn của HS và có biện pháp hỗ trợ, khuyến khích HS hợp tác, giúp đỡ nhau khi thực hiện nhiệm vụ.' },
    { name: 'score7', content: '', criteria: 'Nội dung đảm bảo mức độ phân hóa, phù hợp với khả năng của HS. Lồng ghép, tích hợp, liên hệ thực tế có tính giáo dục.' },
    { name: 'score8', content: '', criteria: 'Kết quả hoạt động và thảo luận của HS được tổng hợp, phân tích đánh giá, sửa lỗi kịp thời; đảm bảo phân bổ thời gian hợp lí cho các hoạt động.' },
    { name: 'score9', content: 'Hoạt động của HS (tối đa 2,0 điểm/tiêu chí)', criteria: 'Khả năng tiếp nhận và sẵn sàng thực hiện nhiệm vụ học tập của HS.' },
    { name: 'score10', content: '', criteria: 'HS tích cực, chủ động, sáng tạo, hợp tác trong việc thực hiện các nhiệm vụ học tập.' },
    { name: 'score11', content: '', criteria: 'HS tham gia tích cực trong trình bày, trao đổi, thảo luận về kết quả thực hiện nhiệm vụ học tập.' },
    { name: 'score12', content: '', criteria: 'Kết quả thực hiện các nhiệm vụ học tập: đảm bảo kiến thức, phù hợp với từng hoạt động.' },
  ];
  
  lessonEvaluationCriteria = [
      { field: 'c1_1', max: 1.5, text: '1.1. Xác định được vị trí, mục tiêu, chuẩn kiến thức và kỹ năng, yêu cầu cần đạt, nội dung cơ bản trọng tâm của tiết dạy, hoạt động giáo dục.' },
      { field: 'c1_2', max: 1.5, text: '1.2. Đảm bảo chính xác, hệ thống, toàn diện (về kiến thức, kỹ năng; năng lực, phẩm chất)' },
      { field: 'c2_1', max: 0.5, text: '2.1. Tổ chức các hoạt động linh hoạt, hợp lý và hiệu quả.' },
      { field: 'c2_2', max: 1.5, text: '2.2. Vận dụng phương pháp và hình thức tổ chức tiết dạy, các hoạt động giáo dục theo hướng phát huy tính tích cực, chủ động, sáng tạo và phù hợp với các đối tượng học sinh.' },
      { field: 'c2_3', max: 0.5, text: '2.3. Nhận xét và đánh giá kết quả hoạt động của học sinh theo đúng Thông tư 27/2020.' },
      { field: 'c2_4', max: 0.5, text: '2.4. Khai thác nội dung dạy học, liên hệ, cập nhật những vấn đề xã hội, nhân văn gắn với thực tế địa phương nhằm phát triển năng lực, phẩm chất của học sinh.' },
      { field: 'c2_5', max: 1, text: '2.5. Sử dụng hợp lý, hiệu quả các phương tiện, thiết bị dạy học, tác phong sư phạm chuẩn mực, lời nói mạch lạc, truyền cảm.' },
      { field: 'c2_6', max: 1, text: '2.6. Xử lí tốt tình huống sư phạm, phân bổ thời gian hợp lý, kịp thời giúp đỡ học sinh có khó khăn trong hoạt động giáo dục, học sinh khuyết tật (nếu có).' },
      { field: 'c3_1', max: 1, text: '3.1. Chuẩn bị đầy đủ đồ dùng học tập và sử dụng hiệu quả; biết làm việc theo yêu cầu của giáo viên.' },
      { field: 'c3_2', max: 2, text: '3.2. Mạnh dạn, tự tin khi hợp tác với bạn và giao tiếp trước lớp.' },
      { field: 'c3_3', max: 1, text: '3.3. Biết đánh giá kết quả hoạt động của mình và của bạn.' },
      { field: 'c3_4', max: 2, text: '3.4. Biết lắng nghe, tìm kiếm sự trợ giúp của thầy cô, bạn bè để hoàn thành nhiệm vụ.' },
      { field: 'c3_5', max: 2, text: '3.5. Tích cực, chủ động làm việc cá nhân, nhóm hiệu quả.' },
      { field: 'c4_1', max: 2, text: '4.1. Học sinh nắm được kiến thức, kỹ năng cơ bản của bài học, năng lực, phẩm chất được hình thành và phát triển.' },
      { field: 'c4_2', max: 1, text: '4.2. Biết vận dụng những điều đã học để giải quyết các vấn đề tương tự trong thực tiễn cuộc sống.' },
      { field: 'c4_3', max: 1, text: '4.3. Các hoạt động giáo dục diễn ra tự nhiên, nhẹ nhàng và hiệu quả phù hợp với đặc điểm học sinh tiểu học.' },
  ];

  calculateTotalScore(minutes: any): number {
    if (!minutes) return 0;
    let total = 0;
    for (let i = 1; i <= 12; i++) {
        const score = minutes[`score${i}`];
        if (typeof score === 'number') {
            total += score;
        }
    }
    return total;
  }

  calculateLessonEvaluationTotal(minutes: any): number {
    if (!minutes) return 0;
    return this.lessonEvaluationCriteria.reduce((acc, curr) => {
        const score = minutes[curr.field];
        return acc + (typeof score === 'number' ? score : 0);
    }, 0);
}

  // Helper function to format date
  formatDate(dateString: string): string {
    if (!dateString) return '...';
    try {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, '0');
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const year = date.getFullYear();
      return `ngày ${day} tháng ${month} năm ${year}`;
    } catch (e) {
      return '...';
    }
  }

  // Helper function to extract time
  formatTime(timeString: string): string {
    if (!timeString) return '...';
    return timeString;
  }
}
