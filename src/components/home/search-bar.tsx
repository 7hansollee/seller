'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

export function SearchBar() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (keyword.trim()) {
      router.push(`/search?q=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <section className="w-full py-4 bg-background">
      <div className="container mx-auto px-4">
        <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="키워드로 검색해보세요... (예: 리뷰테러, 배송지연, 매출하락)"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              className="pl-10 pr-24 h-12 text-base"
            />
            <Button
              type="submit"
              className="absolute right-1 top-1/2 -translate-y-1/2 h-10"
            >
              검색
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}

