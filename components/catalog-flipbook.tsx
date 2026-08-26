"use client";

import { ChevronLeft, ChevronRight, Download, Expand, Home, Shrink } from "lucide-react";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./catalog-flipbook.module.css";

const PDF_URL = "/catalog/Done_Catalog_TDH.pdf";

type PdfPage = {
  getViewport: (options: { scale: number }) => { width: number; height: number };
  render: (options: { canvasContext: CanvasRenderingContext2D; viewport: unknown }) => { promise: Promise<void> };
};

type PdfDocument = {
  numPages: number;
  getPage: (pageNumber: number) => Promise<PdfPage>;
};

function PdfCanvas({ document, pageNumber }: { document: PdfDocument; pageNumber: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function renderPage() {
      setReady(false);
      const page = await document.getPage(pageNumber);
      const viewport = page.getViewport({ scale: 1.35 });
      const canvas = canvasRef.current;
      if (!canvas || cancelled) return;
      const context = canvas.getContext("2d", { alpha: false });
      if (!context) return;
      canvas.width = Math.floor(viewport.width);
      canvas.height = Math.floor(viewport.height);
      await page.render({ canvasContext: context, viewport }).promise;
      if (!cancelled) setReady(true);
    }

    void renderPage();
    return () => {
      cancelled = true;
    };
  }, [document, pageNumber]);

  return (
    <div className={styles.page} aria-label={`Trang ${pageNumber}`}>
      {!ready && <div className={styles.pageLoader}>Đang tải trang {pageNumber}…</div>}
      <canvas ref={canvasRef} className={`${styles.canvas} ${ready ? styles.canvasReady : ""}`} />
      <span className={styles.pageNumber}>{pageNumber}</span>
    </div>
  );
}

export default function CatalogFlipbook() {
  const viewerRef = useRef<HTMLDivElement>(null);
  const [pdfDocument, setPdfDocument] = useState<PdfDocument | null>(null);
  const [error, setError] = useState("");
  const [page, setPage] = useState(1);
  const [singlePage, setSinglePage] = useState(false);
  const [direction, setDirection] = useState<"next" | "prev" | null>(null);
  const [fullscreen, setFullscreen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    async function loadPdf() {
      try {
        // PDF.js is served as a static ES module to keep the main application bundle small.
        const importPdfJs = new Function("return import('/catalog/pdf.mjs')") as () => Promise<any>;
        const pdfjs = await importPdfJs();
        pdfjs.GlobalWorkerOptions.workerSrc = "/catalog/pdf.worker.min.mjs";
        const loaded = await pdfjs.getDocument(PDF_URL).promise;
        if (!cancelled) setPdfDocument(loaded as PdfDocument);
      } catch {
        if (!cancelled) setError("Không thể tải catalog. Vui lòng thử lại hoặc tải file PDF về máy.");
      }
    }
    void loadPdf();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(max-width: 700px)");
    const updateLayout = () => setSinglePage(media.matches);
    updateLayout();
    media.addEventListener("change", updateLayout);
    return () => media.removeEventListener("change", updateLayout);
  }, []);

  useEffect(() => {
    if (!singlePage && page % 2 === 0) setPage((current) => Math.max(1, current - 1));
  }, [page, singlePage]);

  useEffect(() => {
    const onFullscreenChange = () => setFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", onFullscreenChange);
  }, []);

  const turn = useCallback(
    (nextDirection: "next" | "prev") => {
      if (!pdfDocument || direction) return;
      const step = singlePage ? 1 : 2;
      const nextPage = nextDirection === "next" ? page + step : page - step;
      if (nextPage < 1 || nextPage > pdfDocument.numPages) return;
      setDirection(nextDirection);
      window.setTimeout(() => setPage(nextPage), 250);
      window.setTimeout(() => setDirection(null), 560);
    },
    [direction, pdfDocument, page, singlePage]
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") turn("next");
      if (event.key === "ArrowLeft") turn("prev");
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [turn]);

  async function toggleFullscreen() {
    if (!document.fullscreenElement) await viewerRef.current?.requestFullscreen();
    else await document.exitFullscreen();
  }

  const canGoBack = page > 1;
  const canGoNext = Boolean(pdfDocument && page < pdfDocument.numPages);

  return (
    <main className={styles.shell} ref={viewerRef}>
      <header className={styles.header}>
        <Link href="/" className={styles.brand} aria-label="Về trang chủ">
          <Home size={19} />
          <span>TDH Architecture</span>
        </Link>
        <h1>Catalog công trình</h1>
        <div className={styles.headerActions}>
          <a href={PDF_URL} download className={styles.iconButton} title="Tải catalog PDF">
            <Download size={19} />
          </a>
          <button type="button" className={styles.iconButton} onClick={toggleFullscreen} title="Toàn màn hình">
            {fullscreen ? <Shrink size={19} /> : <Expand size={19} />}
          </button>
        </div>
      </header>

      <section className={styles.viewer} aria-live="polite">
        {!pdfDocument && !error && <div className={styles.loading}><span />Đang mở catalog…</div>}
        {error && <div className={styles.error}>{error}</div>}
        {pdfDocument && (
          <div className={`${styles.book} ${direction === "next" ? styles.turnNext : ""} ${direction === "prev" ? styles.turnPrev : ""}`}>
            <PdfCanvas document={pdfDocument} pageNumber={page} />
            {!singlePage && page + 1 <= pdfDocument.numPages && <PdfCanvas document={pdfDocument} pageNumber={page + 1} />}
          </div>
        )}
      </section>

      <footer className={styles.controls}>
        <button type="button" onClick={() => turn("prev")} disabled={!canGoBack} aria-label="Trang trước">
          <ChevronLeft size={24} />
        </button>
        <span>{pdfDocument ? (singlePage ? `Trang ${page} / ${pdfDocument.numPages}` : `Trang ${page}–${Math.min(page + 1, pdfDocument.numPages)} / ${pdfDocument.numPages}`) : "Đang tải…"}</span>
        <button type="button" onClick={() => turn("next")} disabled={!canGoNext} aria-label="Trang sau">
          <ChevronRight size={24} />
        </button>
      </footer>
      <p className={styles.hint}>Dùng phím ← → hoặc nút điều hướng để lật trang</p>
    </main>
  );
}
