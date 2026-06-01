"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, CheckCircle2, Maximize2, Phone, X } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import {
  analysisItems,
  deliverables,
  formHighlights,
  heroBadges,
  portfolio,
  proofStats,
  pricingItems,
  quickTrust,
  site,
  testimonials
} from "@/data/landing";
import { LeadForm } from "@/components/lead-form";
import { StickyCta } from "@/components/sticky-cta";

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.45 }
};

export default function LandingPage() {
  const [leadOpen, setLeadOpen] = useState(false);
  const [leadSource, setLeadSource] = useState("Popup gửi thông tin trong 60 giây");
  const [analysisOpen, setAnalysisOpen] = useState<string | null>(null);

  function openLead(source: string) {
    setLeadSource(source);
    setLeadOpen(true);
  }

  return (
    <main className="overflow-hidden pb-24 md:pb-0">
      <Hero onOpenLead={() => openLead("Nút nhận tư vấn miễn phí ở hero")} />
      <Deliverables />
      <ProofStats />
      <PopularHomes onOpenLead={openLead} />
      <AnalysisSection analysisOpen={analysisOpen} setAnalysisOpen={setAnalysisOpen} />
      <ConversionSection onOpenLead={() => openLead("Nút nhận báo giá ở section báo giá")} />
      <FinalCta onOpenLead={() => openLead("Nút đăng ký tư vấn cuối trang")} />
      <LeadModal open={leadOpen} source={leadSource} onClose={() => setLeadOpen(false)} />
      <StickyCta onOpenLead={() => openLead("Thanh liên hệ nhanh - nút form")} />
    </main>
  );
}

function CtaButton({ children, onClick, className = "" }: { children: React.ReactNode; onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`focus-ring inline-flex min-h-14 items-center justify-center rounded-md bg-accent px-6 py-4 text-base font-extrabold uppercase text-primary shadow-soft transition hover:bg-amber-400 ${className}`}
    >
      {children}
    </button>
  );
}

