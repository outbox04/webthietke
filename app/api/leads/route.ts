import { NextResponse } from "next/server";
import { leadSchema } from "@/lib/lead-schema";

function escapeTelegram(value: string) {
  return value.replace(/[&<>]/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;" })[char] ?? char);
}

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);
  const parsed = leadSchema.safeParse(payload);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Dữ liệu chưa hợp lệ" }, { status: 400 });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;

  if (!token || !chatId) {
    return NextResponse.json({ ok: false, message: "Chưa cấu hình Telegram Bot" }, { status: 500 });
  }

  const lead = parsed.data;
  const text = [
    "<b>🔔 LEAD MỚI</b>",
    `👤 Họ tên: ${escapeTelegram(lead.name)}`,
    `📞 Số điện thoại: ${escapeTelegram(lead.phone)}`,
    `📐 Diện tích: ${escapeTelegram(lead.area)}`,
    `🏡 Nhu cầu: ${escapeTelegram(lead.need)}`,
    `📝 Ghi chú: ${escapeTelegram(lead.note || "Không có")}`,
    `⏰ Thời gian: ${new Intl.DateTimeFormat("vi-VN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Ho_Chi_Minh"
    }).format(new Date())}`
  ].join("\n");

  const response = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text, parse_mode: "HTML" })
  });

  if (!response.ok) {
    return NextResponse.json({ ok: false, message: "Không gửi được Telegram" }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
