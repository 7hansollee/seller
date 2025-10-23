import { Metadata } from 'next';
import { getPostForMetadata } from '@/features/posts/server-api';
import { PostDetailClient } from './post-detail-client';
import { POST_CATEGORIES } from '@/features/posts/types';

interface PostDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PostDetailPageProps): Promise<Metadata> {
  const { id } = await params;
  const post = await getPostForMetadata(id);
  
  if (!post) {
    return {
      title: '게시글을 찾을 수 없습니다 - 나는 셀러',
      description: '요청하신 게시글을 찾을 수 없습니다.',
    };
  }

  const categoryLabel = POST_CATEGORIES.find((cat) => cat.value === post.category)?.label || post.category;
  const description = post.content.length > 160 
    ? `${post.content.slice(0, 160)}...` 
    : post.content;

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
          url: `/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(categoryLabel)}`,
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
      images: [`/api/og?title=${encodeURIComponent(post.title)}&description=${encodeURIComponent(categoryLabel)}`],
    },
  };
}

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;
  
  return <PostDetailClient postId={id} />;
}
