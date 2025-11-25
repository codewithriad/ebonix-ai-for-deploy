import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface DashboardData {
  sales: string;
  orders: string;
  visitors: string;
  growth: string;
}

export const generateDashboardReport = (data: DashboardData) => {
  const doc = new jsPDF();
  const date = new Date().toLocaleDateString();

  // Title
  doc.setFontSize(20);
  doc.text('Dashboard Report', 14, 22);
  
  doc.setFontSize(11);
  doc.setTextColor(100);
  doc.text(`Generated on: ${date}`, 14, 30);

  // Summary Section
  doc.setFontSize(14);
  doc.setTextColor(0);
  doc.text('Key Performance Indicators', 14, 45);

  const summaryData = [
    ['Metric', 'Value'],
    ['Total Sales', data.sales],
    ['Total Orders', data.orders],
    ['Total Visitors', data.visitors],
    ['Growth Rate', data.growth],
  ];

  autoTable(doc, {
    startY: 50,
    head: [['Metric', 'Value']],
    body: summaryData.slice(1),
    theme: 'striped',
    headStyles: { fillColor: [124, 58, 237] }, // Violet color to match theme
  });

  // Footer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.setTextColor(150);
    doc.text(
      `Page ${i} of ${pageCount}`,
      doc.internal.pageSize.width / 2,
      doc.internal.pageSize.height - 10,
      { align: 'center' }
    );
  }

  // Save the PDF
  doc.save(`dashboard-report-${new Date().toISOString().split('T')[0]}.pdf`);
};
