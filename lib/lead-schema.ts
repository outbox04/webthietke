import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().trim().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .transform((value) => value.replace(/\D/g, ""))
    .refine((value) => /^\d{10}$/.test(value), "Số điện thoại nhập thiếu số. Vui lòng nhập đủ 10 số."),
  area: z.string().trim().min(1, "Vui lòng nhập diện tích"),
  need: z.string().trim().min(1, "Vui lòng chọn nhu cầu"),
  note: z.string().trim().min(1, "Vui lòng nhập ghi chú").max(600, "Ghi chú quá dài"),
  source: z.string().trim().min(1, "Thiếu nguồn gửi form").max(120, "Nguồn gửi form quá dài")
});

export type LeadFormValues = z.infer<typeof leadSchema>;
