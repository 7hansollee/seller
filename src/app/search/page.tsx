'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Header } from '@/components/layout/header';
import { SearchBar } from '@/components/home/search-bar';
import { PostCard } from '@/components/home/post-card';
import { usePosts } from '@/features/posts/hooks/usePosts';
import { Search } from 'lucide-react';

function SearchResults() {
  const searchParams = useSearchParams();
  const keyword = searchParams.get('q') || '';

  const { data: searchResults = [], isLoading } = usePosts({
    searchKeyword: keyword,
    orderBy: 'created_at',
    orderDirection: 'desc',
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-primary" />
          <h1 className="text-2xl font-bold">
            검색 결과
          </h1>
        </div>
        <p className="text-muted-foreground">
          &apos;{keyword}&apos; 검색 결과 {searchResults.length}건
        </p>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : searchResults.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {searchResults.map((post) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-muted flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold mb-2">
            검색 결과가 없습니다
          </h3>
          <p className="text-muted-foreground mb-6">
            &apos;{keyword}&apos;에 대한 검색 결과를 찾을 수 없습니다.
          </p>
          <p className="text-sm text-muted-foreground">
            다른 키워드로 검색해보세요.
          </p>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <SearchBar />

        <Suspense fallback={
          <div className="container mx-auto px-4 py-8">
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          </div>
        }>
          <SearchResults />
        </Suspense>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 나는 셀러. 온라인 셀러들을 위한 익명 커뮤니티
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

