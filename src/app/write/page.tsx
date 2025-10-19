'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Send } from 'lucide-react';
import Link from 'next/link';
import { useCreatePost } from '@/features/posts/hooks/usePosts';
import { Header } from '@/components/layout/header';

export default function WritePage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('seller_chat');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { user, isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  const createPostMutation = useCreatePost();

  // 로그인하지 않은 사용자는 로그인 페이지로 리다이렉트
  // loading이 끝난 후 일정 시간을 기다려서 리다이렉트
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      // 약간의 지연을 두어 auth state가 안정화될 시간을 줌
      const timeoutId = setTimeout(() => {
        if (!isAuthenticated) {
          console.log('WritePage: Redirecting to login - not authenticated');
          router.push('/auth/login');
        }
      }, 300); // 300ms 대기

      return () => clearTimeout(timeoutId);
    }
  }, [loading, isAuthenticated, router]);

  // 로딩 중일 때는 로딩 상태 표시
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">로딩 중...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 인증되지 않은 경우 렌더링하지 않음 (리다이렉트 처리 중)
  if (!isAuthenticated) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      toast({
        title: '입력 오류',
        description: '제목과 내용을 모두 입력해주세요.',
        variant: 'destructive',
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await createPostMutation.mutateAsync({
        title: title.trim(),
        content: content.trim(),
        category,
        isAnonymous: false,
      });

      toast({
        title: '글 작성 완료',
        description: '글이 성공적으로 작성되었습니다.',
      });

      router.push('/');
    } catch (error) {
      console.error('글 작성 실패:', error);
      toast({
        title: '글 작성 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 max-w-4xl flex-1">
      <div className="mb-6">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" />
          홈으로 돌아가기
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">글 작성하기</CardTitle>
          <p className="text-muted-foreground">
            안전하게 이야기를 나누고 공감받아보세요
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">제목 *</Label>
              <Input
                id="title"
                placeholder="제목을 입력해주세요"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                maxLength={255}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">카테고리</Label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="카테고리를 선택해주세요" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="seller_chat">셀러 잡담</SelectItem>
                  <SelectItem value="stress">스트레스</SelectItem>
                  <SelectItem value="tips">팁 공유</SelectItem>
                  <SelectItem value="management_worry">운영 고민</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">내용 *</Label>
              <Textarea
                id="content"
                placeholder="내용을 자세히 작성해주세요. 구체적인 상황과 감정을 표현하면 더 좋은 조언을 받을 수 있습니다."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                required
              />
            </div>

            <div className="flex gap-3 pt-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex-1"
              >
                {isSubmitting ? (
                  '작성 중...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    글 작성하기
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                disabled={isSubmitting}
              >
                취소
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      </div>
    </div>
  );
}
