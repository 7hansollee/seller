-- Create post_likes table for storing user likes on posts
CREATE TABLE IF NOT EXISTS post_likes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  post_id UUID NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Ensure a user can only like a post once
  UNIQUE(user_id, post_id)
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_post_likes_user_id ON post_likes(user_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_post_id ON post_likes(post_id);
CREATE INDEX IF NOT EXISTS idx_post_likes_user_post ON post_likes(user_id, post_id);

-- Enable RLS (Row Level Security)
ALTER TABLE post_likes ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
-- Users can read all likes
CREATE POLICY "Anyone can read post likes" ON post_likes
  FOR SELECT USING (true);

-- Users can only insert their own likes
CREATE POLICY "Users can insert their own likes" ON post_likes
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Users can delete their own likes
CREATE POLICY "Users can delete their own likes" ON post_likes
  FOR DELETE USING (auth.uid() = user_id);

-- Create function to toggle like and update post like_count
CREATE OR REPLACE FUNCTION toggle_post_like(p_post_id UUID, p_user_id UUID)
RETURNS TABLE(is_liked BOOLEAN, new_like_count INTEGER) AS $$
DECLARE
  v_exists BOOLEAN;
  v_like_count INTEGER;
BEGIN
  -- Check if like already exists
  SELECT EXISTS(
    SELECT 1 FROM post_likes 
    WHERE post_id = p_post_id AND user_id = p_user_id
  ) INTO v_exists;

  IF v_exists THEN
    -- Unlike: delete the like
    DELETE FROM post_likes 
    WHERE post_id = p_post_id AND user_id = p_user_id;
    
    -- Decrement like count
    UPDATE posts 
    SET like_count = GREATEST(0, like_count - 1)
    WHERE id = p_post_id
    RETURNING like_count INTO v_like_count;
    
    RETURN QUERY SELECT false, v_like_count;
  ELSE
    -- Like: insert new like
    INSERT INTO post_likes (post_id, user_id)
    VALUES (p_post_id, p_user_id);
    
    -- Increment like count
    UPDATE posts 
    SET like_count = like_count + 1
    WHERE id = p_post_id
    RETURNING like_count INTO v_like_count;
    
    RETURN QUERY SELECT true, v_like_count;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create function to check if user has liked a post
CREATE OR REPLACE FUNCTION check_post_like(p_post_id UUID, p_user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS(
    SELECT 1 FROM post_likes 
    WHERE post_id = p_post_id AND user_id = p_user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

