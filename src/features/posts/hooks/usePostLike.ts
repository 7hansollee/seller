'use client';

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { togglePostLike, checkPostLike } from '../api';
import { useToast } from '@/hooks/use-toast';

// 좋아요 여부 확인 훅
export function usePostLike(postId: string) {
  return useQuery({
    queryKey: ['post-like', postId],
    queryFn: () => checkPostLike(postId),
    staleTime: 1000 * 60, // 1분간 캐시 유지
  });
}

// 좋아요 토글 훅
export function useTogglePostLike(postId: string) {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: () => togglePostLike(postId),
    onSuccess: (data) => {
      // 좋아요 상태 쿼리 업데이트
      queryClient.setQueryData(['post-like', postId], data.is_liked);
      
      // 게시글 상세 정보의 좋아요 수 업데이트
      queryClient.setQueryData(['post', postId], (oldData: any) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          like_count: data.new_like_count,
        };
      });

      // 게시글 목록의 해당 게시글 좋아요 수 업데이트
      queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData: any) => {
        if (!oldData) return oldData;
        return oldData.map((post: any) =>
          post.id === postId
            ? { ...post, like_count: data.new_like_count }
            : post
        );
      });

      toast({
        title: data.is_liked ? '공감했습니다 💙' : '공감을 취소했습니다',
        duration: 2000,
      });
    },
    onError: (error: any) => {
      toast({
        title: '오류가 발생했습니다',
        description: error.message || '좋아요 처리 중 문제가 발생했습니다.',
        variant: 'destructive',
        duration: 3000,
      });
    },
  });
}

