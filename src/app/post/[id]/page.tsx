'use client';

import { use } from 'react';
import Link from 'next/link';
import { usePost } from '@/features/posts/hooks/usePost';
import { usePostLike, useTogglePostLike } from '@/features/posts/hooks/usePostLike';
import { Header } from '@/components/layout/header';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Heart, MessageSquare, Eye, Share2, AlertCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { POST_CATEGORIES } from '@/features/posts/types';
import { useRouter } from 'next/navigation';
import { maskNickname } from '@/lib/utils';
import { cn } from '@/lib/utils';
import { CommentForm } from '@/features/comments/components/comment-form';
import { CommentList } from '@/features/comments/components/comment-list';
import { useRef } from 'react';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export default function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = use(params);
  const { data: post, isLoading, isError } = usePost(id);
  const { data: isLiked = false } = usePostLike(id);
  const toggleLike = useTogglePostLike(id);
  const router = useRouter();
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const handleLikeClick = () => {
    toggleLike.mutate();
  };

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        </main>
      </div>
    );
  }

  if (isError || !post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
            <h2 className="text-2xl font-bold mb-2">게시글을 찾을 수 없습니다</h2>
            <p className="text-muted-foreground mb-6">
              삭제되었거나 존재하지 않는 게시글입니다.
            </p>
            <Button onClick={() => router.push('/')}>
              메인으로 돌아가기
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const categoryLabel =
    POST_CATEGORIES.find((cat) => cat.value === post.category)?.label || post.category;

  const timeAgo = formatDistanceToNow(new Date(post.created_at), {
    addSuffix: true,
    locale: ko,
  });

  const displayName = post.is_anonymous
    ? '익명'
    : maskNickname(post.profiles?.nickname || '알 수 없음');

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* 상단 네비게이션 */}
          <div className="mb-6">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-muted-foreground hover:text-foreground"
            >
              ← 목록으로
            </Button>
          </div>

          {/* 메인 콘텐츠 카드 */}
          <Card>
            <CardHeader className="space-y-4">
              {/* 카테고리 및 작성 시간 */}
              <div className="flex items-center justify-between gap-2">
                <Badge variant="secondary" className="text-sm">
                  {categoryLabel}
                </Badge>
                <span className="text-sm text-muted-foreground" suppressHydrationWarning>
                  {timeAgo}
                </span>
              </div>

              {/* 제목 */}
              <h1 className="text-3xl font-bold break-words">{post.title}</h1>

              {/* 작성자 정보 */}
              <div className="flex items-center gap-3">
                <Avatar className="w-10 h-10">
                  <AvatarFallback className="bg-primary/10 text-primary">
                    {displayName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="font-medium">{displayName}</span>
                  <span className="text-xs text-muted-foreground">
                    {post.is_anonymous && '익명으로 작성됨'}
                  </span>
                </div>
              </div>

              {/* 통계 정보 */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground pt-2">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>조회 {post.view_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Heart className="w-4 h-4" />
                  <span>공감 {post.like_count}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageSquare className="w-4 h-4" />
                  <span>댓글 {post.comment_count}</span>
                </div>
              </div>
            </CardHeader>

            <Separator />

            <CardContent className="py-8">
              {/* 본문 */}
              <div className="prose prose-neutral max-w-none">
                <div className="whitespace-pre-wrap break-words text-base leading-relaxed">
                  {post.content}
                </div>
              </div>
            </CardContent>

            <Separator />

            {/* 액션 버튼 */}
            <CardContent className="py-6">
              <div className="flex items-center justify-end gap-2">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  className={cn(
                    'gap-2 transition-all',
                    isLiked && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={handleLikeClick}
                  disabled={toggleLike.isPending}
                >
                  <Heart
                    className={cn('w-4 h-4 transition-all', isLiked && 'fill-current')}
                  />
                  {isLiked ? '공감함' : '공감하기'}
                </Button>
                <Button variant="outline" className="gap-2">
                  <Share2 className="w-4 h-4" />
                  공유하기
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* 댓글 영역 */}
          <div className="mt-8" ref={commentSectionRef}>
            <Card>
              <CardHeader>
                <h2 className="text-xl font-semibold">
                  댓글 {post.comment_count}개
                </h2>
              </CardHeader>
              <Separator />
              <CardContent className="py-6 space-y-6">
                <CommentForm postId={id} />
                <Separator />
                <CommentList postId={id} />
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* 푸터 */}
      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 셀러상담소. 온라인 셀러들을 위한 익명 커뮤니티
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
              <Link href="/about" className="hover:text-foreground transition-colors">
                서비스 소개
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

