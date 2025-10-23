import 'server-only';
import { createClient } from '@/lib/supabase/server';

// 서버 컴포넌트용 getPost (메타데이터 생성용)
export async function getPostForMetadata(id: string) {
  try {
    const supabase = await createClient();
    
    const { data, error } = await supabase
      .from('posts')
      .select(`
        id,
        title,
        content,
        category,
        created_at
      `)
      .eq('id', id)
      .eq('is_published', true)
      .single();

    if (error) {
      console.error('게시글 조회 오류:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('메타데이터 생성 오류:', error);
    return null;
  }
}

