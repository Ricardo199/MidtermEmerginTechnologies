# Midterm Summary Manager (React + GraphQL + MongoDB)

A full-stack summary management app built with:

- **Frontend:** React (Vite), React-Bootstrap, modular functional components
- **Backend:** Node.js, Express, Apollo Server (GraphQL)
- **Database:** MongoDB + Mongoose

---

## Features

- Add, update, delete, and search text summaries
- MongoDB persistence (no in-memory data loss on restart)
- Friendly, modular UI with:
  - Form validation
  - Edit-in-place flow (Edit button auto-populates form)
  - Show All + Search behavior
  - Row-level Delete action

---

## Project Structure

```text
Midterm/
  client/                 # React Vite frontend
    src/
      components/
        summary/
          useSummaryManager.js
          SummaryForm.jsx
          SummaryActions.jsx
          SummarySearch.jsx
          SummaryResults.jsx
        SummaryApi.js
  server/                 # GraphQL API + MongoDB
    src/
      config/db.js
      models/TextSummary.js
      index.js
```

---

## Prerequisites

- Node.js 18+ (recommended: current LTS)
- npm
- MongoDB running locally or a MongoDB Atlas connection string

---

## Environment Setup

Create `server/.env`:

```env
MONGODB_URI=mongodb://127.0.0.1:27017/Ricardo-Burgos-summary-db
```

You can copy from `server/.env.example` and adjust as needed.

---

## Install Dependencies

From the project root:

```bash
npm install
```

---

## Run the App

From the project root:

```bash
npm run dev
```

This starts:

- **Backend** on `http://localhost:4000/graphql`
- **Frontend** on `http://localhost:5173` (or next available Vite port)

---

## Build Frontend

```bash
npm run build --workspace client
```

---

## GraphQL API Quick Reference

### Queries

- `getSummaries`
- `getsummaryID(summaryID: ID!)`
- `getOriginalText(originalText: String!)`
- `getTimestamp(timestamp: String!)`
- `getKeyword(keyword: String!)`
- `getRatingRange(minRating: Float!, maxRating: Float!)`

### Mutations

- `addSummary(input: AddSummaryInput!)`
- `updateSummary(summaryID: ID, input: AddSummaryInput!)`
- `deleteSummary(summaryID: ID!)`

---

## Common Issues

### 1) `EADDRINUSE: address already in use :::4000`
Another process is already using port 4000. Stop the old process, then rerun `npm run dev`.

### 2) White page on frontend
Usually caused by stale processes or dependency mismatch. Use:

```bash
npm prune
npm install
```

Then restart `npm run dev`.

### 3) Search results hide all summaries
Use the **Show All** button in the UI to restore full summary list.

---

## Notes

- Collection name is derived from the model `TextSummary` and becomes **`textsummaries`** by default.
- The app uses modular React components and hooks to keep the frontend maintainable.
