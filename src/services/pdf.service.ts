import { Injectable } from '@angular/core';

// Declare the libraries for the TS compiler since they are loaded from CDN
declare const html2canvas: any;
declare const jspdf: { jsPDF: new (options?: any) => any };

@Injectable({
  providedIn: 'root'
})
export class PdfService {
  async downloadPdf(elementId: string, fileName: string): Promise<void> {
    const element = document.getElementById(elementId);
    if (!element) {
      console.error(`Element with ID '${elementId}' not found.`);
      return;
    }

    try {
      const canvas = await html2canvas(element, {
        scale: 2, // Improve resolution
        useCORS: true,
        logging: false,
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF({
        orientation: 'p',
        unit: 'mm',
        format: 'a4'
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
      
      let heightLeft = pdfHeight;
      let position = 0;
      const pageHeight = pdf.internal.pageSize.getHeight();
      
      // Add the first page
      pdf.addImage(imgData, 'PNG', 10, position + 10, pdfWidth - 20, pdfHeight);
      heightLeft -= pageHeight;
      
      // Add more pages if content overflows
      while (heightLeft >= -10) { // Give a small margin of error
        position = heightLeft - pdfHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 10, position - 10, pdfWidth - 20, pdfHeight);
        heightLeft -= pageHeight;
      }
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  }
}