function Hero({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <section className="relative bg-primary text-white">
      <Image src="/hero/architecture-hero.webp" alt="Mẫu thiết kế nhà phố, nhà mái Nhật và biệt thự" fill priority sizes="100vw" className="object-cover opacity-60" />
      <div className="absolute inset-0 bg-gradient-to-b from-primary/78 via-primary/64 to-primary/90" />
      <div className="container relative z-10 grid min-h-[92svh] items-center py-16">
        <motion.div {...fadeUp} className="max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {heroBadges.map((badge) => (
              <span key={badge} className="rounded-md bg-white/12 px-3 py-2 text-sm font-bold ring-1 ring-white/20">
                {badge}
              </span>
            ))}
          </div>
          <h1 className="mt-5 font-heading text-[2.35rem] font-extrabold leading-[1.04] text-white sm:text-5xl lg:text-6xl">
            Càng xem nhiều mẫu nhà đẹp càng không biết nhà nào thật sự phù hợp
          </h1>
          <div className="mt-5 inline-flex rounded-md bg-white px-4 py-3 font-heading text-2xl font-extrabold text-primary shadow-soft">
            Chỉ từ 70.000đ/m²
          </div>
          <p className="mt-5 max-w-xl text-lg font-semibold text-slate-100">Thiết kế nhà phố • Nhà mái Nhật • Biệt thự</p>
          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <CtaButton onClick={onOpenLead} className="w-full sm:w-auto">
              Nhận tư vấn miễn phí
            </CtaButton>
            <a href={`tel:${site.phone.replace(/\s/g, "")}`} className="focus-ring inline-flex min-h-14 items-center justify-center gap-2 rounded-md bg-white/10 px-6 py-4 font-bold text-white ring-1 ring-white/30 transition hover:bg-white/20">
              <Phone size={20} aria-hidden="true" />
              {site.phone}
            </a>
          </div>
          <dl className="mt-8 grid gap-3 sm:grid-cols-3">
            {quickTrust.map((stat) => (
              <div key={stat.label} className="rounded-lg bg-white/10 p-4 ring-1 ring-white/20 backdrop-blur">
                <dt className="text-xs font-semibold uppercase text-slate-300">{stat.label}</dt>
                <dd className="mt-1 font-heading text-xl font-extrabold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </motion.div>
      </div>
    </section>
  );
}

function SectionIntro({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="section-kicker">{eyebrow}</p>
      <h2 className="section-title">{title}</h2>
    </div>
  );
}

function Deliverables() {
  return (
    <section className="section bg-white">
      <div className="container">
        <SectionIntro eyebrow="Bạn nhận được gì" title="Đủ hồ sơ để xem, hiểu và thi công" />
        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          {deliverables.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article {...fadeUp} key={item.title} className="rounded-lg bg-light p-5 text-center ring-1 ring-slate-200">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-md bg-primary text-accent">
                  <Icon size={30} aria-hidden="true" />
                </div>
                <h3 className="mt-4 font-heading text-base font-extrabold leading-5 text-primary">{item.title}</h3>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PopularHomes({ onOpenLead }: { onOpenLead: (source: string) => void }) {
  return (
    <section className="section bg-light">
      <div className="container">
        <SectionIntro eyebrow="Mẫu nhà được quan tâm nhiều nhất" title="5 phối cảnh tượng trưng để bạn chọn nhanh kiểu nhà" />
        <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {portfolio.map((item) => {
            const Icon = item.icon;
            return (
              <motion.article {...fadeUp} key={item.title} className="flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-slate-200">
                <div className="relative aspect-[4/3]">
                  <Image src={item.image} alt={item.title} fill sizes="(min-width: 1025px) 25vw, (min-width: 768px) 50vw, 100vw" className="object-cover" loading="lazy" />
                  <div className="absolute left-3 top-3 flex h-11 w-11 items-center justify-center rounded-md bg-white/95 text-primary">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <p className="text-xs font-bold uppercase text-accent">{item.category}</p>
                  <h3 className="font-heading text-xl font-extrabold text-primary">{item.title}</h3>
                  <ul className="mt-4 grid gap-2 text-sm font-semibold text-slate-600">
                    {item.specs.map((spec) => (
                      <li key={spec} className="flex items-center gap-2">
                        <CheckCircle2 className="text-success" size={16} aria-hidden="true" />
                        {spec}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4">
                    <button type="button" onClick={() => onOpenLead(`Nút Nhận mẫu phù hợp - ${item.title}`)} className="focus-ring min-h-16 w-full rounded-md bg-primary px-4 py-3 text-sm font-bold uppercase text-white transition hover:bg-secondary">
                      Nhận mẫu phù hợp
                    </button>
                  </div>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function ProofStats() {
  return (
    <section className="bg-primary py-10 text-white">
      <div className="container grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {proofStats.map((stat) => (
          <div key={stat.label} className="rounded-lg bg-white/10 p-5 text-center ring-1 ring-white/15">
            <p className="font-heading text-4xl font-extrabold text-accent">{stat.value}</p>
            <p className="mt-2 text-sm font-semibold text-slate-200">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function AnalysisSection({ analysisOpen, setAnalysisOpen }: { analysisOpen: string | null; setAnalysisOpen: (value: string | null) => void }) {
  const selected = analysisItems.find((item) => item.title === analysisOpen);

  return (
    <section className="section bg-white">
      <div className="container">
        <SectionIntro eyebrow="KTS kiểm tra gì trước khi thiết kế" title="Không chọn mẫu chỉ vì nhìn đẹp" />
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {analysisItems.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() => setAnalysisOpen(item.title)}
              className="focus-ring rounded-lg bg-primary p-6 text-left text-white shadow-soft transition hover:-translate-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-heading text-2xl font-extrabold text-accent">{item.title}</span>
                <Maximize2 size={22} aria-hidden="true" />
              </div>
              <p className="mt-5 text-xl font-bold leading-7">{item.value}</p>
              <ul className="mt-5 grid gap-2 text-sm text-slate-200">
                {item.points.slice(0, 2).map((point) => (
                  <li key={point} className="flex gap-2">
                    <Check className="mt-0.5 shrink-0 text-accent" size={16} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </button>
          ))}
        </div>
      </div>
      <AnimatePresence>
        {selected ? (
          <motion.div className="fixed inset-0 z-[60] grid place-items-center bg-primary/75 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} className="w-full max-w-lg rounded-lg bg-white p-6 shadow-soft">
              <button type="button" onClick={() => setAnalysisOpen(null)} className="focus-ring ml-auto flex h-10 w-10 items-center justify-center rounded-md bg-slate-100 text-primary">
                <X size={20} aria-hidden="true" />
                <span className="sr-only">Đóng</span>
              </button>
              <h3 className="font-heading text-3xl font-extrabold text-primary">{selected.title}</h3>
              <p className="mt-2 text-lg font-bold text-slate-700">{selected.value}</p>
              <ul className="mt-5 grid gap-3">
                {selected.points.map((point) => (
                  <li key={point} className="flex items-center gap-3 rounded-md bg-light p-3 font-semibold text-primary">
                    <CheckCircle2 className="text-success" size={20} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}

function ConversionSection({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <section className="section bg-light">
      <div className="container grid gap-8">
        <div className="grid gap-8 rounded-lg bg-primary p-6 text-white shadow-soft md:grid-cols-[1fr_0.8fr] md:p-10">
          <div>
            <p className="section-kicker">Báo giá</p>
            <h2 className="mt-3 font-heading text-4xl font-extrabold leading-tight md:text-5xl">Chỉ từ 70.000đ/m²</h2>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-300">Nhận tư vấn nhanh theo diện tích và loại nhà. Không cần đọc dài, gửi thông tin là có người gọi lại.</p>
            <CtaButton onClick={onOpenLead} className="mt-7 w-full sm:w-auto">
              Nhận báo giá
            </CtaButton>
          </div>
          <div className="grid gap-3">
            {pricingItems.map((item) => (
              <div key={item} className="flex items-center gap-3 rounded-md bg-white/10 p-4 ring-1 ring-white/15">
                <Check className="text-accent" size={22} aria-hidden="true" />
                <span className="font-heading text-lg font-bold">{item}</span>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
        <div id="lead-form" className="grid gap-8 rounded-lg bg-white p-6 shadow-soft ring-1 ring-slate-200 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:p-8">
          <div>
            <p className="section-kicker">Form đăng ký</p>
            <h2 className="section-title">Đăng ký tư vấn miễn phí</h2>
            <div className="mt-6 grid gap-3">
              {formHighlights.map((item) => (
                <div key={item} className="flex items-center gap-3 rounded-md bg-light p-4 font-semibold text-primary ring-1 ring-slate-200">
                  <CheckCircle2 className="text-success" size={21} aria-hidden="true" />
                  {item}
                </div>
              ))}
            </div>
          </div>
          <LeadForm source="Form đăng ký tư vấn trong trang" />
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <div>
      <div className="mx-auto max-w-2xl text-center">
        <p className="section-kicker">Đánh giá khách hàng</p>
        <h2 className="section-title">Khách cần bản vẽ dễ hiểu, không chỉ phối cảnh đẹp</h2>
      </div>
      <div className="mt-8 grid gap-5 md:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-lg bg-white p-5 shadow-sm ring-1 ring-slate-200">
            <div className="flex gap-1 text-accent" aria-hidden="true">
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
              <span>★</span>
            </div>
            <p className="mt-4 text-sm leading-7 text-slate-600">"{item.quote}"</p>
            <div className="mt-5 border-t border-slate-200 pt-4">
              <p className="font-heading font-extrabold text-primary">{item.name}</p>
              <p className="text-sm font-semibold text-slate-500">{item.home}</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function FinalCta({ onOpenLead }: { onOpenLead: () => void }) {
  return (
    <section className="bg-secondary py-14 text-white">
      <div className="container grid gap-5 md:grid-cols-[1fr_auto] md:items-center">
        <h2 className="font-heading text-3xl font-extrabold leading-tight md:text-4xl">Muốn biết mẫu nào hợp đất và ngân sách của bạn?</h2>
        <CtaButton onClick={onOpenLead}>Đăng ký tư vấn</CtaButton>
      </div>
    </section>
  );
}

function LeadModal({ open, source, onClose }: { open: boolean; source: string; onClose: () => void }) {
  return (
    <AnimatePresence>
      {open ? (
        <motion.div className="fixed inset-0 z-[70] overflow-y-auto bg-primary/75 p-4 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <div className="mx-auto flex min-h-full max-w-2xl items-center justify-center py-6">
            <motion.div initial={{ scale: 0.96, y: 16 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.96, y: 16 }} className="w-full rounded-lg bg-white p-4 shadow-soft md:p-6">
              <div className="mb-4 flex items-start justify-between gap-4">
                <div>
                  <p className="section-kicker">Nhận tư vấn miễn phí</p>
                  <h2 className="font-heading text-2xl font-extrabold text-primary">Gửi thông tin trong 60 giây</h2>
                  <p className="mt-2 max-w-lg text-sm font-semibold leading-6 text-slate-600">
                    KTS dùng thông tin này để gọi lại, tư vấn phương án phù hợp với diện tích, nhu cầu và dự toán thiết kế cho khách hàng.
                  </p>
                </div>
                <button type="button" onClick={onClose} className="focus-ring flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-slate-100 text-primary">
                  <X size={20} aria-hidden="true" />
                  <span className="sr-only">Đóng</span>
                </button>
              </div>
              <LeadForm source={source} />
            </motion.div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
