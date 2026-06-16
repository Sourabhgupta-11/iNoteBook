# iNotebook

A full-stack cloud note-taking app with JWT authentication, a RESTful API, and a polished dark-themed UI. Notes are persisted in MongoDB and secured per-user — no one can read, edit, or delete your notes but you.

**Live demo →** [iNoteBook](i-note-book-lime.vercel.app/)

---

## Features

- **Secure auth** — Sign up / log in with email + password; sessions managed via JWT stored in localStorage
- **Full CRUD** — Create, read, update, and delete notes with title, description, and tag
- **Smart organisation** — Filter notes by tag (Personal, Work, Ideas, Todo, Important) and live-search across title and description
- **Profile sidebar** — Displays name, email, and account creation date fetched from the authenticated API
- **Responsive** — Fully usable on mobile, tablet, and desktop

## Tech stack

| Layer | Technology |
|---|---|
| Frontend | React · React Router v6 · Context API |
| Styling | Custom CSS design system · Space Grotesk · Inter |
| Backend | Node.js · Express.js |
| Database | MongoDB · Mongoose |
| Auth | JWT · bcryptjs |
| Validation | express-validator |


## Running locally

```bash
# 1. Clone
git clone https://github.com/Sourabhgupta-11/iNoteBook.git
cd inotebook

# 2. Backend
cd Backend
npm install
# Create .env with:
#   MONGO_URI=your_mongodb_connection_string
#   JWT_SECRET=your_secret_key
node index.js          # runs on :5000

# 3. Frontend (new terminal)
cd frontend
npm install
# Create .env with:
#   REACT_APP_BASE_URL=http://localhost:5000
npm start              # runs on :3000
```

## API endpoints

| Method | Route | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | — | Register a new user |
| POST | `/api/auth/login` | — | Log in, receive JWT |
| GET | `/api/auth/profile` | ✓ | Get current user details |
| GET | `/api/notes/` | ✓ | Fetch all notes for user |
| POST | `/api/notes/` | ✓ | Add a new note |
| PUT | `/api/notes/:id` | ✓ | Update a note |
| DELETE | `/api/notes/:id` | ✓ | Delete a note |

---

*Portfolio project · Not for production use without additional security hardening*
