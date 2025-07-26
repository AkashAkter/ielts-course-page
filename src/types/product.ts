/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ApiResponse {
  code: number;
  data: ProductData;
  error: any[];
  message: string;
  payload: any[];
  status_code: number;
}

export interface ProductData {
  slug: string;
  id: number;
  title: string;
  description: string; // HTML string
  platform: string;
  type: string;
  modality: string;
  old_info: OldInfo;
  start_at: string;
  media: Media[];
  checklist: Checklist[];
  seo: Seo;
  cta_text: CtaText;
  sections: Section[];
  is_cohort_based_course: boolean;
  secondary_cta_group: any[];
  delivery_method: string;
}

export interface OldInfo {
  cat_id: number;
  course_id: number;
  platform: string;
  skills_cat_id: number;
  slug: string;
}

// Media for product trailer (e.g., YouTube video)
export interface Media {
  name: string;
  resource_type: string; // "video" or "image"
  resource_value: string; // YouTube ID or image URL
  thumbnail_url?: string;
}

// Checklist item
export interface Checklist {
  color: string;
  icon: string;
  id: string;
  list_page_visibility: boolean;
  text: string;
}

// SEO metadata
export interface Seo {
  defaultMeta: DefaultMeta[];
  description: string;
  keywords: string[];
  schema: Schema[];
  title: string;
}

export interface DefaultMeta {
  content: string;
  type: string;
  value: string;
}

export interface Schema {
  meta_name: string;
  meta_value: string;
  type: string;
}

// CTA button text
export interface CtaText {
  name: string;
  value: string;
}

// Sections (e.g., instructor, features, pointers, about)
export interface Section {
  type: string;
  name: string;
  description: string;
  bg_color: string;
  order_idx: number;
  values: SectionValue[];
}

// Individual section item (used in features, instructors, etc.)
export interface SectionValue {
  id?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  name?: string;
  image?: string;
  short_description?: string;
  slug?: string;
  has_instructor_page?: boolean;
  icon?: string;
  text?: string;
  color?: string;
  checklist?: string[];
  file_type?: string;
  file_url?: string;
  video_thumbnail?: string;
  testimonial?: string;
  profile_image?: string;
  thumb?: string;
  video_type?: string;
  video_url?: string;
}
