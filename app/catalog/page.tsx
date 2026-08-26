import type { Metadata } from "next";
import CatalogFlipbook from "@/components/catalog-flipbook";

export const metadata: Metadata = {
  title: "Catalog kiến trúc TDH",
  description: "Xem catalog kiến trúc TDH trực tuyến với hiệu ứng lật trang."
};

export default function CatalogPage() {
  return <CatalogFlipbook />;
}
