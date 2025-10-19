'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Search, Menu, LogOut, User } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, isAuthenticated, signOut, loading } = useAuth();
  const router = useRouter();
  const { toast } = useToast();

  // 디버깅용 콘솔 로그
  console.log('Header Debug:', { user, isAuthenticated, loading });
  
  // 로딩 중이거나 인증되지 않은 경우에만 로그인 버튼 표시
  const shouldShowLoginButtons = loading || !isAuthenticated;

  const handleSignOut = async () => {
    try {
      await signOut();
      toast({
        title: '로그아웃 완료',
        description: '안전하게 로그아웃되었습니다.',
      });
      router.push('/');
      router.refresh();
    } catch (error) {
      toast({
        title: '로그아웃 실패',
        description: '다시 시도해주세요.',
        variant: 'destructive',
      });
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-xl font-bold text-foreground">셀러상담소</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/best"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              베스트
            </Link>
            <Link
              href="/recent"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              최신
            </Link>
          </nav>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <Link href="/search" className="hidden md:block">
            <Button variant="ghost" size="icon">
              <Search className="h-5 w-5" />
            </Button>
          </Link>

          {!shouldShowLoginButtons ? (
            <>
              {isAuthenticated && user ? (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/write">
                    <Button className="bg-primary hover:bg-primary/90">글쓰기</Button>
                  </Link>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="relative h-9 w-9 rounded-full">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={user.avatar_url} alt={user.nickname} />
                          <AvatarFallback>{user.nickname.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>
                        <div className="flex flex-col space-y-1">
                          <p className="text-sm font-medium">{user.nickname}</p>
                          <p className="text-xs text-muted-foreground">{user.email}</p>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href="/profile" className="cursor-pointer">
                          <User className="mr-2 h-4 w-4" />
                          프로필
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer">
                        <LogOut className="mr-2 h-4 w-4" />
                        로그아웃
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              ) : (
                <div className="hidden md:flex items-center gap-2">
                  <Link href="/auth/login">
                    <Button variant="ghost">로그인</Button>
                  </Link>
                  <Link href="/auth/signup">
                    <Button>회원가입</Button>
                  </Link>
                </div>
              )}
            </>
          ) : (
            <div className="hidden md:flex items-center gap-2">
              <Link href="/auth/login">
                <Button variant="ghost">로그인</Button>
              </Link>
              <Link href="/auth/signup">
                <Button>회원가입</Button>
              </Link>
            </div>
          )}
        </div>
      </div>

      {isMenuOpen && (
        <div className="md:hidden border-t">
          <nav className="flex flex-col px-4 py-4 space-y-3">
            <Link
              href="/best"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              베스트
            </Link>
            <Link
              href="/recent"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              최신
            </Link>
            <Link
              href="/search"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              검색
            </Link>
            {!shouldShowLoginButtons ? (
              <div className="flex flex-col gap-2 pt-2">
                {isAuthenticated && user ? (
                  <>
                    <div className="flex items-center gap-2 px-2 py-2 border rounded-md">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar_url} alt={user.nickname} />
                        <AvatarFallback>{user.nickname.charAt(0).toUpperCase()}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">{user.nickname}</p>
                        <p className="text-xs text-muted-foreground">{user.email}</p>
                      </div>
                    </div>
                    <Link href="/write">
                      <Button className="w-full bg-primary hover:bg-primary/90">글쓰기</Button>
                    </Link>
                    <Link href="/profile">
                      <Button variant="outline" className="w-full">
                        프로필
                      </Button>
                    </Link>
                    <Button variant="outline" className="w-full" onClick={handleSignOut}>
                      로그아웃
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/auth/login">
                      <Button variant="outline" className="w-full">
                        로그인
                      </Button>
                    </Link>
                    <Link href="/auth/signup">
                      <Button className="w-full">회원가입</Button>
                    </Link>
                  </>
                )}
              </div>
            ) : (
              <div className="flex flex-col gap-2 pt-2">
                <Link href="/auth/login">
                  <Button variant="outline" className="w-full">
                    로그인
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button className="w-full">회원가입</Button>
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}