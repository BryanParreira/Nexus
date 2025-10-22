// types/social.ts
export type PostStatus = "scheduled" | "published" | "draft" | "failed";
export type Platform = "twitter" | "facebook" | "linkedin" | "instagram";

export interface SocialPost {
  id: string;
  content: string;
  platforms: Platform[];
  status: PostStatus;
  scheduledFor?: string;
  publishedAt?: string;
  image?: string;
  metrics?: {
    impressions: number;
    engagement: number;
    clicks: number;
  };
  author: {
    name: string;
    avatar: string;
  };
}