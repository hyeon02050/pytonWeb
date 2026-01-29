from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# 파이어베이스 관련 라이브러리 불러오기
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 1. 파이어베이스 인증 및 초기화 
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_key.json") #키 파일 이름
    firebase_admin.initialize_app(cred)

# 2. DB 접속 (Firestore 클라이언트 생성)
db = firestore.client()

app = FastAPI()

# CORS 설정 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Memo(BaseModel):
    content: str

@app.get("/memos")
def get_memos():
    docs = db.collection('memos').stream()
    results = []
    for doc in docs:
        data = doc.to_dict()
        
        results.append({
            "id": doc.id,  
            "content": data['content']
        })
    return results

@app.post("/memos")
def create_memo(memo: Memo):
    
    update_time, ref = db.collection('memos').add(memo.dict())
    return {"id": ref.id, "message": "저장 완료"}

@app.delete("/memos/{memo_id}")  # 주소 뒤에 ID가 붙어서 옵니다 (예: /memos/abc1234)
def delete_memo(memo_id: str):
    db.collection('memos').document(memo_id).delete()
    return {"message": "삭제 성공"}

class Post(BaseModel):
    title: str
    content: str
    author: str

# 2. 게시글 작성 (POST)
@app.post("/posts")
def create_post(post: Post):
    # 'posts'라는 새로운 컬렉션(폴더)에 저장
    doc_ref = db.collection("posts").document()
    doc_ref.set(post.dict())
    return {"id": doc_ref.id, "title": post.title, "content": post.content, "author": post.author}

# 3. 게시글 조회 (GET)
@app.get("/posts")
def get_posts():
    docs = db.collection("posts").stream()
    posts = []
    for doc in docs:
        post_data = doc.to_dict()
        post_data["id"] = doc.id
        posts.append(post_data)
    return posts

# 4. 게시글 삭제 (DELETE)
@app.delete("/posts/{post_id}")
def delete_post(post_id: str):
    db.collection("posts").document(post_id).delete()
    return {"message": "Deleted successfully"}

# 5. 특정 게시글 1개 조회 (GET)
@app.get("/posts/{post_id}")
def get_post(post_id: str):
    doc = db.collection("posts").document(post_id).get()
    if doc.exists:
        return doc.to_dict()
    return {"error": "Post not found"}