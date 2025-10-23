'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { SignUpForm } from '@/features/auth/components/signup-form';

export default function SignUpPage() {
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
          <CardTitle className="text-2xl font-bold text-center">회원가입</CardTitle>
          <CardDescription className="text-center">
            나는 셀러에 오신 것을 환영합니다
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignUpForm />
        </CardContent>
        <CardFooter className="flex flex-col space-y-2">
          <div className="text-sm text-muted-foreground text-center">
            이미 계정이 있으신가요?{' '}
            <Link href="/auth/login" className="text-primary hover:text-primary/80 font-medium">
              로그인
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}

