import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || '나는 셀러';
    const description = searchParams.get('description') || '1인 온라인 셀러 커뮤니티';
    const content = searchParams.get('content') || '';
    const category = searchParams.get('category') || '커뮤니티';
    const likeCount = searchParams.get('likeCount') || '0';
    const commentCount = searchParams.get('commentCount') || '0';

    // 본문 미리보기 (최대 150자)
    const contentPreview = content.length > 150 
      ? content.slice(0, 150) + '...' 
      : content || description;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            backgroundColor: 'white',
            position: 'relative',
          }}
        >
          {/* 상단 헤더 (브랜드) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '40px 60px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: 'white',
                  letterSpacing: '-0.02em',
                }}
              >
                🛍️ 나는 셀러
              </div>
            </div>
            <div
              style={{
                fontSize: 24,
                color: 'rgba(255, 255, 255, 0.95)',
                backgroundColor: 'rgba(255, 255, 255, 0.25)',
                padding: '12px 28px',
                borderRadius: '30px',
                fontWeight: '600',
              }}
            >
              {category}
            </div>
          </div>

          {/* 메인 콘텐츠 영역 */}
          <div
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              padding: '60px',
              backgroundColor: '#fafafa',
            }}
          >
            {/* 제목 */}
            <div
              style={{
                fontSize: 52,
                fontWeight: 'bold',
                color: '#1a1a1a',
                marginBottom: 30,
                lineHeight: 1.3,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {title}
            </div>
            
            {/* 본문 미리보기 */}
            {contentPreview && (
              <div
                style={{
                  fontSize: 30,
                  color: '#666',
                  lineHeight: 1.6,
                  marginBottom: 40,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                }}
              >
                {contentPreview}
              </div>
            )}

            {/* 통계 정보 */}
            <div
              style={{
                display: 'flex',
                gap: '40px',
                marginTop: 'auto',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: 32 }}>❤️</div>
                <div style={{ fontSize: 28, color: '#666', fontWeight: '600' }}>
                  공감 {likeCount}
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ fontSize: 32 }}>💬</div>
                <div style={{ fontSize: 28, color: '#666', fontWeight: '600' }}>
                  댓글 {commentCount}
                </div>
              </div>
            </div>
          </div>

          {/* 하단 푸터 */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '30px 60px',
              backgroundColor: '#1a1a1a',
            }}
          >
            <div style={{ fontSize: 24, color: '#999' }}>
              온라인 셀러 커뮤니티
            </div>
            <div style={{ fontSize: 24, color: '#999' }}>
              seller-green.vercel.app
            </div>
          </div>
        </div>
      ),
      {
        width: 1200,
        height: 630,
      }
    );
  } catch (e) {
    console.error('OG 이미지 생성 오류:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}

