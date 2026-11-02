const fs = require('fs');
const path = require('path');
const {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
  AlignmentType,
  ShadingType,
} = require('docx');

async function createDocx() {
  const doc = new Document({
    styles: {
      default: {
        document: {
          run: {
            font: 'Calibri',
            size: 24, // 12pt
            color: '1E293B',
          },
        },
      },
    },
    sections: [
      {
        properties: {},
        children: [
          // Header / School
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'TRƯỜNG ĐẠI HỌC FPT - BỘ MÔN KỸ THUẬT PHẦN MỀM',
                bold: true,
                size: 22,
                color: '475569',
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'HỌC PHẦN: SWD392 – SOFTWARE ARCHITECTURE AND DESIGN',
                bold: true,
                size: 20,
                color: '64748B',
              }),
            ],
            spacing: { after: 300 },
          }),

          // Main Title
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'BÁO CÁO ĐẶC TẢ & KIỂM THỬ ĐỒ ÁN REACT (FER201)',
                bold: true,
                size: 36,
                color: '4338CA', // Indigo
              }),
            ],
          }),
          new Paragraph({
            alignment: AlignmentType.CENTER,
            children: [
              new TextRun({
                text: 'ỨNG DỤNG MOVIE WATCHLIST – DUAL-ENGINE ASSESSMENT IN AITA',
                bold: true,
                size: 26,
                color: '6D28D9',
              }),
            ],
            spacing: { after: 400 },
          }),

          // Metadata Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Dự án hệ thống', bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'AITA – AI-powered Teaching Assistant Platform' })],
                    width: { size: 70, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Nhóm thực hiện', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Group 2 – Lớp SE19C (Giảng viên: ThS. Nguyễn Văn Vinh)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tên ứng dụng mẫu', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'Movie Watchlist (Single Page Application)' })],
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Công nghệ áp dụng', bold: true })] })],
                  }),
                  new TableCell({
                    children: [new Paragraph({ text: 'React 19, Vite, Tailwind CSS, Lucide Icons, Context API' })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 300 } }),

          // Mục 1
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '1. TỔNG QUAN DỰ ÁN & THÔNG TIN TRIỂN KHAI',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
            spacing: { before: 200, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Dự án "Movie Watchlist" là ứng dụng web frontend độc lập được xây dựng nhằm phục vụ việc kiểm thử tự động hai tầng (Dual-Engine: Playwright Headless Browser + Semantic AI Grader) của hệ thống trợ giảng AITA dành riêng cho môn học FER201 (Front-End Web Development with React).',
              }),
            ],
            spacing: { after: 120 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Đường dẫn Repository GitHub: ', bold: true }),
              new TextRun({ text: 'https://github.com/your-username/movie-watchlist', color: '2563EB' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Đường dẫn Triển khai Vercel (Production): ', bold: true }),
              new TextRun({ text: 'https://movie-watchlist-fer201.vercel.app', color: '2563EB' }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '• Phương thức đóng gói & Build: ', bold: true }),
              new TextRun({ text: 'Vite v8 Bundler, tối ưu hóa kích thước file tĩnh (gzip ~85KB JS, ~4.6KB CSS).' }),
            ],
            spacing: { after: 200 },
          }),

          // Mục 2
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '2. CẤU TRÚC THƯ MỤC & KIẾN TRÚC MÃ NGUỒN',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
            spacing: { before: 200, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Mã nguồn tuân thủ nghiêm ngặt chuẩn kiến trúc Module hóa (Feature/Layered Separation) giúp các công cụ phân tích mã nguồn và Semantic AI dễ dàng thẩm định cấu trúc mà không bị quá tải Token:',
              }),
            ],
            spacing: { after: 120 },
          }),

          // Tree Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Thư mục / Tệp tin', bold: true })] })],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F1F5F9' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Mục đích & Trách nhiệm kiến trúc', bold: true })] })],
                    width: { size: 65, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/components/ui/' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Chứa các atomic primitives (Button, Badge, Card) dùng chung, đảm bảo tính tái sử dụng và đồng bộ thiết kế.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/components/MovieCard.jsx' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Thẻ hiển thị thông tin phim, poster, điểm số và nút tương tác Thêm/Xóa Watchlist.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/components/MovieList.jsx' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Quản lý bố cục dạng lưới (Responsive Grid), xử lý trạng thái Empty State khi không có kết quả.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/components/WatchlistIcon.jsx' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Thanh điều hướng nhanh với huy hiệu (Badge) đếm số lượng phim đã lưu theo thời gian thực.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/components/WatchlistDrawer.jsx' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Ngăn kéo trượt hiển thị danh sách phim đã lưu, cho phép xóa từng phim hoặc dọn sạch danh sách.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/context/WatchlistContext.jsx' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Quản lý trạng thái toàn cục bằng React Context API, đồng bộ tự động với Web LocalStorage.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/hooks/useMovieSearch.js' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Custom Hook đóng gói toàn bộ logic lọc theo thể loại, sắp xếp điểm số và debounce tìm kiếm.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: 'src/lib/utils.js' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Hàm tiện ích cn() gộp class Tailwind CSS an toàn qua clsx và tailwind-merge.' })] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Mục 3
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '3. GIẢI TRÌNH KỸ THUẬT CHUYÊN SÂU (TECHNICAL JUSTIFICATION)',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
            spacing: { before: 200, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({ text: '3.1. Quản lý trạng thái bằng React Context API (Tránh Prop Drilling):', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Trong ứng dụng thương mại điện tử hoặc quản lý danh sách xem, dữ liệu cần được chia sẻ giữa Header (nơi hiển thị Badge đếm số lượng phim) và Body (nơi chứa từng MovieCard). Nếu không có Context API, lập trình viên buộc phải truyền dữ liệu và hàm callback qua nhiều cấp trung gian (App -> Main -> MovieList -> MovieCard), gây rối loạn luồng dữ liệu (Prop Drilling).',
              }),
            ],
            spacing: { after: 100 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Giải pháp của dự án: Tạo WatchlistContext độc lập, cung cấp Provider bao bọc ở gốc ứng dụng. Các component con chỉ cần gọi custom hook useWatchlist() để truy cập trực tiếp state và action cần thiết.',
              }),
            ],
            spacing: { after: 150 },
          }),

          new Paragraph({
            children: [
              new TextRun({ text: '3.2. Áp dụng Single Responsibility Principle với Custom Hook:', bold: true }),
            ],
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Toàn bộ thuật toán lọc danh sách theo từ khóa, lọc theo thể loại (Genre) và thuật toán sắp xếp (Sort by Rating/Year) được tách 100% ra khỏi giao diện App.jsx và đưa vào hook useMovieSearch.js. Nhờ đó, component giao diện hoàn toàn "sạch sẽ" (Clean Component), chỉ tập trung vào việc render UI và bắt sự kiện người dùng.',
              }),
            ],
            spacing: { after: 200 },
          }),

          // Mục 4
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '4. KỊCH BẢN KIỂM THỬ TỰ ĐỘNG PLAYWRIGHT (ENGINE 2 - 7.0 ĐIỂM)',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
            spacing: { before: 200, after: 150 },
          }),
          new Paragraph({
            children: [
              new TextRun({
                text: 'Kịch bản kiểm thử sau được cấu hình trực tiếp vào Web Testcase Builder của AITA nhằm kiểm thử tự động trên Vercel URL thông qua container Playwright Chromium:',
              }),
            ],
            spacing: { after: 120 },
          }),

          // Playwright Steps Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Bước', bold: true })] })],
                    width: { size: 10, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Action / Thao tác', bold: true })] })],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Target Selector', bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F8FAFC' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Kỳ vọng (Assertion)', bold: true })] })],
                    width: { size: 35, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '1' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'GOTO URL' })] }),
                  new TableCell({ children: [new Paragraph({ text: '/' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Trang chủ render thành công, lưới phim hiển thị đủ 6 phim.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '2' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'FILL INPUT' })] }),
                  new TableCell({ children: [new Paragraph({ text: '[data-testid="search-input"]' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Nhập từ khóa "Inception", danh sách chỉ còn đúng 1 phim duy nhất.' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '3' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'CLICK BUTTON' })] }),
                  new TableCell({ children: [new Paragraph({ text: '[data-testid="movie-action-1"]' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Nút chuyển sang trạng thái "Đã trong Watchlist".' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '4' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'ASSERT TEXT' })] }),
                  new TableCell({ children: [new Paragraph({ text: '[data-testid="watchlist-count"]' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Huy hiệu trên icon góc phải nhảy số hiển thị "1".' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '5' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'CLICK & VERIFY' })] }),
                  new TableCell({ children: [new Paragraph({ text: '[data-testid="watchlist-toggle-btn"]' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Ngăn kéo trượt mở ra, xuất hiện thẻ phim Inception trong danh sách.' })] }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 200 } }),

          // Mục 5
          new Paragraph({
            heading: HeadingLevel.HEADING_1,
            children: [
              new TextRun({
                text: '5. BẢNG TỰ ĐÁNH GIÁ ĐIỂM SỐ THEO RUBRIC AITA',
                bold: true,
                size: 28,
                color: '1E3A8A',
              }),
            ],
            spacing: { before: 200, after: 150 },
          }),

          // Score Rubric Table
          new Table({
            width: { size: 100, type: WidthType.PERCENTAGE },
            rows: [
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Tiêu chí đánh giá', bold: true })] })],
                    width: { size: 45, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Công cụ chấm điểm', bold: true })] })],
                    width: { size: 30, type: WidthType.PERCENTAGE },
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'EEF2FF' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Điểm tối đa', bold: true })] })],
                    width: { size: 25, type: WidthType.PERCENTAGE },
                  }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '1. Kiểm thử chức năng tương tác giao diện' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Playwright Sandbox' })] }),
                  new TableCell({ children: [new Paragraph({ text: '7.0 / 7.0 điểm' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '2. Cấu trúc Component & State Context API' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Semantic AI LLM' })] }),
                  new TableCell({ children: [new Paragraph({ text: '2.0 / 2.0 điểm' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({ children: [new Paragraph({ text: '3. Tiêu chuẩn Clean Code & Custom Hooks' })] }),
                  new TableCell({ children: [new Paragraph({ text: 'Semantic AI LLM' })] }),
                  new TableCell({ children: [new Paragraph({ text: '1.0 / 1.0 điểm' })] }),
                ],
              }),
              new TableRow({
                children: [
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F0FDF4' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'TỔNG ĐIỂM HOÀN TẤT', bold: true, color: '166534' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F0FDF4' },
                    children: [new Paragraph({ children: [new TextRun({ text: 'Dual-Engine', bold: true, color: '166534' })] })],
                  }),
                  new TableCell({
                    shading: { type: ShadingType.CLEAR, fill: 'F0FDF4' },
                    children: [new Paragraph({ children: [new TextRun({ text: '10.0 / 10.0 điểm', bold: true, color: '166534' })] })],
                  }),
                ],
              }),
            ],
          }),

          new Paragraph({ text: '', spacing: { after: 300 } }),
          new Paragraph({
            alignment: AlignmentType.RIGHT,
            children: [
              new TextRun({
                text: 'Hà Nội, Ngày 02 tháng 11 năm 2026\nSinh viên thực hiện ký tên',
                italics: true,
                color: '64748B',
              }),
            ],
          }),
        ],
      },
    ],
  });

  const buffer = await Packer.toBuffer(doc);
  const outputPath = 'D:/SWD392/React_Project/REACT.docx';
  fs.writeFileSync(outputPath, buffer);
  console.log('Tạo file thành công tại:', outputPath);
}

createDocx().catch(console.error);
