'use client';

import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ResetPasswordForm } from '@/features/auth/components/reset-password-form';

export default function ResetPasswordPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4 py-12 relative">
      <Link 
        href="/" 
        className="absolute top-4 left-4 md:top-6 md:left-6 flex items-center space-x-2 hover:opacity-80 transition-opacity"
      >
        <span className="text-xl font-bold text-foreground">셀러상담소</span>
      </Link>
      
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">비밀번호 재설정</CardTitle>
          <CardDescription className="text-center">
            새로운 비밀번호를 입력해주세요
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

