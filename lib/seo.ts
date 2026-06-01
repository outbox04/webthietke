import { faqSchemaItems, site } from "@/data/landing";

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: site.name,
  url: site.url,
  telephone: site.phone,
  logo: `${site.url}/logo/logo.svg`,
  areaServed: "Việt Nam"
};

export const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Thiết kế kiến trúc nhà ở",
  provider: { "@type": "Organization", name: site.name },
  serviceType: "Thiết kế kiến trúc nhà phố, nhà mái Nhật, biệt thự và villa",
  areaServed: "Việt Nam",
  offers: {
    "@type": "Offer",
    price: "70000",
    priceCurrency: "VND",
    unitText: "m2"
  }
};

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqSchemaItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer
    }
  }))
};

export const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Trang chủ",
      item: site.url
    },
    {
      "@type": "ListItem",
      position: 2,
      name: "Thiết kế kiến trúc",
      item: `${site.url}/#lead-form`
    }
  ]
};
