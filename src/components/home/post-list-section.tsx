'use client';

import Link from 'next/link';
import { TrendingUp, Clock, MessageCircle, Flame, HelpCircle, Lightbulb, Heart, MessageSquare, Eye, ChevronRight, Info } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface Post {
  id: string;
  title: string;
  content: string;
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}

interface PostListSectionProps {
  type: 'best' | 'recent' | 'seller_chat' | 'stress' | 'tips' | 'worry';
  posts: Post[];
  isLoading?: boolean;
}

const SECTION_CONFIG = {
  best: {
    title: '베스트 글',
    description: '많은 공감을 받은 인기 글입니다',
    icon: TrendingUp,
  },
  recent: {
    title: '최신 글',
    description: '방금 올라온 따끈따끈한 글입니다',
    icon: Clock,
  },
  seller_chat: {
    title: '셀러 잡담',
    description: '셀러들의 자유로운 수다 공간입니다',
    icon: MessageCircle,
  },
  stress: {
    title: '스트레스',
    description: '힘든 마음을 나누는 공간입니다',
    icon: Flame,
  },
  tips: {
    title: '팁 공유',
    description: '유용한 노하우를 공유하는 공간입니다',
    icon: Lightbulb,
  },
  worry: {
    title: '운영 고민',
    description: '셀러 생활의 고민을 나누는 공간입니다',
    icon: HelpCircle,
  },
};

export function PostListSection({ type, posts, isLoading = false }: PostListSectionProps) {
  const config = SECTION_CONFIG[type];
  const Icon = config.icon;
  const isBestSection = type === 'best';
  const isRecentSection = type === 'recent';
  const isCategorySection = !isBestSection && !isRecentSection;

  // 더보기 링크 URL 설정
  const getMoreLink = () => {
    if (type === 'best') return '/best';
    if (type === 'recent') return '/recent';
    return `/category/${type}`;
  };

  return (
    <section className="w-full py-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Icon className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">{config.title}</h2>
            {isCategorySection && (
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button className="inline-flex items-center justify-center w-5 h-5 rounded-full text-muted-foreground hover:text-primary transition-colors">
                      <HelpCircle className="w-4 h-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">{config.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            )}
          </div>
          <Link 
            href={getMoreLink()}
            className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            더보기
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {isBestSection && (
          <p className="text-sm text-muted-foreground">
            {config.description}
          </p>
        )}
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : posts.length > 0 ? (
        isBestSection ? (
          <div className="space-y-1.5">
            {posts.slice(0, 10).map((post, index) => (
              <Link 
                key={post.id} 
                href={`/post/${post.id}`}
                className="block group"
              >
                <div className="flex items-center gap-2.5 p-3 rounded-lg border bg-card hover:shadow-md hover:bg-accent/30 transition-all duration-100">
                  <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-full bg-primary/10 text-primary font-bold text-sm">
                    {index + 1}
                  </span>
                  <h3 className="flex-1 font-medium group-hover:text-primary transition-colors duration-100 line-clamp-1">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Heart className="w-4 h-4" />
                      <span>{post.likeCount}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="w-4 h-4" />
                      <span>{post.commentCount}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {posts.slice(0, isRecentSection ? 10 : 5).map((post) => (
              <Link 
                key={post.id} 
                href={`/post/${post.id}`}
                className="block group"
              >
                <div className="flex items-center justify-between py-2 hover:bg-accent/50 transition-colors rounded px-2">
                  <h3 className="flex-1 text-sm font-medium group-hover:text-primary transition-colors line-clamp-1 pr-4">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                    <Eye className="w-3.5 h-3.5" />
                    <span>{post.viewCount}</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-muted-foreground">
            아직 작성된 글이 없습니다
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            첫 번째 글을 작성해보세요!
          </p>
        </div>
      )}
    </section>
  );
}

