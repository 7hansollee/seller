'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useCreateComment } from '../hooks/useComments';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';

interface CommentFormProps {
  postId: string;
}

export function CommentForm({ postId }: CommentFormProps) {
  const [content, setContent] = useState('');
  const { user, isAuthenticated } = useAuth();
  const createComment = useCreateComment(postId);
  const { toast } = useToast();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAuthenticated) {
      toast({
        title: '로그인이 필요합니다',
        description: '댓글을 작성하려면 로그인해주세요.',
        variant: 'destructive',
      });
      router.push('/auth/login');
      return;
    }

    if (!content.trim()) {
      toast({
        title: '입력 오류',
        description: '댓글 내용을 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    try {
      await createComment.mutateAsync({
        content: content.trim(),
        is_anonymous: false,
      });

      setContent('');
      toast({
        title: '댓글 작성 완료',
        description: '댓글이 성공적으로 작성되었습니다.',
      });
    } catch (error) {
      console.error('댓글 작성 실패:', error);
      toast({
        title: '댓글 작성 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Textarea
        placeholder={
          isAuthenticated
            ? '댓글을 입력하세요...'
            : '로그인 후 댓글을 작성할 수 있습니다.'
        }
        value={content}
        onChange={(e) => setContent(e.target.value)}
        disabled={!isAuthenticated || createComment.isPending}
        className="min-h-[100px] resize-none"
      />
      <div className="flex justify-end">
        <Button type="submit" disabled={!isAuthenticated || createComment.isPending || !content.trim()}>
          {createComment.isPending ? '작성 중...' : '댓글 작성'}
        </Button>
      </div>
    </form>
  );
}

