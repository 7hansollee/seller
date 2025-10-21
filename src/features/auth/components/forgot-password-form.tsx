'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { requestPasswordReset } from '../api';
import { useToast } from '@/hooks/use-toast';

const forgotPasswordSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

export function ForgotPasswordForm() {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);

    try {
      await requestPasswordReset(data.email);

      setIsSuccess(true);
      toast({
        title: '이메일 발송 완료',
        description: '비밀번호 재설정 링크가 이메일로 전송되었습니다. 이메일을 확인해주세요.',
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '이메일 발송에 실패했습니다.';
      
      toast({
        title: '이메일 발송 실패',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="text-center space-y-4">
        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">
            비밀번호 재설정 링크가 이메일로 전송되었습니다.
            <br />
            이메일을 확인하여 비밀번호를 재설정해주세요.
          </p>
        </div>
        <p className="text-sm text-muted-foreground">
          이메일이 도착하지 않았나요? 스팸 폴더를 확인해주세요.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          type="email"
          placeholder="example@email.com"
          {...register('email')}
          disabled={isLoading}
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
        <p className="text-sm text-muted-foreground">
          가입 시 사용한 이메일 주소를 입력하세요. 비밀번호 재설정 링크를 보내드립니다.
        </p>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? '처리중...' : '비밀번호 재설정 이메일 발송'}
      </Button>
    </form>
  );
}

