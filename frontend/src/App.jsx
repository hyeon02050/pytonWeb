import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Guestbook from './pages/Guestbook';
import Board from './pages/Board';
import PostDetail from './pages/PostDetail';

function App() {
  return (
    <BrowserRouter>
      {/* 1. Navbar는 Routes 밖에 있으므로 모든 페이지에 항상 보입니다 */}
      <Navbar />
      
      {/* Navbar 높이만큼 여백 (fixed position 때문) */}
      <div className="pt-16"> 
        <Routes>
          {/* 2. 주소 규칙 정의 */}
          <Route path="/" element={<Home />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/board" element={<Board />} />
          <Route path="/posts/:id" element={<PostDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;