'use client';

import { Header } from '@/components/layout/header';
import Link from 'next/link';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="prose prose-slate dark:prose-invert max-w-none">
          <h1 className="text-3xl font-bold mb-8">개인정보처리방침</h1>

          <p className="text-muted-foreground leading-relaxed mb-8">
            에스엔씨컴퍼니(이하 '회사'라 함)은 개인정보 보호법 제30조에 따라 정보주체의 개인정보를 보호하고 이와 관련한 고충을 신속하고 원활하게 처리할 수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을 수립·공개합니다.
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제1조 (개인정보의 처리 목적)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보 보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
              <li>서비스 제공 및 계약 이행, 마케팅 및 광고 활용, 서비스 개선 및 신규 서비스 개발, 이벤트 및 행사 안내, 이용자 간 관계 형성</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제2조 (개인정보의 처리 및 보유 기간)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 법령에 따른 개인정보 보유·이용기간 또는 정보주체로부터 개인정보를 수집 시에 동의받은 개인정보 보유·이용기간 내에서 개인정보를 처리·보유합니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
              <li>회원 가입 및 관리: 회원 탈퇴 시까지</li>
              <li>재화 또는 서비스 제공: 서비스 공급완료 및 요금결제·정산 완료시까지</li>
              <li>법령에서 정한 기간</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제3조 (개인정보의 수집 항목 및 수집 방법)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 서비스 제공을 위해 다음과 같은 개인정보를 수집하고 있습니다.
            </p>
            <div className="space-y-4">
              <div>
                <p className="text-muted-foreground leading-relaxed mb-2">1. 수집항목</p>
                <ul className="list-inside space-y-2 text-muted-foreground ml-4">
                  <li className="ml-4">• 필수항목: 이메일 주소, 이름, 비밀번호, 닉네임, 온라인 셀러 경력, 온라인 판매처</li>
                  <li className="ml-4">• 선택항목: 없음</li>
                </ul>
              </div>
              <div>
                <p className="text-muted-foreground leading-relaxed mb-2">2. 수집방법</p>
                <ul className="list-inside space-y-2 text-muted-foreground ml-4">
                  <li className="ml-4">• 웹사이트 회원가입</li>
                </ul>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제4조 (개인정보의 제3자 제공)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 정보주체의 개인정보를 제1조(개인정보의 처리 목적)에서 명시한 범위 내에서만 처리하며, 정보주체의 동의, 법률의 특별한 규정 등 개인정보 보호법 제17조 및 제18조에 해당하는 경우에만 개인정보를 제3자에게 제공합니다. 현재 회사는 이용자의 개인정보를 제3자에게 제공하고 있지 않습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제5조 (개인정보처리 위탁)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 현재 외부에 개인정보 처리를 위탁하고 있지 않습니다. 향후 위탁 필요가 발생할 경우, 위탁 대상자와 위탁 업무 내용에 대해 정보주체에게 통지하고 필요한 경우 사전 동의를 받도록 하겠습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제6조 (정보주체와 법정대리인의 권리·의무 및 그 행사방법)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              정보주체는 회사에 대해 언제든지 개인정보 열람·정정·삭제·처리정지 요구 등의 권리를 행사할 수 있습니다.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제7조 (개인정보의 파기)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 개인정보 보유기간의 경과, 처리목적 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
              <li>파기절차: 회사는 파기 사유가 발생한 개인정보를 선정하고, 회사의 개인정보 보호책임자의 승인을 받아 개인정보를 파기합니다.</li>
              <li>파기방법: 전자적 파일 형태로 기록·저장된 개인정보는 기록을 재생할 수 없도록 파기하며, 종이 문서에 기록·저장된 개인정보는 분쇄기로 분쇄하거나 소각하여 파기합니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제8조 (개인정보의 안전성 확보 조치)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 개인정보의 안전성 확보를 위해 다음과 같은 조치를 취하고 있습니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
              <li>관리적 조치: 내부관리계획 수립·시행, 정기적 직원 교육 등</li>
              <li>기술적 조치: 개인정보처리시스템 등의 접근권한 관리, 접근통제시스템 설치, 고유식별정보 등의 암호화, 보안프로그램 설치</li>
              <li>물리적 조치: 전산실, 자료보관실 등의 접근통제</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제9조 (개인정보 자동 수집 장치의 설치·운영 및 거부에 관한 사항)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 이용자에게 개별적인 맞춤서비스를 제공하기 위해 이용정보를 저장하고 수시로 불러오는 '쿠키(cookie)'를 사용합니다. 쿠키는 웹사이트를 운영하는데 이용되는 서버가 이용자의 브라우저에게 보내는 소량의 정보이며 이용자의 PC 컴퓨터 내의 하드디스크에 저장되기도 합니다.
            </p>
            <ol className="list-decimal list-inside space-y-3 text-muted-foreground ml-4">
              <li>쿠키의 사용 목적: 이용자가 방문한 각 서비스와 웹 사이트들에 대한 방문 및 이용형태, 인기 검색어, 보안접속 여부 등을 파악하여 이용자에게 최적화된 정보 제공을 위해 사용됩니다.</li>
              <li>쿠키의 설치·운영 및 거부: 웹브라우저 상단의 도구&gt;인터넷 옵션&gt;개인정보 메뉴의 옵션 설정을 통해 쿠키 저장을 거부할 수 있습니다.</li>
              <li>쿠키 저장을 거부할 경우 맞춤형 서비스 이용에 어려움이 발생할 수 있습니다.</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제10조 (개인정보 보호책임자)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              회사는 개인정보 처리에 관한 업무를 총괄해서 책임지고, 개인정보 처리와 관련한 정보주체의 불만처리 및 피해구제 등을 위하여 아래와 같이 개인정보 보호책임자를 지정하고 있습니다.
            </p>
            <div className="bg-muted/50 p-6 rounded-lg space-y-2">
              <p className="font-semibold text-foreground">개인정보 보호책임자</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 성명: 이한솔</li>
                <li>• 직책: 대표</li>
                <li>• 연락처: 010-7151-0748, 7hansollee@naver.com</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제11조 (개인정보 열람청구)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              정보주체는 개인정보 보호법 제35조에 따른 개인정보의 열람 청구를 아래의 부서에 할 수 있습니다. 회사는 정보주체의 개인정보 열람청구가 신속하게 처리되도록 노력하겠습니다.
            </p>
            <div className="bg-muted/50 p-6 rounded-lg space-y-2">
              <p className="font-semibold text-foreground">개인정보 열람청구 접수·처리 부서</p>
              <ul className="space-y-1 text-muted-foreground">
                <li>• 부서명: 고객센터</li>
                <li>• 담당자: 이한솔</li>
                <li>• 연락처: 010-7151-0748, 7hansollee@naver.com</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제12조 (권익침해 구제방법)</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              정보주체는 개인정보침해로 인한 구제를 받기 위하여 개인정보분쟁조정위원회, 한국인터넷진흥원 개인정보침해신고센터 등에 분쟁해결이나 상담 등을 신청할 수 있습니다. 이 밖에 기타 개인정보침해의 신고, 상담에 대하여는 아래의 기관에 문의하시기 바랍니다.
            </p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground ml-4">
              <li>개인정보분쟁조정위원회: 1833-6972 (www.kopico.go.kr)</li>
              <li>개인정보침해신고센터: 118 (privacy.kisa.or.kr)</li>
              <li>대검찰청: 1301 (www.spo.go.kr)</li>
              <li>경찰청: 182 (ecrm.cyber.go.kr)</li>
            </ol>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제13조 (개인정보 유출 통지)</h2>
            <p className="text-muted-foreground leading-relaxed">
              회사는 개인정보의 유출이 발생한 경우에는 지체 없이 해당 정보주체에게 그 사실을 알리고, 개인정보 보호법 제34조에 따라 관계기관에 신고하겠습니다.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-2xl font-semibold mb-4 mt-8">제15조 (개인정보 처리방침 변경)</h2>
            <p className="text-muted-foreground leading-relaxed">
              이 개인정보처리방침은 2025-10-19부터 적용됩니다.
            </p>
          </section>

          <div className="mt-12 pt-8 border-t">
            <Link href="/" className="text-primary hover:underline">
              ← 홈으로 돌아가기
            </Link>
          </div>
        </div>
      </main>

      <footer className="border-t py-8 mt-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 나는 셀러. 온라인 셀러들을 위한 익명 커뮤니티
            </div>
            <div className="flex gap-4 text-sm text-muted-foreground">
              <Link href="/terms" className="hover:text-foreground transition-colors">
                이용약관
              </Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">
                개인정보처리방침
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}


