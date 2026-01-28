import { useState, useEffect } from 'react';

function App() {
  const [memos, setMemos] = useState([]);
  const [input, setInput] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/memos")
      .then(res => res.json())
      .then(data => setMemos(data));
  }, []);

  const handleSubmit = () => {
    fetch("http://127.0.0.1:8000/memos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: input }),
    })
    .then((res) => res.json())
    .then((data) => {
      // 🆕 서버가 돌려준 진짜 ID를 사용해서 목록에 추가
      const newMemo = { id: data.id, content: input };
      setMemos([...memos, newMemo]);
      setInput("");
    });
  };

  // 🆕 특정 메모 하나만 지우는 함수
  const handleDelete = (id) => {
    fetch(`http://127.0.0.1:8000/memos/${id}`, { // 주소 끝에 ID를 붙임
      method: "DELETE",
    })
    .then(() => {
      // 화면에서도 그 녀석만 쏙 빼고 다시 그리기 (Filter 함수 사용)
      setMemos(memos.filter((memo) => memo.id !== id));
    });
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1> 한 줄 방명록</h1>
      <input 
        value={input} 
        onChange={(e) => setInput(e.target.value)} 
      />
      <button onClick={handleSubmit}>남기기</button>
      
      <ul>
        {memos.map((memo) => (
          // key값은 이제 고유한 id를 쓰는 게 정석입니다.
          <li key={memo.id} style={{ marginBottom: "5px" }}>
            {memo.content} 
            {/* 🆕 각 항목 옆에 삭제 버튼 달기 */}
            <button 
              onClick={() => handleDelete(memo.id)} 
              style={{ marginLeft: "10px", cursor: "pointer" }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;