import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Board() {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  // 게시글 목록 가져오기
  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">📌 자유 게시판</h1>
        {/* 글쓰기 버튼 추가 */}
        <button 
          onClick={() => navigate("/write")}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow transition"
        >
          ✏️ 글쓰기
        </button>
      </div>

      {/* 게시글 목록 */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition">
            <Link to={`/posts/${post.id}`} className="block p-5 flex justify-between items-center">
              <div>
                <h2 className="text-lg font-semibold text-gray-800 cursor-pointer hover:text-blue-600">
                  {post.title}
                </h2>
                <p className="text-sm text-gray-400 mt-1">글쓴이 {post.author || "익명"}</p>
              </div>
            </Link>
          </div>
        ))}
        {posts.length === 0 && (
          <div className="p-10 text-center text-gray-500">
            <p>아직 작성된 글이 없습니다.</p>
            <p className="text-sm mt-2">첫 번째 글의 주인공이 되어보세요!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Board;