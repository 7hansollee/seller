-- Add best_score column to posts table
-- Best score is calculated using weighted formula:
-- view_count * 0.1 + comment_count * 5.0 + like_count * 2.0
-- 
-- Weights rationale:
-- - view_count (0.1): Low weight as views are common and easy to get
-- - comment_count (5.0): High weight as comments indicate real engagement
-- - like_count (2.0): Medium weight as likes show appreciation

-- Add best_score as a generated column
ALTER TABLE posts
ADD COLUMN IF NOT EXISTS best_score DECIMAL GENERATED ALWAYS AS (
  (view_count * 0.1) + (comment_count * 5.0) + (like_count * 2.0)
) STORED;

-- Create index for better performance when ordering by best_score
CREATE INDEX IF NOT EXISTS idx_posts_best_score ON posts(best_score DESC);

-- Add comment for documentation
COMMENT ON COLUMN posts.best_score IS 'Calculated score for ranking best posts. Formula: (view_count * 0.1) + (comment_count * 5.0) + (like_count * 2.0)';

초