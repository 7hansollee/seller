'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignInForm } from '@/features/auth/components/signin-form';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative">
      <Link 
        href="/" 
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        <span className="text-xl font-bold text-foreground">나는 셀러</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">로그인</CardTitle>
          <CardDescription className="text-center">
            나는 셀러에 로그인하세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignInForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            계정이 없으신가요?{' '}
            <Link href="/auth/signup" className="text-primary hover:text-primary/80 font-medium">
              회원가입
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

