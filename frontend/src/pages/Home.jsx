import { Link } from 'react-router-dom';

function Home() {
  return (
    // 1. 전체 배경 및 여백 (반응형 중앙 정렬)
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
      
      {/* 2. 레이아웃 뼈대: PC(md)에서는 가로(row), 모바일에서는 세로(col)로 배치 */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* ================= 좌측: 텍스트 영역 ================= */}
        <div className="flex-1 flex flex-col items-start gap-6">
          
          {/* 꼬리표 (배지) */}
          <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">
            컴퓨터 소프트웨어 동아리
          </div>
          
          {/* 메인 타이틀 */}
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
            MOS
          </h1>
          
          {/* 서브 타이틀 */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
            Make Our Software
          </h2>
          
          {/* 설명글 */}
          <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
            함께 배우고, 함께 성장하며, 함께 만들어가는 소프트웨어 개발 동아리입니다. 
            프로그래밍의 즐거움을 나누고, 실력을 키우며, 멋진 프로젝트를 함께 만들어갑니다.
          </p>
          
          {/* 버튼 그룹 */}
          <div className="flex flex-wrap gap-4 mt-2">
            <Link 
              to="/board" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
            >
              동아리 가입하기 →
            </Link>
            <Link 
              to="/activity" 
              className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg transition-all"
            >
              더 알아보기
            </Link>
          </div>
        </div>

        {/* ================= 우측: 이미지 영역 ================= */}
        <div className="flex-1 w-full">
          {/* 코딩 화면 이미지 (public 폴더에 이미지를 넣고 경로를 맞추세요) */}
          <img 
            src="/coding-bg.png" 
            alt="코딩하는 모습" 
            className="w-full h-auto rounded-2xl shadow-2xl object-cover"
          />
        </div>

      </div>
    </section>
  );
}

export default Home;