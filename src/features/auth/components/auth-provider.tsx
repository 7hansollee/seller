'use client';

import { createContext, useContext, useEffect, useState, useRef, useMemo } from 'react';
import { createClient } from '@/lib/supabase/client';
import { getCurrentUser, signOut as authSignOut } from '../api';
import type { AuthUser } from '../types';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const supabase = createClient();

    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        console.log('AuthProvider: Initial user fetch:', currentUser);
        setUser(currentUser);
      } catch (error) {
        console.error('AuthProvider: Failed to fetch user:', error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    // 초기 사용자 정보 가져오기
    fetchUser();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      console.log('AuthProvider: Auth state change:', { event, session });
      
      // 이전 타이머가 있다면 취소
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      // 디바운싱: 100ms 후에 상태 업데이트
      timeoutRef.current = setTimeout(async () => {
        try {
          if (event === 'SIGNED_IN' && session?.user) {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } else if (event === 'SIGNED_OUT') {
            setUser(null);
          } else if (event === 'TOKEN_REFRESHED' && session?.user) {
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } else if (event === 'INITIAL_SESSION' && session?.user) {
            // INITIAL_SESSION에서도 사용자 정보 가져오기
            const currentUser = await getCurrentUser();
            setUser(currentUser);
          } else if (!session?.user) {
            setUser(null);
          }
        } catch (error) {
          console.error('AuthProvider: Failed to handle auth state change:', error);
          setUser(null);
        } finally {
          setLoading(false);
        }
      }, 100);
    });

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    try {
      await authSignOut();
      setUser(null);
    } catch (error) {
      console.error('AuthProvider: Failed to sign out:', error);
      throw error;
    }
  };

  const isAuthenticated = useMemo(() => !!user, [user]);

  const value = useMemo(
    () => ({
      user,
      loading,
      isAuthenticated,
      signOut,
    }),
    [user, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

