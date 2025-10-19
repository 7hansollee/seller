# 환경 변수 설정 가이드

## 필요한 환경 변수

이 프로젝트를 실행하려면 다음 환경 변수가 필요합니다:

### 1. Supabase 환경 변수

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key_here
```

### Supabase 환경 변수 가져오기

1. [Supabase 대시보드](https://supabase.com/dashboard)에 로그인
2. 프로젝트 선택
3. Settings > API 메뉴로 이동
4. 다음 값들을 복사:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key → `SUPABASE_SERVICE_ROLE_KEY` (⚠️ 절대 클라이언트에 노출하지 말 것!)

## 로컬 개발 환경 설정

프로젝트 루트에 `.env.local` 파일 생성:

```bash
# .env.local
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

## 배포 환경 설정

### Vercel

1. Vercel 대시보드에서 프로젝트 선택
2. Settings > Environment Variables로 이동
3. 위의 3개 환경 변수를 추가
4. 저장 후 재배포

### Netlify

1. Netlify 대시보드에서 사이트 선택
2. Site settings > Environment variables로 이동
3. 위의 3개 환경 변수를 추가
4. 저장 후 재배포

### 기타 플랫폼

배포 플랫폼의 환경 변수 설정 메뉴에서 위의 3개 변수를 추가하세요.

## 주의사항

⚠️ **중요**: 
- `NEXT_PUBLIC_` 접두사가 있는 변수는 클라이언트 사이드에 노출됩니다.
- `SUPABASE_SERVICE_ROLE_KEY`는 서버 사이드에서만 사용되며, 절대 클라이언트에 노출해서는 안 됩니다.
- `.env.local` 파일은 절대 Git에 커밋하지 마세요 (이미 .gitignore에 포함되어 있음)

## 문제 해결

환경 변수 관련 에러가 발생하면:

1. 환경 변수가 올바르게 설정되었는지 확인
2. 배포 플랫폼에서 환경 변수 저장 후 재배포 필요
3. 로컬에서는 `.env.local` 파일 생성 후 개발 서버 재시작

에러 메시지:
```
Error: @supabase/ssr: Your project's URL and API key are required to create a Supabase client!
```

→ 환경 변수가 설정되지 않았거나 잘못 설정되었습니다. 위의 가이드를 따라 다시 설정하세요.

