import { z } from "zod";

export const leadSchema = z.object({
  name: z.string().min(2, "Vui lòng nhập họ tên"),
  phone: z
    .string()
    .regex(/^(0|\+84)(\d[\s.-]?){8,10}$/, "Số điện thoại chưa hợp lệ"),
  area: z.string().min(1, "Vui lòng nhập diện tích"),
  need: z.string().min(1, "Vui lòng chọn nhu cầu"),
  note: z.string().max(600, "Ghi chú quá dài").optional()
});

export type LeadFormValues = z.infer<typeof leadSchema>;
