import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-indigo-600 flex flex-col items-center justify-center text-white">
      <h1 className="text-5xl font-bold mb-4">MOS 홈페이지</h1>
      <p className="text-xl opacity-90 mb-8">
        환영합니다! 
      </p>
      
      {/* Link 태그: 새로고침 없이 페이지 이동 (SPA의 핵심) */}
      <Link 
        to="/guestbook" 
        className="bg-white text-indigo-600 font-bold py-3 px-6 rounded-full shadow-lg hover:bg-gray-100 transition"
      >
        방명록 쓰러 가기 →
      </Link>
    </div>
  );
}

export default Home;