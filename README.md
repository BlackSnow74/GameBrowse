# 🎮 GameBrowse

GameBrowse is a React + TypeScript web application for discovering and exploring video games using the RAWG Video Games Database API.

Users can search for games, filter and sort results, browse multiple pages, and open detailed pages containing information, platforms, genres, and screenshots.

## ✨ Features

- 🔎 Search games
- 🎭 Filter by genre
- 🎮 Filter by platform
- ↕️ Sort games by rating, release date, and name
- 📄 Pagination
- 🖼️ Game screenshots
- 📋 Detailed game information
- 🌙 Dark/light mode
- 💾 Persistent theme preference
- ⚡ Loading skeletons
- ❌ Error and empty states
- 📱 Responsive design
- ⏱️ Debounced search
- 🛑 Request cancellation with AbortController

## 🛠️ Tech Stack

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- RAWG API
- ESLint

## 📁 Project Structure

```text
src/
├── components/
│   ├── GameCard.tsx
│   ├── GameCardSkeleton.tsx
│   ├── Navbar.tsx
│   └── ThemeToggle.tsx
│
├── hooks/
│   ├── useGames.ts
│   └── useGameDetails.ts
│
├── pages/
│   └── GameDetailsPage.tsx
│
├── services/
│   └── api-client.ts
│
├── App.tsx
├── main.tsx
├── types.ts
└── index.css
```

### 🚀 Getting Started

**1. Clone the repository**

```bash
git clone https://github.com/BlackSnow74/GameBrowse.git
cd GameBrowse
```

**2. Install dependencies**

```bash
npm install
```

**3. Create your environment file**

Create a `.env` file in the project root:

```
VITE_RAWG_API_KEY=your_rawg_api_key_here
```

You can use `.env.example` as a template.

**4. Start the development server**

```bash
npm run dev
```

### 🔑 API

GameBrowse uses the RAWG Video Games Database API to retrieve game information.

You will need your own RAWG API key to run the project locally.

The API key is provided through the `VITE_RAWG_API_KEY` environment variable.

> Note: Vite client-side environment variables are exposed to the browser. The environment file is ignored by Git to prevent accidentally committing the key, but this does not make the key a server-side secret.

### 📚 What I Practiced

This project helped me practice:

- React component architecture
- TypeScript interfaces and props
- React hooks and custom hooks
- API requests with fetch
- URL query parameters
- Debounced user input
- Loading and error states
- Pagination
- React Router
- Responsive UI development
- Tailwind CSS
- Dark/light theme persistence
- Request cancellation with AbortController
- Environment variables
- Git/GitHub workflow

### 📌 Future Improvements

Possible future improvements include:

- Game favorites
- User accounts
- More advanced filtering
- Game recommendations
- Improved accessibility
- Backend API proxy
- Deployment

### 👨‍💻 Author

Built as a personal React/TypeScript learning and portfolio project.

### 🔗 Repository

[GameBrowse on GitHub](https://github.com/BlackSnow74/GameBrowse)
