import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function PostWrite() {
  const navigate = useNavigate(); // 글 다 쓰면 목록으로 튕겨주기 위해 필요
  const [form, setForm] = useState({ title: "", content: "", author: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = () => {
    if (!form.title || !form.content) {
      alert("제목과 내용을 입력해주세요!");
      return;
    }

    fetch("http://127.0.0.1:8000/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
    .then(res => res.json())
    .then(() => {
      // 성공하면 바로 게시판 목록으로 이동!
      navigate("/board");
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">✏️ 새 글 작성하기</h1>

      <div className="bg-white p-8 rounded-xl shadow-md border border-gray-200">
        <div className="grid grid-cols-1 gap-6">
          
          {/* 제목 입력 */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">제목</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="제목을 입력하세요"
              className="border p-3 rounded-lg w-full focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* 작성자 입력 */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">작성자</label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="이름을 남겨주세요"
              className="border p-3 rounded-lg w-full md:w-1/3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* 내용 입력 */}
          <div>
            <label className="block text-gray-700 font-bold mb-2">내용</label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="내용을 자유롭게 적어주세요..."
              className="border p-3 rounded-lg w-full h-64 focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>

          {/* 버튼들 */}
          <div className="flex gap-4 mt-4">
            <button 
              onClick={() => navigate("/board")}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-3 px-6 rounded-lg transition"
            >
              취소
            </button>
            <button 
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg flex-1 transition"
            >
              등록하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostWrite;