import { createClient } from '@/lib/supabase/client';
import type { SignUpData, SignInData, UserProfile } from './types';

export async function signUp(data: SignUpData) {
  const supabase = createClient();

  try {
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        data: {
          nickname: data.nickname,
        },
      },
    });

    if (authError) {
      console.error('Auth signup error:', authError);
      
      // Supabase 에러 메시지를 한국어로 번역
      let errorMessage = '회원가입에 실패했습니다.';
      
      switch (authError.message) {
        case 'User already registered':
          errorMessage = '이미 가입된 이메일입니다. 로그인을 시도해주세요.';
          break;
        case 'Password should be at least 6 characters':
          errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
          break;
        case 'Invalid email':
          errorMessage = '올바른 이메일 형식이 아닙니다.';
          break;
        case 'Email rate limit exceeded':
          errorMessage = '너무 많은 가입 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
          break;
        case 'Signup disabled':
          errorMessage = '현재 회원가입이 비활성화되어 있습니다.';
          break;
        default:
          errorMessage = `회원가입에 실패했습니다: ${authError.message}`;
      }
      
      throw new Error(errorMessage);
    }

    if (!authData.user) {
      throw new Error('회원가입에 실패했습니다.');
    }

    // 프로필 생성 시도
    const { error: profileError } = await supabase.from('profiles').insert({
      id: authData.user.id,
      email: data.email,
      nickname: data.nickname,
      seller_experience: data.seller_experience,
      online_platforms: data.online_platforms,
      expectations: data.expectations,
    });

    if (profileError) {
      console.error('Profile creation error:', profileError);
      
      // 프로필 생성 실패 시 에러 메시지를 더 구체적으로 제공
      if (profileError.code === '42703') {
        throw new Error('데이터베이스 스키마가 업데이트되지 않았습니다. 관리자에게 문의하세요.');
      } else if (profileError.code === '23505') {
        throw new Error('이미 존재하는 사용자입니다.');
      } else {
        throw new Error(`프로필 생성 실패: ${profileError.message}`);
      }
    }

    console.log('Signup successful:', { userId: authData.user.id, email: data.email });
    return authData;
  } catch (error) {
    console.error('Signup error:', error);
    throw error;
  }
}

export async function signIn(data: SignInData) {
  const supabase = createClient();

  const { data: authData, error } = await supabase.auth.signInWithPassword({
    email: data.email,
    password: data.password,
  });

  if (error) {
    // Supabase 에러 메시지를 한국어로 번역
    let errorMessage = '로그인에 실패했습니다.';
    
    switch (error.message) {
      case 'Invalid login credentials':
        errorMessage = '이메일 또는 비밀번호가 올바르지 않습니다.';
        break;
      case 'Email not confirmed':
        errorMessage = '이메일 인증이 완료되지 않았습니다. 이메일을 확인해주세요.';
        break;
      case 'Too many requests':
        errorMessage = '너무 많은 로그인 시도가 있었습니다. 잠시 후 다시 시도해주세요.';
        break;
      case 'User not found':
        errorMessage = '존재하지 않는 이메일입니다.';
        break;
      case 'Invalid email':
        errorMessage = '올바른 이메일 형식이 아닙니다.';
        break;
      case 'Password should be at least 6 characters':
        errorMessage = '비밀번호는 최소 6자 이상이어야 합니다.';
        break;
      default:
        // 원본 에러 메시지가 한국어가 아닌 경우에만 번역
        if (!error.message.includes('이메일') && !error.message.includes('비밀번호')) {
          errorMessage = `로그인에 실패했습니다: ${error.message}`;
        } else {
          errorMessage = error.message;
        }
    }
    
    throw new Error(errorMessage);
  }

  return authData;
}

export async function signOut() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function getCurrentUser() {
  const supabase = createClient();

  try {
    // 먼저 세션을 확인
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();

    if (sessionError) {
      console.error('Error getting session:', sessionError);
      return null;
    }

    if (!session?.user) {
      return null;
    }

    // 사용자 정보 가져오기
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError) {
      console.error('Error getting user:', userError);
      return null;
    }

    if (!user) {
      return null;
    }

    // 프로필 정보 가져오기
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (profileError) {
      console.error('Error getting profile:', profileError);
      // 프로필이 없어도 기본 사용자 정보는 반환
      return {
        id: user.id,
        email: user.email!,
        nickname: user.user_metadata?.nickname || 'Unknown',
        avatar_url: null,
        seller_experience: null,
        online_platforms: null,
        expectations: null,
      };
    }

    if (!profile) {
      return null;
    }

    return {
      id: user.id,
      email: user.email!,
      nickname: profile.nickname,
      avatar_url: profile.avatar_url,
      seller_experience: profile.seller_experience,
      online_platforms: profile.online_platforms,
      expectations: profile.expectations,
    };
  } catch (error) {
    console.error('Unexpected error in getCurrentUser:', error);
    return null;
  }
}

export async function getUserProfile(userId: string): Promise<UserProfile | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', userId)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

