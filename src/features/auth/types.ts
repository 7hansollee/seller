export interface SignUpData {
  email: string;
  password: string;
  nickname: string;
  seller_experience: string;
  online_platforms: string[];
  expectations: string;
}

export interface SignInData {
  email: string;
  password: string;
}

export interface UserProfile {
  id: string;
  email: string;
  nickname: string;
  avatar_url?: string;
  seller_experience?: string;
  online_platforms?: string[];
  expectations?: string;
  created_at: string;
}

export interface AuthUser {
  id: string;
  email: string;
  nickname: string;
  avatar_url?: string;
  seller_experience?: string;
  online_platforms?: string[];
  expectations?: string;
}

