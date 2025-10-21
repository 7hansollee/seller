'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { updatePassword } from '../api';
import { useToast } from '@/hooks/use-toast';

const resetPasswordSchema = z.object({
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .regex(/[0-9]/, '비밀번호에 숫자를 포함해야 합니다.')
    .regex(/[!@#$%^&*(),.?":{}|<>]/, '비밀번호에 특수문자를 포함해야 합니다.'),
  confirmPassword: z.string().min(1, '비밀번호 확인을 입력해주세요.'),
}).refine((data) => data.password === data.confirmPassword, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

function getPasswordStrength(password: string): { strength: number; label: string; color: string } {
  if (!password) {
    return { strength: 0, label: '', color: '' };
  }

  let strength = 0;
  
  // 길이 체크
  if (password.length >= 6) strength += 1;
  if (password.length >= 8) strength += 1;
  if (password.length >= 12) strength += 1;
  
  // 숫자 포함
  if (/[0-9]/.test(password)) strength += 1;
  
  // 소문자 포함
  if (/[a-z]/.test(password)) strength += 1;
  
  // 대문자 포함
  if (/[A-Z]/.test(password)) strength += 1;
  
  // 특수문자 포함
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) strength += 1;

  if (strength <= 2) {
    return { strength: 1, label: '약함', color: 'bg-red-500' };
  } else if (strength <= 4) {
    return { strength: 2, label: '보통', color: 'bg-yellow-500' };
  } else if (strength <= 5) {
    return { strength: 3, label: '강함', color: 'bg-green-500' };
  } else {
    return { strength: 4, label: '매우 강함', color: 'bg-green-600' };
  }
}

export function ResetPasswordForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [password, setPassword] = useState('');

  const passwordStrength = useMemo(() => getPasswordStrength(password), [password]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    setIsLoading(true);

    try {
      await updatePassword(data.password);

      toast({
        title: '비밀번호 변경 완료',
        description: '비밀번호가 성공적으로 변경되었습니다. 새 비밀번호로 로그인해주세요.',
      });

      router.push('/auth/login');
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : '비밀번호 변경에 실패했습니다.';
      
      toast({
        title: '비밀번호 변경 실패',
        description: errorMessage,
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="password">새 비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="새 비밀번호를 입력하세요"
          {...register('password', {
            onChange: (e) => setPassword(e.target.value),
          })}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
        
        {/* 비밀번호 강도 표시 */}
        {password && (
          <div className="space-y-2">
            <div className="flex gap-1">
              {[1, 2, 3, 4].map((level) => (
                <div
                  key={level}
                  className={`h-1 flex-1 rounded ${
                    level <= passwordStrength.strength
                      ? passwordStrength.color
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <p className="text-xs text-muted-foreground">
              비밀번호 강도: <span className="font-medium">{passwordStrength.label}</span>
            </p>
          </div>
        )}
        
        <p className="text-xs text-muted-foreground">
          • 최소 6자 이상<br />
          • 숫자 포함<br />
          • 특수문자 포함
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword">새 비밀번호 확인</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="새 비밀번호를 다시 입력하세요"
          {...register('confirmPassword')}
          disabled={isLoading}
        />
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? '처리중...' : '비밀번호 변경'}
      </Button>
    </form>
  );
}

