import { useState, useEffect } from 'react';

function Guestbook() {
  const [memos, setMemos] = useState([]);
  const [input, setInput] = useState("");

  // --- 기능 로직 (아까와 100% 동일) ---
  useEffect(() => {
    fetch("http://127.0.0.1:8000/memos")
      .then(res => res.json())
      .then(data => setMemos(data));
  }, []);

  const handleSubmit = () => {
    if (!input.trim()) return; // 빈 값 방지
    fetch("http://127.0.0.1:8000/memos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    })
    .then((res) => res.json())
    .then((data) => {
      const newMemo = { id: data.id, content: input };
      setMemos([...memos, newMemo]);
      setInput("");
    });
  };

  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/memos/${id}`, {
      method: "DELETE",
    })
    .then(() => {
      setMemos(memos.filter((memo) => memo.id !== id));
    });
  };

  // --- 화면 렌더링 (디자인 적용됨) ---
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-5">
      {/* 카드 박스 */}
      <div className="w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden">
        
        {/* 헤더 */}
        <div className="bg-indigo-600 p-6">
          <h1 className="text-2xl font-bold text-white text-center">
            📝 오늘의 한마디
          </h1>
          <p className="text-indigo-200 text-center text-sm mt-1">
            FastAPI + React + Firebase
          </p>
        </div>

        {/* 입력창 & 버튼 */}
        <div className="p-6">
          <div className="flex gap-2">
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSubmit()} // 엔터키 지원
              className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="오늘 기분 어때요?"
            />
            <button 
              onClick={handleSubmit}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg transition duration-200"
            >
              등록
            </button>
          </div>

          {/* 리스트 목록 */}
          <ul className="mt-6 space-y-3">
            {memos.map((memo) => (
              <li 
                key={memo.id} 
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition duration-200"
              >
                <span className="text-gray-800">{memo.content}</span>
                <button 
                  onClick={() => handleDelete(memo.id)}
                  className="text-red-400 hover:text-red-600 hover:bg-red-50 rounded-full p-1 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </li>
            ))}
          </ul>

          {/* 목록이 없을 때 메시지 */}
          {memos.length === 0 && (
            <p className="text-center text-gray-400 mt-10">
              아직 등록된 글이 없어요. <br/>첫 번째 주인공이 되어보세요!
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Guestbook;