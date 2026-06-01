import type { Metadata } from "next";
import { Be_Vietnam_Pro, Montserrat } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { site } from "@/data/landing";

const montserrat = Montserrat({
  subsets: ["vietnamese"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["600", "700", "800"]
});

const beVietnam = Be_Vietnam_Pro({
  subsets: ["vietnamese"],
  variable: "--font-be-vietnam",
  display: "swap",
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: "Thiết kế kiến trúc nhà phố, nhà mái Nhật, biệt thự từ 70.000đ/m²",
  description: site.description,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "Tư vấn thiết kế kiến trúc nhà ở toàn quốc",
    description: site.description,
    url: site.url,
    siteName: site.name,
    locale: "vi_VN",
    type: "website",
    images: [{ url: "/hero/architecture-hero.webp", width: 1200, height: 630, alt: "Thiết kế kiến trúc nhà ở" }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Thiết kế kiến trúc nhà ở từ 70.000đ/m²",
    description: site.description,
    images: ["/hero/architecture-hero.webp"]
  },
  icons: {
    icon: "/favicon/favicon.svg"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;
  const gaId = process.env.NEXT_PUBLIC_GA_ID || "G-WX39WZP7JV";
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="vi" className={`${montserrat.variable} ${beVietnam.variable}`}>
      <body>
        {gtmId ? (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${gtmId}');`}
          </Script>
        ) : null}
        {gaId ? (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}
gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        ) : null}
        {pixelId ? (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
document,'script','https://connect.facebook.net/en_US/fbevents.js');
fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        ) : null}
        {children}
      </body>
    </html>
  );
}
