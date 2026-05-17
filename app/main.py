from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.models import ChatRequest
from app.chatbot import generate_reply

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=[ "*",
        "https://shl-assessment-agent-tau.vercel.app",
        "https://shl-assessment-agent-50wwrihsq-sudhanshu-varmas-projects.vercel.app"
    ],
    allow_credentials=False,
    allow_methods=["GET", "POST", "OPTIONS"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/chat")
def chat(req: ChatRequest):
    # Convert Pydantic objects to plain dicts
    messages = [{"role": m.role, "content": m.content} for m in req.messages]
    result = generate_reply(messages)
    return {
        "reply": result["reply"],
        "recommendations": result["recommendations"],
        "end_of_conversation": result["end_of_conversation"],
    }
