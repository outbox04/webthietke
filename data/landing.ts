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
  name: "TK Architecture",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://kien-truc-tk.vercel.app",
  phone: "0384 546 623",
  zalo: "https://zalo.me/0384546623",
  description:
    "Tư vấn thiết kế kiến trúc nhà phố, nhà mái Nhật, biệt thự và nhà vườn từ 70.000đ/m²."
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
    title: "Nhà mái Nhật",
    image: "/portfolio/nha-mai-nhat.webp",
    icon: Home
  },
  {
    title: "Nhà phố",
    image: "/portfolio/nha-pho.webp",
    icon: Building2
  },
  {
    title: "Biệt thự",
    image: "/portfolio/biet-thu.webp",
    icon: Home
  },
  {
    title: "Nhà vườn",
    image: "/portfolio/nha-vuon.webp",
    icon: TreePine
  }
];

export const analysisItems = [
  {
    title: "Ánh sáng",
    value: "Giếng trời, cửa sổ, hướng nắng",
    points: ["Không gian chính đủ sáng", "Hạn chế nóng buổi chiều", "Thông gió tự nhiên"]
  },
  {
    title: "Công năng",
    value: "Mặt bằng đúng thói quen sống",
    points: ["Lối đi gọn", "Phòng ngủ riêng tư", "Bếp và sinh hoạt thuận tiện"]
  },
  {
    title: "Chi phí",
    value: "Mẫu đẹp nhưng phải xây được",
    points: ["Khối nhà dễ thi công", "Vật liệu kiểm soát được", "Hồ sơ giảm phát sinh"]
  }
];

export const pricingItems = ["Kiến trúc", "Kết cấu", "3D", "Điện nước"];

export const formNeeds = ["Nhà mái Nhật", "Nhà phố", "Biệt thự", "Nhà vườn", "Chưa xác định"];

export const stickyActions = [
  { label: "Gọi ngay", href: "tel:0384546623", icon: Phone, type: "link" },
  { label: "Zalo", href: site.zalo, icon: MessageCircle, type: "link" },
  { label: "Đăng ký tư vấn", href: "#", icon: ClipboardCheck, type: "form" }
] as const;

export const heroBadges = ["Nhà phố", "Nhà mái Nhật", "Biệt thự"];

export const quickTrust = [
  { value: "70.000đ/m²", label: "Giá thiết kế từ" },
  { value: "6 hạng mục", label: "Hồ sơ bàn giao" },
  { value: "Toàn quốc", label: "Tư vấn online" }
];

export const formHighlights = [
  "Không cần thanh toán trước khi tư vấn",
  "Gửi thông tin trong dưới 60 giây",
  "Kiến trúc sư gọi lại theo số điện thoại"
];

export const faqSchemaItems = [
  {
    question: "Thiết kế online được không?",
    answer: "Có. Khách hàng có thể gửi kích thước đất, ảnh hiện trạng và nhu cầu để được tư vấn online toàn quốc."
  },
  {
    question: "Chi phí thiết kế từ bao nhiêu?",
    answer: "Chi phí thiết kế kiến trúc bắt đầu từ 70.000đ/m² tùy quy mô và phạm vi hồ sơ."
  },
  {
    question: "Tôi đăng ký xong sẽ được gì?",
    answer: "Kiến trúc sư sẽ liên hệ để tư vấn loại nhà, diện tích, nhu cầu sử dụng và hướng báo giá phù hợp."
  }
];
