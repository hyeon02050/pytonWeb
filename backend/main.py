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