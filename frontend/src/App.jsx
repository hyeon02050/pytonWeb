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
    .then(() => {
      setMemos([...memos, { content: input }]);
      setInput("");
    });
  };

  const handleReset = () => {
    fetch("http://127.0.0.1:8000/memos", {
      method: "DELETE",
    })
    .then(() => {
      // 서버가 "삭제했다"고 응답하면, 내 화면(State)도 비워줘야 합니다.
      setMemos([]); 
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
      <button 
        onClick={handleReset} 
        style={{ marginLeft: "10px", backgroundColor: "#ffdddd" }}
      >
        초기화 🗑️
      </button>
      <ul>
        {memos.map((memo, index) => (
          <li key={index}>{memo.content}</li>
        ))}
      </ul>

    </div>
    

);
}

export default App;