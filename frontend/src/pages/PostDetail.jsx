import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function PostDetail() {
  const { id } = useParams(); // URL에서 id 가져오기 (예: /posts/123)
  const navigate = useNavigate();
  const [post, setPost] = useState(null);

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/posts/${id}`)
      .then((res) => res.json())
      .then((data) => setPost(data));
  }, [id]);

  if (!post) return <div className="p-10 text-center">로딩 중...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 mt-10">
      <div className="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
        {/* 헤더: 제목과 작성자 */}
        <div className="bg-gray-50 p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
          <p className="text-gray-500 mt-2">작성자: {post.author || "익명"}</p>
        </div>

        {/* 본문 내용 */}
        <div className="p-8 min-h-[200px] whitespace-pre-wrap text-lg leading-relaxed text-gray-700">
          {post.content}
        </div>

        {/* 하단 버튼 */}
        <div className="bg-gray-50 p-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={() => navigate("/board")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-lg transition"
          >
            목록으로
          </button>
        </div>
      </div>
    </div>
  );
}

export default PostDetail;