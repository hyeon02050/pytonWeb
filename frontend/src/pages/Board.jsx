import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Link 태그 추가!

function Board() {
  const [posts, setPosts] = useState([]);
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  useEffect(() => {
    fetch("http://127.0.0.1:8000/posts")
      .then(res => res.json())
      .then(data => setPosts(data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) return;
    fetch("http://127.0.0.1:8000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(newPost => {
      setPosts([...posts, newPost]);
      setForm({ title: "", content: "", author: "" });
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">📌 자유 게시판</h1>

      {/* 글쓰기 폼 (그대로 유지) */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-8 border border-gray-200">
        <div className="grid grid-cols-1 gap-4">
          <input name="title" value={form.title} onChange={handleChange} placeholder="제목" className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none" />
          <textarea name="content" value={form.content} onChange={handleChange} placeholder="내용" className="border p-3 rounded-lg w-full h-24 focus:ring-2 focus:ring-blue-500 outline-none resize-none" />
          <div className="flex gap-2">
            <input name="author" value={form.author} onChange={handleChange} placeholder="작성자" className="border p-3 rounded-lg w-1/4" />
            <button onClick={handleSubmit} className="bg-blue-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-blue-700 flex-1 transition">글 올리기</button>
          </div>
        </div>
      </div>

      {/* 게시글 목록 (테이블 스타일로 변경) */}
      <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
        {posts.map((post) => (
          <div key={post.id} className="border-b border-gray-100 last:border-none hover:bg-gray-50 transition">
            {/* 제목 클릭 시 상세 페이지로 이동 */}
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
        {posts.length === 0 && <p className="p-5 text-center text-gray-500">아직 작성된 글이 없습니다.</p>}
      </div>
    </div>
  );
}

export default Board;