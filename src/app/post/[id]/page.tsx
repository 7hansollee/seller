import { Metadata } from 'next';
import { getPostForMetadata } from '@/features/posts/server-api';
import { PostDetailClient } from './post-detail-client';
import { POST_CATEGORIES } from '@/features/posts/types';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  try {
    const { id } = await params;
    const post = await getPostForMetadata(id);
    
    if (!post) {
      console.warn(`[generateMetadata] 포스트 조회 실패 - ID: ${id}`);
      return {
        title: '게시글 - 나는 셀러',
        description: '온라인 셀러들을 위한 익명 커뮤니티',
      };
    }

    const categoryLabel = POST_CATEGORIES.find((cat) => cat.value === post.category)?.label || post.category;
    const description = post.content.length > 160 
      ? `${post.content.slice(0, 160)}...` 
      : post.content;

    // 캐싱 방지를 위해 timestamp 추가
    const timestamp = new Date().getTime();
    const ogImageUrl = `/api/og?${new URLSearchParams({
      title: post.title,
      category: categoryLabel,
      content: post.content.slice(0, 200),
      likeCount: String(post.like_count || 0),
      commentCount: String(post.comment_count || 0),
      t: String(timestamp), // 캐시 버스팅
    }).toString()}`;

    return {
      title: `${post.title} - 나는 셀러`,
      description: description,
      openGraph: {
        title: post.title,
        description: description,
        type: 'article',
        publishedTime: post.created_at,
        authors: ['나는 셀러'],
        section: categoryLabel,
        images: [
          {
            url: ogImageUrl,
            width: 1200,
            height: 630,
            alt: post.title,
          },
        ],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: description,
        images: [ogImageUrl],
      },
    };
  } catch (error) {
    console.error('[generateMetadata] 메타데이터 생성 중 오류:', error);
    return {
      title: '게시글 - 나는 셀러',
      description: '온라인 셀러들을 위한 익명 커뮤니티',
    };
  }
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  
  return <PostDetailClient postId={id} />;
}
