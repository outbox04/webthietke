import LandingPage from "@/components/landing-page";
import { breadcrumbSchema, faqSchema, organizationSchema, serviceSchema } from "@/lib/seo";

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([organizationSchema, serviceSchema, faqSchema, breadcrumbSchema])
        }}
      />
      <LandingPage />
    </>
  );
}
