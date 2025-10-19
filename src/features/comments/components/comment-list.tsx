'use client';

import { useComments, useDeleteComment } from '../hooks/useComments';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Trash2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { maskNickname } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface CommentListProps {
  postId: string;
}

export function CommentList({ postId }: CommentListProps) {
  const { data: comments, isLoading, isError } = useComments(postId);
  const { user } = useAuth();
  const deleteComment = useDeleteComment(postId);
  const { toast } = useToast();

  const handleDelete = async (commentId: string) => {
    if (!window.confirm('댓글을 삭제하시겠습니까?')) {
      return;
    }

    try {
      await deleteComment.mutateAsync(commentId);
      toast({
        title: '댓글 삭제 완료',
        description: '댓글이 삭제되었습니다.',
      });
    } catch (error) {
      console.error('댓글 삭제 실패:', error);
      toast({
        title: '댓글 삭제 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center">
        <AlertCircle className="w-12 h-12 text-muted-foreground mb-2" />
        <p className="text-muted-foreground">댓글을 불러오는데 실패했습니다.</p>
      </div>
    );
  }

  if (!comments || comments.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        첫 댓글을 작성해보세요!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {comments.map((comment, index) => {
        const displayName = comment.is_anonymous
          ? '익명'
          : maskNickname(comment.profiles?.nickname || '알 수 없음');

        const timeAgo = formatDistanceToNow(new Date(comment.created_at), {
          addSuffix: true,
          locale: ko,
        });

        const isAuthor = user?.id === comment.author_id;

        return (
          <div key={comment.id}>
            {index > 0 && <Separator className="mb-6" />}
            <div className="space-y-3">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-3 flex-1">
                  <Avatar className="w-10 h-10 flex-shrink-0">
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {displayName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium">{displayName}</span>
                      <span
                        className="text-xs text-muted-foreground"
                        suppressHydrationWarning
                      >
                        {timeAgo}
                      </span>
                    </div>
                    <p className="text-sm text-foreground whitespace-pre-wrap break-words">
                      {comment.content}
                    </p>
                  </div>
                </div>
                {isAuthor && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="flex-shrink-0"
                    onClick={() => handleDelete(comment.id)}
                    disabled={deleteComment.isPending}
                  >
                    <Trash2 className="w-4 h-4 text-muted-foreground hover:text-destructive" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

