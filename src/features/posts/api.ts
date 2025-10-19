import { createClient } from '@/lib/supabase/client';

export interface CreatePostData {
  title: string;
  content: string;
  category: string;
  isAnonymous: boolean;
}

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

export async function createPost(data: CreatePostData) {
  const supabase = createClient();
  
  // 현재 로그인한 사용자 정보 가져오기
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const { data: result, error } = await supabase
    .from('posts')
    .insert({
      title: data.title,
      content: data.content,
      category: data.category,
      is_anonymous: data.isAnonymous,
      author_id: user.id,
    })
    .select()
    .single();

  if (error) {
    throw new Error(`글 작성 실패: ${error.message}`);
  }

  return result;
}

export async function getPosts(options?: {
  category?: string;
  limit?: number;
  offset?: number;
  orderBy?: 'created_at' | 'like_count' | 'view_count' | 'best_score';
  orderDirection?: 'asc' | 'desc';
  searchKeyword?: string;
}) {
  const supabase = createClient();
  
  let query = supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (
        nickname,
        avatar_url
      )
    `)
    .eq('is_published', true);

  if (options?.category) {
    query = query.eq('category', options.category);
  }

  if (options?.searchKeyword) {
    query = query.or(`title.ilike.%${options.searchKeyword}%,content.ilike.%${options.searchKeyword}%`);
  }

  if (options?.orderBy) {
    query = query.order(options.orderBy, { 
      ascending: options.orderDirection === 'asc' 
    });
  } else {
    query = query.order('created_at', { ascending: false });
  }

  if (options?.limit) {
    query = query.limit(options.limit);
  }

  if (options?.offset) {
    query = query.range(options.offset, options.offset + (options.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) {
    throw new Error(`글 목록 조회 실패: ${error.message}`);
  }

  return data as Post[];
}

export async function getPost(id: string) {
  const supabase = createClient();
  
  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles:author_id (
        nickname,
        avatar_url
      )
    `)
    .eq('id', id)
    .eq('is_published', true)
    .single();

  if (error) {
    throw new Error(`글 조회 실패: ${error.message}`);
  }

  return data as Post;
}

export async function updatePost(id: string, data: Partial<CreatePostData>) {
  const supabase = createClient();
  
  const { data: result, error } = await supabase
    .from('posts')
    .update({
      title: data.title,
      content: data.content,
      category: data.category,
      is_anonymous: data.isAnonymous,
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw new Error(`글 수정 실패: ${error.message}`);
  }

  return result;
}

export async function deletePost(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id);

  if (error) {
    throw new Error(`글 삭제 실패: ${error.message}`);
  }
}

export async function incrementViewCount(id: string) {
  const supabase = createClient();
  
  const { error } = await supabase.rpc('increment_view_count', {
    post_id: id
  });

  if (error) {
    console.error('조회수 증가 실패:', error);
  }
}

// 좋아요 토글 (추가/삭제)
export async function togglePostLike(postId: string) {
  const supabase = createClient();
  
  // 현재 로그인한 사용자 정보 가져오기
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }
  
  const { data, error } = await supabase.rpc('toggle_post_like', {
    p_post_id: postId,
    p_user_id: user.id
  });

  if (error) {
    throw new Error(`좋아요 처리 실패: ${error.message}`);
  }

  return data[0] as { is_liked: boolean; new_like_count: number };
}

// 현재 사용자의 좋아요 여부 확인
export async function checkPostLike(postId: string) {
  const supabase = createClient();
  
  // 현재 로그인한 사용자 정보 가져오기
  const { data: { user }, error: authError } = await supabase.auth.getUser();
  
  if (authError || !user) {
    return false; // 로그인하지 않은 경우 false 반환
  }
  
  const { data, error } = await supabase.rpc('check_post_like', {
    p_post_id: postId,
    p_user_id: user.id
  });

  if (error) {
    console.error('좋아요 확인 실패:', error);
    return false;
  }

  return data as boolean;
}
