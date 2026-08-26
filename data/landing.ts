import {
  Building2,
  ClipboardCheck,
  DraftingCompass,
  FileCheck2,
  Home,
  MessageCircle,
  Phone,
  Ruler,
  ShieldCheck,
  Sparkles,
  TreePine,
  Wrench
} from "lucide-react";

export const site = {
  name: "Tiến Dương",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.thietkekientruc.site",
  phone: "0922.823.555",
  zalo: "https://zalo.me/0922823555",
  description:
    "Tư vấn thiết kế kiến trúc nhà phố, nhà mái Nhật, biệt thự và nhà vườn trên toàn quốc."
};

export const deliverables = [
  { title: "Hồ sơ kiến trúc", icon: DraftingCompass },
  { title: "Hồ sơ kết cấu", icon: Building2 },
  { title: "Hồ sơ điện nước", icon: Wrench },
  { title: "Phối cảnh 3D", icon: Sparkles },
  { title: "Hồ sơ thi công", icon: FileCheck2 },
  { title: "Hỗ trợ kỹ thuật", icon: ShieldCheck }
];

export const portfolio = [
  {
    title: "Nhà nông thôn hiện đại 01",
    category: "Nhà nông thôn",
    image: "/portfolio/nha-mai-nhat.webp",
    icon: Home,
    specs: ["Đất 8x18m", "2 tầng", "4 phòng ngủ", "Gia đình 2 thế hệ"]
  },
  {
    title: "Nhà nông thôn hiện đại 02",
    category: "Nhà nông thôn",
    image: "/portfolio/nha-vuon.webp",
    icon: TreePine,
    specs: ["Đất 10x20m", "2 tầng", "5 phòng ngủ", "Nhà ở + sân vườn"]
  },
  {
    title: "Nhà lô phố 01",
    category: "Nhà lô phố",
    image: "/portfolio/nha-pho.png",
    icon: Building2,
    specs: ["Đất 5x18m", "3 tầng", "4 phòng ngủ", "Có giếng trời"]
  },
  {
    title: "Nhà lô phố 02",
    category: "Nhà lô phố",
    image: "/portfolio/nha-pho.webp",
    icon: Building2,
    specs: ["Đất 6x20m", "5 tầng", "5 phòng ngủ", "Ở kết hợp kinh doanh"]
  },
  {
    title: "Biệt thự hiện đại",
    category: "Biệt thự",
    image: "/portfolio/biet-thu.webp",
    icon: Home,
    specs: ["Đất 12x22m", "2 tầng", "5 phòng ngủ", "Gara + sân vườn"]
  }
];

export const analysisItems = [
  {
    title: "Đất có hợp mẫu không?",
    value: "Kiểm tra kích thước, hướng nắng, mặt tiền",
    points: ["Mẫu nhà có vừa chiều ngang đất không", "Mặt tiền có bị nóng hoặc bí không", "Có cần sân trước, sân sau, giếng trời không"]
  },
  {
    title: "Nhà có đủ công năng không?",
    value: "Sắp xếp phòng theo cách gia đình sử dụng",
    points: ["Số phòng ngủ có đủ cho hiện tại và vài năm tới", "Bếp, khách, thờ, vệ sinh có thuận tiện không", "Luồng đi lại có bị rối hoặc tốn diện tích không"]
  },
  {
    title: "Có dễ thi công không?",
    value: "Chọn hình khối, mái, vật liệu theo thực tế",
    points: ["Mái và mặt tiền có quá phức tạp không", "Kết cấu có phù hợp đội thầu địa phương không", "Hồ sơ có đủ để hạn chế sửa khi xây không"]
  }
];

export const pricingItems = ["Kiến trúc", "Kết cấu", "3D", "Điện nước"];

export const formNeeds = ["Nhà mái Nhật", "Nhà phố", "Biệt thự", "Nhà vườn", "Chưa xác định"];

export const stickyActions = [
  { label: "Gọi ngay", href: "tel:0922823555", icon: Phone, type: "link" },
  { label: "Zalo", href: site.zalo, icon: MessageCircle, type: "link" },
  { label: "Đăng ký tư vấn", href: "#", icon: ClipboardCheck, type: "form" }
] as const;

export const heroBadges = ["Nhà phố", "Nhà mái Nhật", "Biệt thự"];

export const quickTrust = [
  { value: "Tư vấn miễn phí", label: "Giải pháp ban đầu" },
  { value: "6 hạng mục", label: "Hồ sơ bàn giao" },
  { value: "Toàn quốc", label: "Tư vấn online" }
];

export const formHighlights = [
  "Không cần thanh toán trước khi tư vấn",
  "Gửi thông tin trong dưới 60 giây",
  "Kiến trúc sư gọi lại theo số điện thoại"
];

export const proofStats = [
  { value: "200+", label: "hồ sơ thiết kế đã thực hiện" },
  { value: "35+", label: "tỉnh thành đã tư vấn online" },
  { value: "1-3 ngày", label: "có phương án sơ bộ" },
  { value: "6", label: "hạng mục hồ sơ bàn giao" }
];

export const whyChooseItems = [
  {
    title: "Tư vấn đúng nhu cầu",
    description: "Kiến trúc sư phân tích diện tích, công năng và ngân sách trước khi đề xuất phương án.",
    icon: MessageCircle
  },
  {
    title: "Hồ sơ rõ ràng, đồng bộ",
    description: "Kiến trúc, kết cấu và điện nước được triển khai thống nhất để thuận tiện khi thi công.",
    icon: FileCheck2
  },
  {
    title: "Thiết kế bám sát thực tế",
    description: "Giải pháp được cân đối theo khu đất, điều kiện thi công và vật liệu tại địa phương.",
    icon: Ruler
  },
  {
    title: "Đồng hành trong quá trình xây dựng",
    description: "Hỗ trợ giải đáp kỹ thuật và làm rõ bản vẽ khi chủ nhà triển khai công trình.",
    icon: ShieldCheck
  }
];

export const testimonials = [
  {
    name: "Anh Minh",
    home: "Nhà lô phố 5x20m",
    quote: "Trước đó tôi lưu rất nhiều mẫu nhưng không biết mẫu nào hợp đất. Sau khi gửi thông tin, KTS tư vấn lại mặt bằng và hướng lấy sáng rất dễ hiểu."
  },
  {
    name: "Chị Hương",
    home: "Nhà nông thôn 2 tầng",
    quote: "Điểm tôi cần là bản vẽ rõ để làm việc với thợ. Phối cảnh đẹp nhưng vẫn phải thi công được, không bị quá cầu kỳ."
  },
  {
    name: "Anh Quân",
    home: "Biệt thự sân vườn",
    quote: "Tư vấn nhanh, hỏi đúng nhu cầu gia đình. Tôi thích cách phân tích công năng trước rồi mới chốt kiểu dáng bên ngoài."
  }
];

export const faqSchemaItems = [
  {
    question: "Thiết kế online được không?",
    answer: "Có. Khách hàng có thể gửi kích thước đất, ảnh hiện trạng và nhu cầu để được tư vấn online toàn quốc."
  },
  {
    question: "Chi phí thiết kế được xác định như thế nào?",
    answer: "Chi phí được tư vấn theo loại công trình, diện tích, nhu cầu sử dụng và phạm vi hồ sơ cụ thể."
  },
  {
    question: "Tôi đăng ký xong sẽ được gì?",
    answer: "Kiến trúc sư sẽ liên hệ để tư vấn loại nhà, diện tích, nhu cầu sử dụng và hướng báo giá phù hợp."
  }
];
