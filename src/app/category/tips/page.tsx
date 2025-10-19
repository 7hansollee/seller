'use client';

import { Header } from '@/components/layout/header';
import { PostCard } from '@/components/home/post-card';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Lightbulb } from 'lucide-react';
import { useState } from 'react';

export default function TipsPage() {
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 20;

  const { data: posts = [], isLoading } = usePosts({
    limit: POSTS_PER_PAGE,
    offset: (page - 1) * POSTS_PER_PAGE,
    category: 'tips',
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <div className="container mx-auto px-4 py-8">
          <div className="w-full lg:w-[85%] mx-auto">
            {/* 헤더 */}
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-3">
                <Lightbulb className="w-8 h-8 text-primary" />
                <h1 className="text-3xl font-bold">팁 공유</h1>
              </div>
              <p className="text-muted-foreground">
                유용한 노하우를 공유하는 공간입니다
              </p>
            </div>

            {/* 로딩 상태 */}
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
              </div>
            ) : posts.length > 0 ? (
              <>
                {/* 게시글 목록 - 2열 그리드 */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {posts.map((post) => (
                    <PostCard
                      key={post.id}
                      id={post.id}
                      title={post.title}
                      content={post.content}
                      category={post.category}
                      viewCount={post.view_count}
                      likeCount={post.like_count}
                      commentCount={post.comment_count}
                      createdAt={new Date(post.created_at)}
                    />
                  ))}
                </div>

                {/* 페이지네이션 */}
                <div className="flex justify-center mt-8 gap-2">
                  {page > 1 && (
                    <button
                      onClick={() => setPage(page - 1)}
                      className="px-4 py-2 rounded-md border bg-card hover:bg-accent transition-colors"
                    >
                      이전
                    </button>
                  )}
                  <span className="px-4 py-2 rounded-md border bg-card font-medium">
                    {page}
                  </span>
                  {posts.length === POSTS_PER_PAGE && (
                    <button
                      onClick={() => setPage(page + 1)}
                      className="px-4 py-2 rounded-md border bg-card hover:bg-accent transition-colors"
                    >
                      다음
                    </button>
                  )}
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Lightbulb className="w-16 h-16 text-muted-foreground mb-4" />
                <p className="text-lg text-muted-foreground mb-2">
                  아직 작성된 글이 없습니다
                </p>
                <p className="text-sm text-muted-foreground">
                  첫 번째 글을 작성해보세요!
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

