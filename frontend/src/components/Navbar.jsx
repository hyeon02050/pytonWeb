import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* 로고 영역 */}
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold text-indigo-600">
              MOS
            </Link>
          </div>

          {/* 메뉴 탭 영역 */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              홈
            </Link>
            <Link to="/guestbook" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
              방명록
            </Link>
            <Link to="/board" className="text-gray-600 hover:text-indigo-600 px-3 py-2 rounded-md text-sm font-medium">
             게시판
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;