# 👜 Word Purse

🌐 **Live at [www.wordpurse.com](https://www.wordpurse.com)**

**A stylish little home for invented words.**

Part dictionary, part idea archive, part community bookshelf for language that doesn't exist yet — except in our heads.

Add original words, define them, share example sentences and origin stories, and browse creative language from other people.

---

## What It Is

Word Purse is for the words that deserve to be *carried*, *saved*, and *shown off*:

- word collectors
- whimsical thinkers
- niche jokesters
- poetic friends
- people with very specific feelings
- anyone whose brain casually invents vocabulary

Think Urban Dictionary, but stylish. Think a Birkin bag — but for language.

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React + Vite, Chakra UI v3 |
| Backend  | Go + Gin |
| Database | PostgreSQL |
| Fonts    | Playfair Display, Lato |

---

## Features

- Browse all invented words in a searchable, paginated gallery
- Submit your own original word with a definition, example sentence, and origin story
- "Carry" a word — upvote words you love
- Fully open / no login required
- Beautiful Birkin-inspired aesthetic: Hermès orange, cognac, cream, and gold

---

## Getting Started

### Prerequisites

- Go 1.21+
- Node.js 18+
- PostgreSQL

### Database Setup

```bash
createdb word_purse
psql -d word_purse -f schema.sql
```

### Backend

```bash
cd server
cp .env.example .env
# Edit .env with your database credentials

go run ./cmd/api/main.go
# API runs on http://localhost:8080
```

### Frontend

```bash
cd client
npm install
npm run dev
# App runs on http://localhost:5173
```

---

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/api/words` | List all words (paginated) |
| GET | `/api/words/search?q=` | Search by term or definition |
| GET | `/api/words/:id` | Get a single word |
| POST | `/api/words` | Add a new word |
| PUT | `/api/words/:id/upvote` | Upvote a word |

---

## Project Structure

```
word-purse/
├── client/              # React + Vite frontend
│   └── src/
│       ├── api/         # API client functions
│       ├── components/  # NavBar, WordCard, SearchBar, PurseIllustration
│       ├── pages/       # HomePage, AddWordPage, WordDetailPage
│       └── theme.js     # Chakra UI v3 theme (Birkin palette)
├── server/              # Go + Gin backend
│   ├── cmd/api/         # Entry point (main.go)
│   └── internal/
│       ├── db/          # PostgreSQL connection + auto-migration
│       ├── handlers/    # API route handlers
│       ├── middleware/  # CORS
│       └── models/      # Word model
└── schema.sql           # Database schema
```

---

> *Because some invented words are too good to lose. Because language should have a place for delight.*
