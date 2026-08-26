"use client";

import { ChevronLeft, ChevronRight, Download, Expand, Shrink, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./catalog-flipbook.module.css";

const PDF_URL = "/catalog/Done_Catalog_TDH_web.pdf";
const PAGE_COUNT = 24;
const PAGE_IMAGES = Array.from({ length: PAGE_COUNT }, (_, index) => `/catalog/pages/page-${String(index + 1).padStart(2, "0")}.jpg?v=2`);

type PageFlipEvent = { data: number | string | { page: number; mode: "portrait" | "landscape" } };
type PageFlipInstance = {
  loadFromImages: (images: string[]) => void;
  flipNext: (corner?: "top" | "bottom") => void;
  flipPrev: (corner?: "top" | "bottom") => void;
  on: (event: string, callback: (event: PageFlipEvent) => void) => void;
  destroy: () => void;
};

declare global {
  interface Window {
    St?: { PageFlip: new (element: HTMLElement, settings: Record<string, unknown>) => PageFlipInstance };
    webkitAudioContext?: typeof AudioContext;
  }
}

export default function CatalogFlipbook() {
  const viewerRef = useRef<HTMLElement>(null);
  const bookRef = useRef<HTMLDivElement>(null);
  const pageFlipRef = useRef<PageFlipInstance | null>(null);
  const soundEnabledRef = useRef(true);
  const lastFlipSoundRef = useRef(0);
  const [pageIndex, setPageIndex] = useState(0);
  const [orientation, setOrientation] = useState<"portrait" | "landscape">("landscape");
  const [fullscreen, setFullscreen] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { soundEnabledRef.current = soundEnabled; }, [soundEnabled]);

  const playPageSound = useCallback(() => {
    if (!soundEnabledRef.current || Date.now() - lastFlipSoundRef.current < 350) return;
    lastFlipSoundRef.current = Date.now();
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextClass) return;
    const audioContext = new AudioContextClass();
    const duration = 0.62;
    const buffer = audioContext.createBuffer(1, audioContext.sampleRate * duration, audioContext.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i += 1) {
      const progress = i / data.length;
      data[i] = (Math.random() * 2 - 1) * Math.sin(Math.PI * progress) * (1 - progress * 0.55);
    }
    const source = audioContext.createBufferSource();
    const filter = audioContext.createBiquadFilter();
    const gain = audioContext.createGain();
    filter.type = "bandpass";
    filter.frequency.setValueAtTime(1700, audioContext.currentTime);
    filter.frequency.exponentialRampToValueAtTime(380, audioContext.currentTime + duration);
    filter.Q.value = 0.65;
    gain.gain.setValueAtTime(0.0001, audioContext.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.2, audioContext.currentTime + 0.07);
    gain.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + duration);
    source.buffer = buffer;
    source.connect(filter).connect(gain).connect(audioContext.destination);
    source.start();
    source.stop(audioContext.currentTime + duration);
    source.addEventListener("ended", () => void audioContext.close());
  }, []);

  useEffect(() => {
    let cancelled = false;
    function initialise() {
      if (cancelled || !bookRef.current || !window.St) return;
      try {
        const instance = new window.St.PageFlip(bookRef.current, {
          width: 595, height: 842, size: "stretch", minWidth: 260, maxWidth: 595,
          minHeight: 368, maxHeight: 842, autoSize: true, showCover: true, usePortrait: true,
          drawShadow: true, maxShadowOpacity: 0.62, flippingTime: 1050, showPageCorners: true,
          mobileScrollSupport: true, swipeDistance: 25
        });
        instance.on("init", (event) => {
          const value = event.data as { page: number; mode: "portrait" | "landscape" };
          setPageIndex(value.page); setOrientation(value.mode); setReady(true);
        });
        instance.on("flip", (event) => setPageIndex(Number(event.data)));
        instance.on("changeOrientation", (event) => setOrientation(event.data as "portrait" | "landscape"));
        instance.on("changeState", (event) => { if (event.data === "flipping") playPageSound(); });
        instance.loadFromImages(PAGE_IMAGES);
        pageFlipRef.current = instance;
      } catch { setError("Không thể khởi tạo hiệu ứng lật trang. Vui lòng tải lại trang."); }
    }
    if (window.St) initialise();
    else {
      const script = document.createElement("script");
      script.src = "/catalog/page-flip.browser.js?v=2"; script.async = true; script.onload = initialise;
      script.onerror = () => setError("Không thể tải hiệu ứng lật trang. Vui lòng tải lại trang.");
      document.head.appendChild(script);
    }
    return () => { cancelled = true; pageFlipRef.current = null; };
  }, [playPageSound]);

  useEffect(() => {
    const handler = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", handler);
    return () => document.removeEventListener("fullscreenchange", handler);
  }, []);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") pageFlipRef.current?.flipNext("bottom");
      if (event.key === "ArrowLeft") pageFlipRef.current?.flipPrev("bottom");
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => window.dispatchEvent(new Event("resize")), 40);
    return () => window.clearTimeout(timer);
  }, [pageIndex]);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await viewerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  }

  const isCover = pageIndex === 0 || pageIndex === PAGE_COUNT - 1;
  const coverClass = pageIndex === 0 ? styles.frontCover : pageIndex === PAGE_COUNT - 1 ? styles.backCover : "";
  const label = isCover || orientation === "portrait" ? `Trang ${pageIndex + 1} / ${PAGE_COUNT}` : `Trang ${pageIndex + 1}–${Math.min(pageIndex + 2, PAGE_COUNT)} / ${PAGE_COUNT}`;

  return (
    <main className={styles.shell} ref={viewerRef}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Về trang chủ"><Image src="/logo/logo-slogan.png" alt="Tiến Dương" width={44} height={44} /><span>TIẾN DƯƠNG</span></Link>
        <h1>Catalog công trình</h1>
        <div className={styles.headerActions}>
          <a href={PDF_URL} download className={styles.iconButton} title="Tải catalog PDF"><Download size={19} /></a>
          <button type="button" className={styles.iconButton} onClick={toggleFullscreen} title="Toàn màn hình">{fullscreen ? <Shrink size={19} /> : <Expand size={19} />}</button>
        </div>
      </header>
      <section className={styles.viewer} aria-live="polite">
        {!ready && !error && <div className={styles.loading}><span />Đang mở catalog…</div>}
        {error && <div className={styles.error}>{error}</div>}
        <div className={`${styles.flipStage} ${isCover ? styles.coverStage : ""} ${coverClass} ${ready ? styles.stageReady : ""}`}>
          <div ref={bookRef} className={styles.flipBook} />
          {!isCover && orientation === "landscape" && <div className={styles.spine} aria-hidden="true" />}
        </div>
      </section>
      <footer className={styles.controls}>
        <button type="button" onClick={() => pageFlipRef.current?.flipPrev("bottom")} disabled={!ready || pageIndex === 0} aria-label="Trang trước"><ChevronLeft size={24} /></button>
        <span>{ready ? label : "Đang tải…"}</span>
        <button type="button" onClick={() => pageFlipRef.current?.flipNext("bottom")} disabled={!ready || pageIndex >= PAGE_COUNT - 1} aria-label="Trang sau"><ChevronRight size={24} /></button>
        <button type="button" className={styles.soundButton} onClick={() => setSoundEnabled((current) => !current)} aria-label={soundEnabled ? "Tắt tiếng lật trang" : "Bật tiếng lật trang"}>{soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}</button>
      </footer>
      <p className={styles.hint}>Kéo góc trang, vuốt hoặc dùng phím ← → để lật trang</p>
    </main>
  );
}
