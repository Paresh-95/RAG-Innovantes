# Gemini RAG Assistant

A Retrieval-Augmented Generation (RAG) application that enables users to upload PDF documents and ask questions about their contents. The system uses Google's Gemini AI model to generate accurate answers based on the document content.

## Table of Contents

- [Quick Start](#quick-start)
- [Architecture](#architecture)
- [Key Design Decisions](#key-design-decisions)
- [Known Limitations](#known-limitations)

---

## Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Google API key with Gemini API access

### Setup Instructions

#### 1. Clone and Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

#### 2. Environment Configuration

Create a `.env` file in the `backend` directory:

```
GOOGLE_API_KEY=your_google_api_key_here
GEMINI_API_KEY=your_gemini_api_key_here
PORT=3000
```

#### 3. Run the Application

```bash
# Terminal 1: Start the backend (from backend directory)
npm run dev

# Terminal 2: Start the frontend (from frontend directory)
npm run dev
```

The application will be available at:
- **Frontend**: http://localhost:5173
- **Backend**: http://localhost:3000

---

## Architecture

### High-Level System Overview

```
┌─────────────────────┐
│   Frontend (React)  │
│  - Upload PDF       │
│  - Ask Questions    │
└──────────┬──────────┘
           │ HTTP/JSON
           ▼
┌─────────────────────────────────────┐
│      Backend (Express.js)           │
├─────────────────────────────────────┤
│  Routes:                            │
│  ├─ /documents (PDF upload)         │
│  └─ /ask (Question answering)       │
├─────────────────────────────────────┤
│  Middleware:                        │
│  ├─ logger (request logging)        │
│  ├─ rateLimiter (rate limiting)     │
│  └─ errorMiddleware (error handling)│
├─────────────────────────────────────┤
│  Services:                          │
│  ├─ pdfService (PDF text extraction)│
│  ├─ textSplitterService (chunking)  │
│  ├─ vectorStoreService (embeddings) │
│  ├─ ragService (Q&A with LLM)       │
│  └─ cacheService (response caching) │
└──────────┬──────────────────────────┘
           │
    ┌──────┴──────────────────┐
    ▼                         ▼
┌─────────────────┐  ┌──────────────────┐
│ Vector Store    │  │ Google Gemini AI │
│ (In-Memory)     │  │ LLM              │
└─────────────────┘  └──────────────────┘
```

### Component Breakdown

#### **Frontend** (`frontend/`)
- **React + Vite**: Modern, fast development environment
- **Tailwind CSS**: Utility-first styling
- **Components**:
  - `uploadPDF.jsx`: Handles PDF file upload
  - `askQuestions.jsx`: Displays question interface and answers

#### **Backend** (`backend/`)

**Routes**:
- `POST /documents`: Upload and index PDF documents
- `POST /ask`: Submit questions about uploaded documents

**Controllers**:
- `documentController.js`: Handles PDF processing pipeline
- `askController.js`: Manages question answering requests

**Services**:
- `pdfService.js`: Extracts text from PDF files
- `textSplitterService.js`: Splits text into manageable chunks
- `vectorStoreService.js`: Creates embeddings and stores vectors in-memory
- `ragService.js`: Orchestrates RAG pipeline with Gemini LLM
- `cacheService.js`: Caches answers to repeated questions

**Models**:
- `vectorStoreModel.js`: Global vector store state management

**Middleware**:
- `logger.js`: Request/response logging
- `rateLimiter.js`: Rate limiting for API protection
- `errorMiddleware.js`: Centralized error handling

---

## Key Design Decisions

### 1. **In-Memory Vector Store**
- **Decision**: Used `MemoryVectorStore` instead of persistent database
- **Rationale**: Simplified development, faster prototyping, zero infrastructure overhead
- **Trade-off**: Vector data is lost on server restart; suitable for demonstration/prototype

### 2. **Response Caching**
- **Decision**: Implemented simple in-memory cache for frequently asked questions
- **Rationale**: Reduces API calls to Gemini, improves response time, saves costs
- **Implementation**: Cache key is the question string; stored in memory

### 3. **Text Chunking Strategy**
- **Decision**: Split documents into semantic chunks before embedding
- **Rationale**: Improves retrieval accuracy by providing focused context to the LLM
- **Benefit**: Answers are more precise and relevant

### 4. **CORS Configuration**
- **Decision**: Explicitly allow only `localhost:5173` origin
- **Rationale**: Security best practice; prevents unauthorized cross-origin requests during development
- **Note**: Should be updated for production environments

### 5. **Google Gemini API**
- **Decision**: Used Google's Gemini 3.5 Flash model instead of OpenAI/other providers
- **Rationale**: Cost-effective, low-latency responses, integrated embeddings
- **Temperature**: Set to 0 for deterministic, factual responses

### 6. **Separation of Concerns**
- **Decision**: Distinct service layer for business logic
- **Rationale**: Improves maintainability, testability, and code reusability

---

## Known Limitations

### 1. **Vector Store Persistence**
- Vector embeddings are stored only in memory and are **lost when the server restarts**
- Users must re-upload PDFs after server restarts
- **Mitigation**: Implement persistent storage (PostgreSQL + pgvector, Pinecone, or similar) for production

### 2. **Scalability Constraints**
- In-memory vector store will run out of memory with large documents
- Single-server deployment not suitable for production traffic
- **Mitigation**: Migrate to distributed vector database and multi-server architecture

### 3. **Rate Limiting**
- Basic rate limiting in place but not persistent across server restarts
- **Mitigation**: Use Redis for distributed rate limiting in production

### 4. **PDF Size Restrictions**
- No explicit file size limit; large PDFs may cause memory issues
- **Mitigation**: Implement file size validation and chunking strategies

### 5. **Language Support**
- Assumes English documents; may have issues with other languages
- **Mitigation**: Add language detection and support for non-English content

---

## Technology Stack

### Frontend
- **React 19**: UI framework
- **Vite**: Build tool and dev server
- **Tailwind CSS**: Styling
- **React Icons**: Icon library

### Backend
- **Express.js**: Web framework
- **LangChain**: RAG framework and LLM orchestration
- **Google Generative AI**: Embeddings and LLM
- **PDF.js**: PDF text extraction
- **Multer**: File upload handling

### Infrastructure
- **Node.js**: Runtime
- **Express CORS**: Cross-origin request handling
- **Rate Limiter**: API protection

---
