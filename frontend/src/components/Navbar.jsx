import { Link } from 'react-router-dom';

function Navbar() {
  return (
    // 1. 전체 네비게이션 바 (화면 꽉 채우고 맨 위에 고정)
    <nav className="w-full bg-white/90 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      
      {/* 2. 중앙 정렬 컨테이너 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 3. 양쪽 끝으로 밀어내기 */}
        <div className="flex justify-between items-center h-16">
          {/* 좌측 로고 영역 */}
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition">
            
            <img 
              src="/logo.png" 
              alt="MOS Logo" 
              className="w-10 h-10 object-contain rounded-lg bg-blue-600" 
            />
            
            {/* 로고 옆 글자들 */}
            <div className="flex flex-col justify-center">
              <span className="text-gray-900 text-xl font-bold font-['Inter'] leading-none">
                MOS
              </span>
              <span className="text-gray-500 text-xs font-normal font-['Inter'] mt-1">
                Make Our Software
              </span>
            </div>
          </Link>

          {/* 우측: 메뉴 탭 영역  */}
          <div className="flex items-center gap-8">
            <Link to="/" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              홈
            </Link>
            <Link to="/activity" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              활동
            </Link>
            <Link to="/guestbook" className="text-gray-700 text-base font-medium whitespace-nowrap hover:text-blue-600 transition-colors">
              방명록
            </Link>
            <Link to="/board" className="text-gray-700 text-base font-medium hover:text-blue-600 transition-colors">
              연락
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}

export default Navbar;