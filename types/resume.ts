export interface ResumeRecord {
  id: string;
  userId: string;
  title?: string;
  originalText: string;
  upgradedText: string;
  style?: string;
  created_at: string; // ISO timestamp
}
