# SHL Assessment Recommendation Chatbot

An AI-powered conversational recommendation system for SHL assessments built using FastAPI, React, semantic search, and Gemini AI.

This project helps recruiters and hiring teams discover relevant SHL assessments based on hiring requirements, skills, personality traits, cognitive abilities, and role-specific needs.

---

# Features

## Conversational AI Chatbot

* ChatGPT-style AI interface
* Interactive recruiter-focused conversations
* Real-time responses
* Modern responsive UI

## SHL Assessment Recommendations

* Recommends relevant SHL assessments
* Provides direct SHL assessment links
* Supports role-based and skill-based recommendations

## Semantic Search Retrieval

* Uses Sentence Transformers embeddings
* FAISS-based similarity search
* Context-aware assessment retrieval

## Conversation Intelligence

* Clarification questions for vague queries
* Refinement handling
* Comparison support
* Off-topic query rejection

## Modern Frontend UI

* React frontend
* Modern dark AI-chatbot design
* Recommendation cards
* Smooth conversational experience

---

# Example Queries

## Hiring Queries

* Hiring Java backend developers with coding skills
* Need personality assessments for managers
* Hiring analysts with numerical reasoning skills

## Refinement Queries

* Also add personality assessments
* Include coding simulations too

## Comparison Queries

* What is the difference between OPQ and SJT?

---

# Tech Stack

## Frontend

* React.js
* Axios
* CSS-in-JS Styling

## Backend

* FastAPI
* Python

## AI / NLP

* Sentence Transformers
* FAISS
* Google Gemini AI

## Data Collection

* BeautifulSoup
* Requests

---

# Project Architecture

```text
Frontend (React Chat UI)
        ↓
FastAPI Backend
        ↓
Conversation Logic
        ↓
Semantic Retrieval (FAISS + Embeddings)
        ↓
SHL Assessment Catalog
```

---

# Folder Structure

```text
shl-assessment-agent/
│
├── app/
│   ├── main.py
│   ├── chatbot.py
│   ├── retriever.py
│   ├── models.py
│
├── data/
│   └── catalog.json
│
├── scraper/
│   └── scrape_shl.py
│
├── frontend/
│   ├── src/
│   └── public/
│
├── requirements.txt
├── README.md
└── .env
```

---

# Installation & Setup

## Backend Setup

### Clone Repository

```bash
git clone <your-github-repo-url>
cd shl-assessment-agent
```

### Create Virtual Environment

```bash
python -m venv venv
```

### Activate Environment

#### Windows

```bash
venv\Scripts\activate
```

#### Mac/Linux

```bash
source venv/bin/activate
```

### Install Dependencies

```bash
pip install -r requirements.txt
```

---

# Environment Variables

Create a `.env` file in the root directory.

```env
GEMINI_API_KEY=your_api_key_here
```

---

# Run Backend

```bash
python -m uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

Swagger API Docs:

```text
http://127.0.0.1:8000/docs
```

---

# Frontend Setup

```bash
cd frontend
npm install
npm start
```

Frontend runs on:

```text
http://localhost:3000
```

---

# API Endpoint

## POST /chat

### Request Format

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Hiring Java backend developers with coding skills"
    }
  ]
}
```

### Response Format

```json
{
  "reply": "I found 5 relevant SHL assessments for your needs.",
  "recommendations": [
    {
      "name": "Coding Simulations",
      "url": "https://www.shl.com/...",
      "test_type": "Coding"
    }
  ],
  "end_of_conversation": true
}
```

---

# Key Functionalities

## Clarification Handling

If the query is vague, the chatbot asks follow-up questions.

Example:

```text
User: I need an assessment
Bot: Can you share more details about the role, seniority, and required skills?
```

---

## Refinement Support

The chatbot updates recommendations when users modify requirements.

Example:

```text
User: Also add personality assessments
```

---

## Comparison Support

Supports comparison-style questions.

Example:

```text
User: What is the difference between OPQ and SJT?
```

---

## Off-topic Rejection

Rejects unrelated queries politely.

Example:

```text
User: Give me legal advice
Bot: I can only help with SHL assessment recommendations.
```

---

# Deployment

## Frontend Deployment

* Vercel

## Backend Deployment

* Render

---

# Future Improvements

* Better ranking algorithms
* Metadata-aware recommendations
* Advanced conversational memory
* Improved SHL scraping
* Authentication support
* Analytics dashboard
* Multi-user support
* Mobile optimization

---

# Author

Sudhanshu Verma

B.Tech IT Student

Built as part of the SHL Research Intern AI Assignment.