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
  description: String;
  id: String;
  summary: String;
  title: String;
  youtubeUrl: String;
}
