"use client";

import Image from "next/image";
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { portfolio } from "@/data/landing";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

export function PortfolioSlider() {
  return (
    <Swiper
      modules={[Navigation, Pagination]}
      spaceBetween={20}
      slidesPerView={1}
      navigation
      pagination={{ clickable: true }}
      breakpoints={{ 768: { slidesPerView: 2 }, 1025: { slidesPerView: 3 } }}
      className="mt-10 pb-12"
    >
      {portfolio.map((item) => (
        <SwiperSlide key={item.title}>
          <article className="overflow-hidden rounded-lg bg-white shadow-soft ring-1 ring-slate-200">
            <div className="relative aspect-[4/3]">
              <Image src={item.image} alt={item.title} fill sizes="(min-width: 1025px) 33vw, (min-width: 768px) 50vw, 100vw" className="object-cover" loading="lazy" />
            </div>
            <div className="grid gap-3 p-5">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-heading text-xl font-bold text-primary">{item.title}</h3>
                <span className="rounded-md bg-amber-100 px-3 py-1 text-xs font-bold text-primary">Được hỏi nhiều</span>
              </div>
              <p className="text-sm leading-6 text-slate-600">Xem mẫu nhanh, chọn hướng phù hợp rồi để kiến trúc sư tư vấn chi tiết.</p>
            </div>
          </article>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
