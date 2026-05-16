from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import ChatRequest
from app.chatbot import generate_reply

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://shl-assessment-agent-tau.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
def chat(req: ChatRequest):
    result = generate_reply(req.messages)

    return {
        "reply": result["reply"],
        "recommendations": result["recommendations"],
        "end_of_conversation": result["end"]
    }