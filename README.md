# AI Prompt Client

A lightweight React app where you can enter a prompt, send it to the OpenAI API, and view the response. Includes chat history and a Clear button.

## Features

- **Prompt input** — Text area and Submit button to send prompts to the AI
- **OpenAI integration** — Uses OpenAI Chat Completions API (e.g. `gpt-3.5-turbo`)
- **Dynamic results** — Latest response shown above; past prompts and responses listed below
- **Loading state** — Spinner and “Getting response...” while the request is in progress
- **Error handling** — API and validation errors shown with a dismiss control
- **Chat history** — Past prompts and responses saved in the UI and in `localStorage` (last 50)
- **Clear button** — Clears current response and full history

## Setup

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later)
- An [OpenAI API key](https://platform.openai.com/api-keys)

### Install and run

1. **Clone the repo**
   ```bash
   git clone <your-repo-url>
   cd ai-prompt-client
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure the API key**  
   Create a `.env` file in the project root (see `.env.example`):
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and set your OpenAI API key:
   ```
   VITE_OPENAI_API_KEY=sk-your-actual-key-here
   ```
   Do not commit `.env` or your real key.

4. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open the URL shown in the terminal (e.g. `http://localhost:5173`).

### Build for production

```bash
npm run build
```

Output is in `dist/`. Preview with:

```bash
npm run preview
```

## Tech stack

- **React 18** — UI
- **Vite** — Build and dev server
- **OpenAI API** — Chat completions

No backend required; the app runs in the browser and calls OpenAI from the client. Keep your API key in `.env` only and do not expose it in the repo.
