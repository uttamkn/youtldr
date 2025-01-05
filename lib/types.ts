export interface ApiKey {
  id: string;
  user_id: string;
  provider: string;
  api_key: string;
  created_at: string;
  updated_at: string;
}

export interface ApiKeyInput {
  provider: string;
  api_key: string;
}

export interface VideoSummary {
  id: string;
  user_id: string;
  video_url: string;
  video_title: string | null;
  summary: string | null;
  created_at: string;
  updated_at: string;
}
