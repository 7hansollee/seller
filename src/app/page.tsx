'use client';

import Link from 'next/link';
import { Header } from '@/components/layout/header';
import { HeroSection } from '@/components/home/hero-section';
import { SearchBar } from '@/components/home/search-bar';
import { PostListSection } from '@/components/home/post-list-section';
import { Separator } from '@/components/ui/separator';
import { usePosts } from '@/features/posts/hooks/usePosts';

export default function Home() {
  // 최신 글 목록 가져오기
  const { data: recentPosts = [], isLoading: isLoadingRecent } = usePosts({
    limit: 10,
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  // 베스트 글 목록 가져오기 (베스트 점수 순)
  const { data: bestPosts = [], isLoading: isLoadingBest } = usePosts({
    limit: 10,
    orderBy: 'best_score',
    orderDirection: 'desc',
  });

  // 카테고리별 글 목록 가져오기
  const { data: sellerChatPosts = [], isLoading: isLoadingSellerChat } = usePosts({
    limit: 5,
    category: 'seller_chat',
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  const { data: stressPosts = [], isLoading: isLoadingStress } = usePosts({
    limit: 5,
    category: 'stress',
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  const { data: tipsPosts = [], isLoading: isLoadingTips } = usePosts({
    limit: 5,
    category: 'tips',
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  const { data: worryPosts = [], isLoading: isLoadingWorry } = usePosts({
    limit: 5,
    category: 'worry',
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <SearchBar />

        <Separator className="container mx-auto" />

        <div className="container mx-auto px-4 py-6 space-y-8">
          {/* 베스트 글 */}
          <div className="w-full lg:w-[57%] mx-auto">
            <PostListSection 
              type="best" 
              posts={bestPosts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                category: post.category,
                viewCount: post.view_count,
                likeCount: post.like_count,
                commentCount: post.comment_count,
                createdAt: new Date(post.created_at),
              }))} 
              isLoading={isLoadingBest}
            />
          </div>

          {/* 최신 글 */}
          <div className="w-full lg:w-[57%] mx-auto">
            <PostListSection 
              type="recent" 
              posts={recentPosts.map(post => ({
                id: post.id,
                title: post.title,
                content: post.content,
                category: post.category,
                viewCount: post.view_count,
                likeCount: post.like_count,
                commentCount: post.comment_count,
                createdAt: new Date(post.created_at),
              }))} 
              isLoading={isLoadingRecent}
            />
          </div>

          <Separator />

          {/* 카테고리별 섹션 */}
          <div className="w-full lg:w-[57%] mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* 셀러 잡담 */}
              <PostListSection 
                type="seller_chat" 
                posts={sellerChatPosts.map(post => ({
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  category: post.category,
                  viewCount: post.view_count,
                  likeCount: post.like_count,
                  commentCount: post.comment_count,
                  createdAt: new Date(post.created_at),
                }))} 
                isLoading={isLoadingSellerChat}
              />

              {/* 스트레스 */}
              <PostListSection 
                type="stress" 
                posts={stressPosts.map(post => ({
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  category: post.category,
                  viewCount: post.view_count,
                  likeCount: post.like_count,
                  commentCount: post.comment_count,
                  createdAt: new Date(post.created_at),
                }))} 
                isLoading={isLoadingStress}
              />

              {/* 팁 공유 */}
              <PostListSection 
                type="tips" 
                posts={tipsPosts.map(post => ({
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  category: post.category,
                  viewCount: post.view_count,
                  likeCount: post.like_count,
                  commentCount: post.comment_count,
                  createdAt: new Date(post.created_at),
                }))} 
                isLoading={isLoadingTips}
              />

              {/* 운영 고민 */}
              <PostListSection 
                type="worry" 
                posts={worryPosts.map(post => ({
                  id: post.id,
                  title: post.title,
                  content: post.content,
                  category: post.category,
                  viewCount: post.view_count,
                  likeCount: post.like_count,
                  commentCount: post.comment_count,
                  createdAt: new Date(post.created_at),
                }))} 
                isLoading={isLoadingWorry}
              />
            </div>
          </div>
        </div>
      </main>

      <footer className="border-t py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 나는 셀러. 1인 온라인 셀러들을 위한 익명 커뮤니티
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
