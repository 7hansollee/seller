'use client';

import { useQuery } from '@tanstack/react-query';
import { getPost, incrementViewCount } from '../api';
import { useEffect } from 'react';

export function usePost(id: string) {
  const query = useQuery({
    queryKey: ['post', id],
    queryFn: () => getPost(id),
    enabled: !!id,
  });

  // 게시글을 성공적으로 불러온 후 조회수 증가
  useEffect(() => {
    if (query.isSuccess && id) {
      // 조회수 증가 (비동기로 실행, 에러가 나도 페이지는 정상 표시)
      incrementViewCount(id).catch(console.error);
    }
  }, [query.isSuccess, id]);

  return query;
}

