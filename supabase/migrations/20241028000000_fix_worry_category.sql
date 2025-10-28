-- 기존 management_worry 카테고리를 worry로 변경
UPDATE posts
SET category = 'worry'
WHERE category = 'management_worry';

