import type { ApiResponse, ProductData } from "../types/product";

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
        revalidate: 60,
      },
    });

    if (!res.ok) {
      console.error(`Failed to fetch product data: ${res.status}`);
      return null;
    }

    const response = (await res.json()) as ApiResponse;

    if (response.code !== 200 || !response.data) {
      console.error("Invalid API response:", response);
      return null;
    }

    const data = response.data;

    // Ensure arrays exist with fallbacks
    return {
      ...data,
      sections: data.sections || [],
      media: data.media || [],
      checklist: data.checklist || [],
      title: data.title || "Course Title",
      description:
        data.description || "Course description will be available soon.",
      cta_text: data.cta_text || { name: "Enroll Now", value: "enroll" },
      seo: data.seo || {
        title: "Course",
        description: "Course description",
        defaultMeta: [],
        keywords: [],
        schema: [],
      },
    };
  } catch (error) {
    console.error("Error fetching product data:", error);
    return null;
  }
}
