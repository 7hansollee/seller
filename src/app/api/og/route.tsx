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

    // 본문 미리보기 (최대 100자 - 모바일 최적화)
    const contentPreview = content.length > 100 
      ? content.slice(0, 100) + '...' 
      : content || description;

    return new ImageResponse(
      (
        <div
          style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
            padding: '60px',
          }}
        >
          {/* 3D 카드 컨테이너 */}
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
              borderRadius: '30px',
              boxShadow: '0 30px 60px rgba(50, 50, 93, 0.25), 0 15px 30px rgba(0, 0, 0, 0.3)',
              overflow: 'hidden',
              position: 'relative',
            }}
          >
            {/* 상단 장식 바 */}
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '8px',
                background: 'linear-gradient(90deg, #7c6fc8 0%, #9b87d9 50%, #b8a4e8 100%)',
              }}
            />

            {/* 헤더 영역 */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '50px 50px 30px 50px',
              }}
            >
              {/* 로고 */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '14px',
                }}
              >
                {/* 쇼핑백 아이콘 */}
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    backgroundColor: '#7c6fc8',
                    borderRadius: '12px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    position: 'relative',
                    boxShadow: '0 4px 12px rgba(124, 111, 200, 0.3)',
                  }}
                >
                  {/* 쇼핑백 본체 */}
                  <div
                    style={{
                      width: '32px',
                      height: '36px',
                      backgroundColor: 'white',
                      borderRadius: '4px',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    {/* 달러 사인 */}
                    <div
                      style={{
                        fontSize: 24,
                        color: '#7c6fc8',
                        fontWeight: 'bold',
                      }}
                    >
                      $
                    </div>
                  </div>
                  {/* 쇼핑백 손잡이 */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '24px',
                      height: '12px',
                      border: '3px solid white',
                      borderBottom: 'none',
                      borderRadius: '12px 12px 0 0',
                    }}
                  />
                </div>
                
                {/* 로고 텍스트 */}
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      lineHeight: 1,
                    }}
                  >
                    나는
                  </div>
                  <div
                    style={{
                      fontSize: 28,
                      fontWeight: 'bold',
                      color: '#1a1a1a',
                      lineHeight: 1,
                    }}
                  >
                    셀러
                  </div>
                </div>
              </div>

              {/* 카테고리 뱃지 */}
              <div
                style={{
                  fontSize: 18,
                  color: '#7c6fc8',
                  backgroundColor: '#f5f3ff',
                  padding: '10px 24px',
                  borderRadius: '50px',
                  fontWeight: '700',
                  boxShadow: '0 8px 20px rgba(124, 111, 200, 0.2)',
                }}
              >
                {category}
              </div>
            </div>

            {/* 메인 콘텐츠 */}
            <div
              style={{
                flex: 1,
                display: 'flex',
                flexDirection: 'column',
                padding: '30px 50px 40px 50px',
                position: 'relative',
              }}
            >
              {/* 배경 장식 요소 */}
              <div
                style={{
                  position: 'absolute',
                  top: '-30px',
                  right: '-30px',
                  width: '200px',
                  height: '200px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(124, 111, 200, 0.1) 0%, rgba(155, 135, 217, 0.1) 100%)',
                  filter: 'blur(40px)',
                }}
              />

              {/* 제목 */}
              <div
                style={{
                  fontSize: 48,
                  fontWeight: 'bold',
                  color: '#1a202c',
                  marginBottom: 24,
                  lineHeight: 1.4,
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  position: 'relative',
                }}
              >
                {title}
              </div>
              
              {/* 본문 미리보기 */}
              {contentPreview && (
                <div
                  style={{
                    fontSize: 24,
                    color: '#718096',
                    lineHeight: 1.6,
                    marginBottom: 30,
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: '-webkit-box',
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: 'vertical',
                    position: 'relative',
                  }}
                >
                  {contentPreview}
                </div>
              )}

              {/* 하단 정보 */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  marginTop: 'auto',
                  paddingTop: '25px',
                  borderTop: '2px solid #e2e8f0',
                }}
              >
                {/* 통계 */}
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#fff5f5',
                      padding: '10px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 3px 10px rgba(245, 101, 101, 0.15)',
                    }}
                  >
                    <div style={{ fontSize: 24 }}>❤️</div>
                    <div style={{ fontSize: 22, color: '#f56565', fontWeight: '700' }}>
                      {likeCount}
                    </div>
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      backgroundColor: '#f0f9ff',
                      padding: '10px 20px',
                      borderRadius: '16px',
                      boxShadow: '0 3px 10px rgba(59, 130, 246, 0.15)',
                    }}
                  >
                    <div style={{ fontSize: 24 }}>💬</div>
                    <div style={{ fontSize: 22, color: '#3b82f6', fontWeight: '700' }}>
                      {commentCount}
                    </div>
                  </div>
                </div>

                {/* 도메인 */}
                <div
                  style={{
                    fontSize: 16,
                    color: '#a0aec0',
                    fontWeight: '600',
                  }}
                >
                  seller-green.vercel.app
                </div>
              </div>
            </div>
          </div>
        </div>
      ),
      {
        width: 800,
        height: 1000,
      }
    );
  } catch (e) {
    console.error('OG 이미지 생성 오류:', e);
    return new Response('Failed to generate image', { status: 500 });
  }
}

