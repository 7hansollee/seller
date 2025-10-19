'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { signUp } from '../api';
import { useToast } from '@/hooks/use-toast';

const signUpSchema = z.object({
  email: z.string().email('올바른 이메일 주소를 입력해주세요.'),
  password: z
    .string()
    .min(6, '비밀번호는 최소 6자 이상이어야 합니다.')
    .max(100, '비밀번호는 최대 100자까지 가능합니다.'),
  passwordConfirm: z.string(),
  nickname: z
    .string()
    .min(2, '닉네임은 최소 2자 이상이어야 합니다.')
    .max(20, '닉네임은 최대 20자까지 가능합니다.'),
  seller_experience: z
    .string()
    .min(1, '온라인 셀러 경력을 입력해주세요.'),
  online_platforms: z
    .array(z.string())
    .min(1, '최소 하나의 온라인 판매처를 선택해주세요.'),
  expectations: z
    .string()
    .min(5, '기대사항은 최소 5자 이상 입력해주세요.')
    .max(500, '기대사항은 최대 500자까지 가능합니다.'),
}).refine((data) => data.password === data.passwordConfirm, {
  message: '비밀번호가 일치하지 않습니다.',
  path: ['passwordConfirm'],
});

type SignUpFormData = z.infer<typeof signUpSchema>;

export function SignUpForm() {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);

  const platformOptions = [
    '쿠팡',
    '네이버 스마트스토어',
    '11번가',
    'G마켓',
    '옥션',
    '인터파크',
    '위메프',
    '티몬',
    '라쿠텐',
    '아마존',
    '이베이',
    '기타',
  ];


  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: zodResolver(signUpSchema),
    mode: 'onChange', // 실시간 유효성 검사 활성화
    defaultValues: {
      online_platforms: [],
    },
  });

  // 비밀번호와 비밀번호 확인 실시간 비교를 위한 watch
  const password = watch('password');
  const passwordConfirm = watch('passwordConfirm');

  const handlePlatformChange = (platform: string) => {
    const newPlatforms = selectedPlatforms.includes(platform)
      ? selectedPlatforms.filter((p) => p !== platform)
      : [...selectedPlatforms, platform];
    
    setSelectedPlatforms(newPlatforms);
    setValue('online_platforms', newPlatforms);
  };

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);

    try {
      await signUp({
        email: data.email,
        password: data.password,
        nickname: data.nickname,
        seller_experience: data.seller_experience,
        online_platforms: data.online_platforms,
        expectations: data.expectations,
      });

      toast({
        title: '회원가입 완료',
        description: '환영합니다! 셀러상담소에 오신 것을 환영합니다.',
      });

      router.push('/');
    } catch (error) {
      toast({
        title: '회원가입 실패',
        description: error instanceof Error ? error.message : '회원가입에 실패했습니다.',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

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
      </div>

      <div className="space-y-2">
        <Label htmlFor="nickname">닉네임</Label>
        <Input
          id="nickname"
          type="text"
          placeholder="닉네임을 입력하세요"
          {...register('nickname')}
          disabled={isLoading}
        />
        {errors.nickname && (
          <p className="text-sm text-destructive">{errors.nickname.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">비밀번호</Label>
        <Input
          id="password"
          type="password"
          placeholder="비밀번호를 입력하세요 (최소 6자)"
          {...register('password')}
          disabled={isLoading}
        />
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
        {!errors.password && password && password.length < 6 && (
          <p className="text-sm text-muted-foreground">
            비밀번호는 최소 6자 이상이어야 합니다. (현재: {password.length}자)
          </p>
        )}
        {!errors.password && password && password.length >= 6 && (
          <p className="text-sm text-green-600">
            ✓ 사용 가능한 비밀번호입니다.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="passwordConfirm">비밀번호 확인</Label>
        <Input
          id="passwordConfirm"
          type="password"
          placeholder="비밀번호를 다시 입력하세요"
          {...register('passwordConfirm')}
          disabled={isLoading}
        />
        {errors.passwordConfirm && (
          <p className="text-sm text-destructive">{errors.passwordConfirm.message}</p>
        )}
        {!errors.passwordConfirm && passwordConfirm && password && passwordConfirm !== password && (
          <p className="text-sm text-destructive">
            비밀번호가 일치하지 않습니다.
          </p>
        )}
        {!errors.passwordConfirm && passwordConfirm && password && passwordConfirm === password && passwordConfirm.length > 0 && (
          <p className="text-sm text-green-600">
            ✓ 비밀번호가 일치합니다.
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="seller_experience">온라인 셀러 경력</Label>
        <Input
          id="seller_experience"
          type="text"
          placeholder="예: 3년, 5년, 1년 미만 등"
          {...register('seller_experience')}
          disabled={isLoading}
        />
        {errors.seller_experience && (
          <p className="text-sm text-destructive">{errors.seller_experience.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label>온라인 판매처</Label>
        <div className="grid grid-cols-2 gap-2">
          {platformOptions.map((platform) => (
            <div key={platform} className="flex items-center space-x-2">
              <input
                type="checkbox"
                id={platform}
                checked={selectedPlatforms.includes(platform)}
                onChange={() => handlePlatformChange(platform)}
                disabled={isLoading}
                className="rounded border-gray-300"
              />
              <Label htmlFor={platform} className="text-sm font-normal">
                {platform}
              </Label>
            </div>
          ))}
        </div>
        {errors.online_platforms && (
          <p className="text-sm text-destructive">{errors.online_platforms.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="expectations">무엇을 기대하며 가입하셨나요?</Label>
        <Textarea
          id="expectations"
          placeholder="셀러상담소에서 얻고자 하는 것, 기대하는 바를 자유롭게 작성해주세요..."
          {...register('expectations')}
          disabled={isLoading}
          rows={4}
        />
        {errors.expectations && (
          <p className="text-sm text-destructive">{errors.expectations.message}</p>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? '처리중...' : '회원가입'}
      </Button>
    </form>
  );
}

