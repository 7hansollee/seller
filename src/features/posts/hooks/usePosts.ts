import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { createPost, getPosts, getPost, updatePost, deletePost, incrementViewCount } from '../api';
import { CreatePostData, PostFilters } from '../types';

export function usePosts(filters?: PostFilters) {
  return useQuery({
    queryKey: ['posts', filters],
    queryFn: () => getPosts(filters),
    staleTime: 5 * 60 * 1000, // 5분
  });
}

export function usePost(id: string) {
  return useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5분
  });
}

export function useCreatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createPost,
    onSuccess: () => {
      // 글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useUpdatePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<CreatePostData> }) =>
      updatePost(id, data),
    onSuccess: (_, { id }) => {
      // 해당 글과 글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['post', id] });
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useDeletePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePost,
    onSuccess: () => {
      // 글 목록 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['posts'] });
    },
  });
}

export function useIncrementViewCount() {
  return useMutation({
    mutationFn: incrementViewCount,
  });
}
