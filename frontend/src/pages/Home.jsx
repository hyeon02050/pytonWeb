import { Link } from 'react-router-dom';

// 1. 데이터 배열 (반복되는 작은 카드 6개)
const activities = [
  { id: 1, title: "프로젝트 개발", desc: "실제 서비스 개발을 통해 실무 경험을 쌓고, 포트폴리오를 만들어갑니다.", icon: "💻", color: "bg-blue-500" },
  { id: 2, title: "스터디 모임", desc: "다양한 프로그래밍 언어와 기술 스택을 함께 공부하고 지식을 공유합니다.", icon: "📚", color: "bg-purple-500" },
  { id: 3, title: "아이디어 공유", desc: "창의적인 아이디어를 자유롭게 제안하고 함께 실현해나갑니다.", icon: "💡", color: "bg-green-500" },
  { id: 4, title: "대회 참가", desc: "해커톤, 공모전 등 다양한 대회에 팀을 이루어 참가합니다.", icon: "🏆", color: "bg-orange-500" },
  { id: 5, title: "기술 세미나", desc: "최신 기술 트렌드와 개발 경험을 공유하는 정기 세미나를 진행합니다.", icon: "🎤", color: "bg-pink-500" },
  { id: 6, title: "멘토링", desc: "선배 개발자의 멘토링으로 성장의 방향을 함께 찾아갑니다.", icon: "🤝", color: "bg-indigo-500" }
];

// 2. 데이터 배열 (큰 카드 2개)
const bigCards = [
  { id: 1, title: "팀 협업", desc: "다양한 배경을 가진 팀원들과 함께 협업하며 실무 경험을 쌓습니다.", img: "/team-work.png" },
  { id: 2, title: "실습 중심 학습", desc: "이론보다는 실제 코드를 작성하며 배우는 실습 중심의 활동을 합니다.", img: "/coding-practice.png" }
];

function Home() {
  return (
    <>
      {/*   상단 메인 배너 (히어로 섹션)*/}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          
          <div className="flex-1 flex flex-col items-start gap-6">
            <div className="bg-blue-50 text-blue-600 px-4 py-1.5 rounded-full text-sm font-bold">
              컴퓨터 소프트웨어 동아리
            </div>
            
            <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight">
              MOS
            </h1>
            
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              Make Our Software
            </h2>
            
            <p className="text-lg text-gray-500 leading-relaxed max-w-lg">
              함께 배우고, 함께 성장하며, 함께 만들어가는 소프트웨어 개발 동아리입니다. 
              프로그래밍의 즐거움을 나누고, 실력을 키우며, 멋진 프로젝트를 함께 만들어갑니다.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <Link to="/board" className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all">
                동아리 가입하기 →
              </Link>
              <Link to="/activity" className="bg-white border-2 border-gray-200 hover:border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg transition-all">
                더 알아보기
              </Link>
            </div>
          </div>

          <div className="flex-1 w-full">
            <img src="/coding-bg.png" alt="코딩하는 모습" className="w-full h-auto rounded-2xl shadow-2xl object-cover" />
          </div>

        </div>
      </section>

      {/*  하단 우리의 활동 섹션  */}
      <section className="bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">우리의 활동</h2>
            <p className="text-lg text-gray-600">MOS에서는 다양한 활동을 통해 함께 성장하고 있습니다</p>
          </div>

          {/* 6개 작은 카드 영역 (반복문) */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {activities.map((item) => (
              <div key={item.id} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-2xl text-white mb-6 shadow-sm ${item.color}`}>
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* 2개 큰 사진 카드 영역 (반복문) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {bigCards.map((card) => (
              <div key={card.id} className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                {/* 주의: public 폴더 안에 이미지가 없으면 엑스박스가 뜹니다! */}
                <img src={card.img} alt={card.title} className="w-full h-64 object-cover" />
                <div className="p-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{card.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </>
  );
}

export default Home;