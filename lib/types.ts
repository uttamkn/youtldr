export interface VideoSummary {
  description: String;
  id: String;
  summary: String;
  title: String;
  youtubeUrl: String;
  error: String;
}

export interface UserHistory {
  id: string;
  userId: string;
  youtubeUrl: string;
  videoId: string;
  summary: string;
  title: string;
  description: string;
}
