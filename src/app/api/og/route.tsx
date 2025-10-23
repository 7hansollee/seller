import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || '나는 셀러';
    const description = searchParams.get('description') || '1인 온라인 셀러 커뮤니티';

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#0f172a',
            backgroundImage: 'linear-gradient(to bottom right, #0f172a, #1e293b)',
            position: 'relative',
          }}
        >
          {/* 배경 패턴 */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundImage: 'radial-gradient(circle at 25px 25px, rgba(255, 255, 255, 0.05) 2%, transparent 0%), radial-gradient(circle at 75px 75px, rgba(255, 255, 255, 0.05) 2%, transparent 0%)',
              backgroundSize: '100px 100px',
            }}
          />
          
          {/* 메인 컨텐츠 */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '80px',
              zIndex: 10,
            }}
          >
            {/* 로고/타이틀 */}
            <div
              style={{
                fontSize: 96,
                fontWeight: 'bold',
                color: 'white',
                marginBottom: 30,
                textAlign: 'center',
                letterSpacing: '-0.02em',
              }}
            >
              {title}
            </div>
            
            {/* 설명 */}
            <div
              style={{
                fontSize: 42,
                color: '#94a3b8',
                textAlign: 'center',
                maxWidth: '900px',
                lineHeight: 1.4,
              }}
            >
              {description}
            </div>
            
            {/* 태그라인 */}
            <div
              style={{
                fontSize: 28,
                color: '#64748b',
                marginTop: 50,
                textAlign: 'center',
              }}
            >
              스트레스 해소 • 팁 공유 • 운영 고민 상담
            </div>
          </div>
          
          {/* 하단 URL */}
          <div
            style={{
              position: 'absolute',
              bottom: 40,
              right: 60,
              fontSize: 24,
              color: '#475569',
            }}
          >
            seller-green.vercel.app
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

