'use client';

import { createClient } from '@/lib/supabase/client';
import type { Comment, CreateCommentData } from './types';

export async function createComment(data: CreateCommentData): Promise<Comment> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { data: result, error } = await supabase
    .from('comments')
    .insert({
      post_id: data.post_id,
      content: data.content,
      is_anonymous: data.is_anonymous ?? false,
      author_id: user.id,
    })
    .select(
      `
      *,
      profiles:author_id (
        nickname,
        avatar_url
      )
    `
    )
    .single();

  if (error) {
    throw new Error(`댓글 작성 실패: ${error.message}`);
  }

  return result;
}

export async function getComments(postId: string): Promise<Comment[]> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('comments')
    .select(
      `
      *,
      profiles:author_id (
        nickname,
        avatar_url
      )
    `
    )
    .eq('post_id', postId)
    .order('created_at', { ascending: true });

  if (error) {
    throw new Error(`댓글 조회 실패: ${error.message}`);
  }

  return data || [];
}

export async function deleteComment(commentId: string): Promise<void> {
  const supabase = createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    throw new Error('로그인이 필요합니다.');
  }

  const { error } = await supabase.from('comments').delete().eq('id', commentId).eq('author_id', user.id);

  if (error) {
    throw new Error(`댓글 삭제 실패: ${error.message}`);
  }
}

