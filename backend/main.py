from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

# 🔥 파이어베이스 관련 라이브러리 불러오기
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore

# 1. 파이어베이스 인증 및 초기화 (한 번만 실행되어야 함)
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase_key.json") # 🔑 아까 받은 키 파일 이름
    firebase_admin.initialize_app(cred)

# 2. DB 접속 (Firestore 클라이언트 생성)
db = firestore.client()

app = FastAPI()

# CORS 설정 (기존과 동일)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Memo(BaseModel):
    content: str

# ---------------------------------------------------------
# 기존: memos = []  (램 메모리 사용 - 끄면 날아감)
# 변경: db.collection(...) (클라우드 사용 - 안 날아감)
# ---------------------------------------------------------

@app.get("/memos")
def get_memos():
    # 1. 'memos' 컬렉션(폴더)의 모든 문서 가져오기
    docs = db.collection('memos').stream()
    
    # 2. 파이어베이스 데이터를 우리가 쓰는 리스트 형태로 변환
    results = []
    for doc in docs:
        data = doc.to_dict()   # {"content": "안녕"}
        # 나중에 삭제를 위해 ID도 같이 저장해두면 좋음 (일단은 content만)
        results.append({"content": data['content']})
        
    return results

@app.post("/memos")
def create_memo(memo: Memo):
    # 'memos' 컬렉션에 데이터 추가 (자동으로 랜덤 ID 생성됨)
    db.collection('memos').add(memo.dict())
    
    return {"message": "파이어베이스에 저장 완료!"}

@app.delete("/memos")
def clear_memos():
    # 컬렉션 안의 모든 문서 삭제 (조금 복잡함 - Firestore 특징)
    docs = db.collection('memos').stream()
    for doc in docs:
        doc.reference.delete()
        
    return {"message": "싹 다 지웠습니다!"}