'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageSquare, TrendingUp } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="w-full py-8 md:py-12 bg-gradient-to-b from-secondary to-background">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="space-y-3">
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight text-foreground">
              1인 온라인 셀러만의 익명 커뮤니티
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              1인 온라인 셀러가 아니라면 공감하지 못할<br />
              이야기를 나누고 공감과 위로를 받아가세요.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Link href="/best">
              <Button size="lg" className="gap-2">
                <TrendingUp className="w-5 h-5" />
                베스트 글 보기
              </Button>
            </Link>
            <Link href="/write">
              <Button size="lg" variant="outline" className="gap-2">
                <MessageSquare className="w-5 h-5" />
                글 작성하기
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 w-full max-w-3xl">
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
              <div className="text-3xl font-bold text-primary mb-2">익명성</div>
              <p className="text-sm text-muted-foreground text-center">
                닉네임으로 부담 없이<br />
                쇼핑몰 이야기를 나눠보세요.
              </p>
            </div>
            <div className="flex flex-col items-center p-6 rounded-lg bg-card border">
              <div className="text-3xl font-bold text-primary mb-2">공감</div>
              <p className="text-sm text-muted-foreground text-center">
                비슷한 상황의 셀러들과 소통하세요
              </p>
            </div>
            <div className="flex flex-col items-center px-4 py-6 rounded-lg bg-card border">
              <div className="text-3xl font-bold text-primary mb-2">정보공유</div>
              <p className="text-sm text-muted-foreground text-center">
                현실적인 정보와 조언을 주고 받으며<br />
                함께 매출을 성장시켜보세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

