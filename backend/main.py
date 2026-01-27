from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# 5173 포트(리액트)에서 오는 요청 허용
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Memo(BaseModel):
    content: str

memos = []

@app.get("/memos")
def get_memos():
    return memos

@app.post("/memos")
def create_memo(memo: Memo):
    memos.append(memo)
    return {"message": "저장 완료"}