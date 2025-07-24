// lib/api.ts

import { ProductData } from "../types/product";

const BASE_URL =
  "https://api.10minuteschool.com/discovery-service/api/v1/products/ielts-course";

export async function fetchProductData(
  lang: "en" | "bn" = "en"
): Promise<ProductData | null> {
  try {
    const res = await fetch(`${BASE_URL}?lang=${lang}`, {
      headers: {
        "X-TENMS-SOURCE-PLATFORM": "web",
        Accept: "application/json",
      },
      next: {
        revalidate: 60, // Optional: for ISR (regenerates every 60 seconds)
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch product data: ${res.status}`);
      return null;
    }

    const data = (await res.json()) as ProductData;
    return data;
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}
