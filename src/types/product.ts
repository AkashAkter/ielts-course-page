// types/product.ts

export interface ProductData {
  slug: string;
  id: number;
  title: string;
  description: string; // HTML string
  media: Media[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
}

// Media for product trailer (e.g., YouTube video)
export interface Media {
  id: number;
  name: string;
  url: string;
  type: string; // e.g., "video", "image"
  video_id?: string; // For YouTube videos
}

// Checklist item
export interface Checklist {
  id: number;
  title: string;
}

// SEO metadata
export interface Seo {
  title: string;
  description: string;
  keywords?: string;
  og_title?: string;
  og_description?: string;
  og_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  twitter_image?: string;
}

// CTA button text
export interface CtaText {
  text: string;
  sub_text?: string;
}

// Sections (e.g., instructor, features, pointers, about)
export interface Section {
  id: number;
  type: "instructor" | "features" | "pointers" | "about"; // Add more if needed
  title: string;
  description?: string; // Often HTML
  items?: SectionItem[]; // Optional based on API
}

// Individual section item (used in features, instructors, etc.)
export interface SectionItem {
  id: number;
  title: string;
  subtitle?: string;
  image_url?: string;
  description?: string; // May contain HTML
}
