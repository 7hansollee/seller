import 'server-only';
import { createClient } from '@/lib/supabase/server';

// 서버 컴포넌트용 getPost (메타데이터 생성용)
export async function getPostForMetadata(id: string) {
  try {
    const supabase = await createClient();
    
    // RLS 정책을 우회하기 위해 service role을 사용
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        category,
        created_at,
        like_count,
        comment_count
      `)
      .eq('id', id)
      .eq('is_published', true)
      .maybeSingle(); // single() 대신 maybeSingle() 사용하여 not found 에러를 방지

    if (error) {
      console.error('[getPostForMetadata] 게시글 조회 오류:', {
        postId: id,
        error: error.message,
        code: error.code,
        details: error.details,
        hint: error.hint,
      });
      return null;
    }

    if (!data) {
      console.warn('[getPostForMetadata] 게시글을 찾을 수 없음:', id);
      return null;
    }

    return data;
  } catch (error) {
    console.error('[getPostForMetadata] 메타데이터 생성 오류:', {
      postId: id,
      error: error instanceof Error ? error.message : String(error),
      stack: error instanceof Error ? error.stack : undefined,
    });
    return null;
  }
}

