"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Send, X } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { formNeeds } from "@/data/landing";
import { leadSchema, type LeadFormValues } from "@/lib/lead-schema";

export function LeadForm({ source }: { source: string }) {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [successOpen, setSuccessOpen] = useState(false);
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
    setSuccessOpen(true);
    reset({ need: formNeeds[0], name: "", phone: "", area: "", note: "", source });
  }

  return (
    <>
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
      {status === "error" ? <p className="text-sm font-semibold text-red-600">Chưa gửi được thông tin. Vui lòng gọi hotline hoặc thử lại.</p> : null}
    </form>
    <AnimatePresence>
      {successOpen ? (
        <motion.div className="fixed inset-0 z-[100] grid place-items-center bg-primary/80 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <motion.div initial={{ opacity: 0, scale: 0.94, y: 18 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.96, y: 12 }} transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }} className="relative w-full max-w-md rounded-[20px] border border-white/10 bg-secondary p-7 text-center text-white shadow-soft md:p-9">
            <button type="button" onClick={() => setSuccessOpen(false)} className="focus-ring absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-white transition hover:bg-white/15" aria-label="Đóng thông báo">
              <X size={20} aria-hidden="true" />
            </button>
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-accent/10 ring-1 ring-accent/30">
              <CheckCircle2 className="text-accent" size={42} strokeWidth={1.8} aria-hidden="true" />
            </div>
            <p className="mt-6 section-kicker">Gửi thành công</p>
            <h2 className="mt-3 font-heading text-3xl font-extrabold leading-tight text-white">Đã gửi thông tin thành công!</h2>
            <p className="mt-4 text-sm leading-7 text-white/70">Cảm ơn bạn đã để lại thông tin. Kiến trúc sư Tiến Dương sẽ liên hệ tư vấn trong thời gian sớm nhất.</p>
            <button type="button" onClick={() => setSuccessOpen(false)} className="focus-ring mt-7 min-h-12 w-full rounded-xl bg-accent px-6 py-3 text-sm font-bold uppercase text-white transition hover:bg-[#C9141B]">Hoàn tất</button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
    </>
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
