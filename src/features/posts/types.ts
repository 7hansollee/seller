export interface Post {
  id: string;
  title: string;
  content: string;
  author_id: string;
  category: string;
  is_anonymous: boolean;
  view_count: number;
  like_count: number;
  comment_count: number;
  best_score: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  profiles?: {
    nickname: string;
    avatar_url?: string;
  };
}

export interface CreatePostData {
  title: string;
  content: string;
  category: string;
  isAnonymous: boolean;
}

export interface PostFilters {
  category?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'like_count' | 'view_count' | 'best_score';
  orderDirection?: 'asc' | 'desc';
  searchKeyword?: string;
}

export type PostCategory = 
  | 'seller_chat'
  | 'stress'
  | 'tips'
  | 'worry';

export const POST_CATEGORIES: { value: PostCategory; label: string }[] = [
  { value: 'seller_chat', label: '셀러 잡담' },
  { value: 'stress', label: '스트레스' },
  { value: 'tips', label: '팁 공유' },
  { value: 'worry', label: '운영 고민' },
];
