"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Send } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formNeeds } from "@/data/landing";
import { leadSchema, type LeadFormValues } from "@/lib/lead-schema";

export function LeadForm({ source }: { source: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, submitCount }
  } = useForm<LeadFormValues>({
    resolver: zodResolver(leadSchema),
    defaultValues: { need: formNeeds[0], source }
  });

  async function onSubmit(values: LeadFormValues) {
    setStatus("idle");
    const response = await fetch("/api/leads", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values)
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset({ need: formNeeds[0], name: "", phone: "", area: "", note: "", source });
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5 rounded-[18px] bg-white p-5 shadow-card ring-1 ring-primary/10 md:p-7">
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Họ và tên" error={errors.name?.message} submitCount={submitCount}>
          <input {...register("name")} className={inputClass(Boolean(errors.name))} placeholder="Nguyễn Văn A" autoComplete="name" />
        </Field>
        <Field label="Số điện thoại" error={errors.phone?.message} submitCount={submitCount}>
          <input {...register("phone")} className={inputClass(Boolean(errors.phone))} placeholder="0922823555" autoComplete="tel" inputMode="numeric" maxLength={10} />
        </Field>
      </div>
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Diện tích xây dựng" error={errors.area?.message} submitCount={submitCount}>
          <input {...register("area")} className={inputClass(Boolean(errors.area))} placeholder="Ví dụ: 120m², 5x20m" />
        </Field>
        <Field label="Nhu cầu" error={errors.need?.message} submitCount={submitCount}>
          <select {...register("need")} className={inputClass(Boolean(errors.need))}>
            {formNeeds.map((need) => (
              <option key={need} value={need}>
                {need}
              </option>
            ))}
          </select>
        </Field>
      </div>
      <Field label="Ghi chú thêm" error={errors.note?.message} submitCount={submitCount}>
        <textarea {...register("note")} className={`${inputClass(Boolean(errors.note))} min-h-28 resize-y`} placeholder="Vị trí đất, số tầng, ngân sách dự kiến..." />
      </Field>
      <input type="hidden" {...register("source")} value={source} />
      <button
        type="submit"
        disabled={isSubmitting}
        className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase text-white transition duration-300 hover:-translate-y-0.5 hover:bg-[#C9141B] disabled:cursor-not-allowed disabled:opacity-70"
      >
        <Send size={18} aria-hidden="true" />
        {isSubmitting ? "Đang gửi..." : "Đăng ký tư vấn miễn phí"}
      </button>
      {status === "success" ? <p className="text-sm font-semibold text-success">Đã gửi thông tin. Kiến trúc sư sẽ liên hệ lại sớm.</p> : null}
      {status === "error" ? <p className="text-sm font-semibold text-red-600">Chưa gửi được thông tin. Vui lòng gọi hotline hoặc thử lại.</p> : null}
    </form>
  );
}

function inputClass(hasError: boolean) {
  return `input ${hasError ? "input-error" : ""}`;
}

function Field({ label, error, submitCount, children }: { label: string; error?: string; submitCount: number; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-semibold text-primary">
      <span>{label}</span>
      <span key={`${label}-${submitCount}-${error ?? "ok"}`} className="contents">
        {children}
      </span>
      {error ? <span className="text-xs font-semibold text-red-600">{error}</span> : null}
    </label>
  );
}
