# Summary Manager

A full-stack web application for creating, organizing, and searching text summaries. Built on a modern JavaScript stack with a GraphQL API and persistent MongoDB storage.

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 19, Vite, React-Bootstrap |
| **Backend** | Node.js, Express, Apollo Server (GraphQL) |
| **Database** | MongoDB, Mongoose |
| **Dev tooling** | Nodemon, Concurrently |

---

## Features

- **Create** summaries with original text, a condensed summary, keywords, word count, and a 1–5 rating
- **Edit** existing summaries via an inline edit flow that auto-populates the form
- **Delete** individual summaries with a single click
- **Search** by keyword, original text content, rating range, or timestamp
- **Show All** to reset any active search and display the full list
- **Persistent storage** — data survives server restarts via MongoDB
- Modular, component-driven React frontend with form validation

---

## Project Structure

```text
.
├── client/                        # React + Vite frontend
│   └── src/
│       ├── components/
│       │   ├── summary/
│       │   │   ├── SummaryForm.jsx
│       │   │   ├── SummaryActions.jsx
│       │   │   ├── SummarySearch.jsx
│       │   │   ├── SummaryResults.jsx
│       │   │   └── useSummaryManager.js
│       │   ├── AddSummary.jsx
│       │   ├── AppHeader.jsx
│       │   └── SummaryApi.js
│       ├── App.jsx
│       └── main.jsx
└── server/                        # Apollo GraphQL API + MongoDB
    └── src/
        ├── config/db.js
        ├── models/TextSummary.js
        └── index.js
```

---

## Prerequisites

- **Node.js** 18 or later (current LTS recommended)
- **npm** 9 or later
- **MongoDB** — a locally running instance or a [MongoDB Atlas](https://www.mongodb.com/atlas) connection string

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Ricardo199/MidtermEmerginTechnologies.git
cd MidtermEmerginTechnologies
```

### 2. Configure environment variables

Copy the example env file and update the connection string if needed:

```bash
cp server/.env.example server/.env
```

`server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/summary-manager-db
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development servers

```bash
npm run dev
```

This launches both services concurrently:

| Service | URL |
|---------|-----|
| GraphQL API | `http://localhost:4000/graphql` |
| React frontend | `http://localhost:5173` |

---

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start both frontend and backend in watch mode |
| `npm run dev:client` | Start only the Vite dev server |
| `npm run dev:server` | Start only the Node/Apollo server |
| `npm run build` | Build the React frontend for production |
| `npm run start` | Start the backend in production mode |

---

## GraphQL API Reference

The API is available at `http://localhost:4000/graphql` and can be explored interactively via the Apollo Sandbox.

### Queries

| Operation | Arguments | Returns |
|-----------|-----------|---------|
| `getSummaries` | — | `[TextSummary]` |
| `getsummaryID` | `summaryID: ID!` | `TextSummary` |
| `getOriginalText` | `originalText: String!` | `[TextSummary]` |
| `getTimestamp` | `timestamp: String!` | `[TextSummary]` |
| `getKeyword` | `keyword: String!` | `[TextSummary]` |
| `getRatingRange` | `minRating: Float!, maxRating: Float!` | `[TextSummary]` |

### Mutations

| Operation | Arguments | Returns |
|-----------|-----------|---------|
| `addSummary` | `input: AddSummaryInput!` | `TextSummary` |
| `updateSummary` | `summaryID: ID, input: AddSummaryInput!` | `TextSummary` |
| `deleteSummary` | `summaryID: ID!` | `Boolean` |

### `AddSummaryInput` fields

```graphql
input AddSummaryInput {
  summaryID:    ID!
  originalText: String!
  summary:      String!
  keywords:     [String]!
  rating:       Float!      # 1.0 – 5.0
  wordCount:    Int!
}
```

---

## Data Model

MongoDB collection: **`textsummaries`**

| Field | Type | Notes |
|-------|------|-------|
| `summaryID` | String | Unique identifier |
| `originalText` | String | Full source text |
| `summary` | String | Condensed version |
| `timestamp` | String | ISO 8601, set on create/update |
| `keywords` | [String] | Searchable tags |
| `rating` | Number | 1–5 |
| `wordCount` | Number | Word count of the original text |

---

## Troubleshooting

### `EADDRINUSE: address already in use :::4000`

Another process is occupying port 4000. Find and stop it, then rerun `npm run dev`:

```bash
# macOS / Linux
lsof -ti :4000 | xargs kill
```

### Blank white page on the frontend

Usually caused by stale processes or a dependency mismatch. Run:

```bash
npm prune && npm install
npm run dev
```

### Search hides all summaries

Click the **Show All** button in the UI to clear the active search and restore the full list.

---

## License

This project is licensed under the terms of the [LICENSE](LICENSE) file included in this repository.
