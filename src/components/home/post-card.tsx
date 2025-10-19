'use client';

import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Heart, MessageSquare, Eye } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { POST_CATEGORIES } from '@/features/posts/types';

interface PostCardProps {
  id: string;
  title: string;
  content?: string;
  category: string;
  viewCount: number;
  likeCount: number;
  commentCount: number;
  createdAt: Date;
}

export function PostCard({
  id,
  title,
  content,
  category,
  viewCount,
  likeCount,
  commentCount,
  createdAt,
}: PostCardProps) {
  const timeAgo = formatDistanceToNow(createdAt, { addSuffix: true, locale: ko });
  const categoryLabel = POST_CATEGORIES.find(c => c.value === category)?.label || category;

  return (
    <Link href={`/post/${id}`}>
      <Card className="hover:shadow-md transition-shadow duration-200 cursor-pointer group h-full flex flex-col">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between gap-2">
            <Badge variant="secondary" className="text-xs">
              {categoryLabel}
            </Badge>
            <span className="text-xs text-muted-foreground" suppressHydrationWarning>
              {timeAgo}
            </span>
          </div>
        </CardHeader>
        <CardContent className="pb-3 flex-1">
          <h3 className="text-lg font-semibold group-hover:text-primary transition-colors line-clamp-2 mb-2">
            {title}
          </h3>
          {content && (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {content}
            </p>
          )}
        </CardContent>
        <CardFooter className="pt-3 border-t">
          <div className="flex items-center gap-4 text-xs text-muted-foreground w-full">
            <div className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              <span>{viewCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <Heart className="w-4 h-4" />
              <span>{likeCount}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="w-4 h-4" />
              <span>{commentCount}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}

