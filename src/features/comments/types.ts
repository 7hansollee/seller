export interface Comment {
  id: string;
  post_id: string;
  author_id: string;
  content: string;
  is_anonymous: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    nickname: string;
    avatar_url?: string;
  };
}

export interface CreateCommentData {
  post_id: string;
  content: string;
  is_anonymous?: boolean;
}

