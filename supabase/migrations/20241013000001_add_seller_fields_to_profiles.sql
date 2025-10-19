-- Add new seller-related fields to profiles table
ALTER TABLE public.profiles 
ADD COLUMN IF NOT EXISTS seller_experience TEXT,
ADD COLUMN IF NOT EXISTS online_platforms TEXT[],
ADD COLUMN IF NOT EXISTS expectations TEXT;

-- Add comments for new columns
COMMENT ON COLUMN public.profiles.seller_experience IS '온라인 셀러 경력';
COMMENT ON COLUMN public.profiles.online_platforms IS '온라인 판매처 목록 (배열)';
COMMENT ON COLUMN public.profiles.expectations IS '가입 시 기대사항';
