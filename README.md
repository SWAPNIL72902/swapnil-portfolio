# Swapnil Pahari — AI Portfolio

An interactive AI-powered portfolio built with Next.js, Claude API, and Tailwind CSS.

## Tech Stack

- **Next.js 15** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Claude API** (Anthropic) — streaming responses
- **Framer Motion** — animations
- **React Markdown** — renders AI responses

## Project Structure

```
portfolio/
├── app/
│   ├── page.tsx              # Main page
│   ├── layout.tsx            # Root layout + metadata
│   ├── globals.css           # Global styles
│   └── api/
│       └── chat/
│           └── route.ts      # Streaming Claude API endpoint
├── components/
│   ├── hero/
│   │   └── HeroSection.tsx   # Animated hero with typewriter
│   ├── chat/
│   │   └── ChatInterface.tsx # Full chat UI with streaming
│   └── sections/
│       ├── NavBar.tsx        # Sticky nav
│       ├── ProjectsSection.tsx  # 3 PM project cards
│       └── AboutSection.tsx  # Bio, skills, timeline
├── lib/
│   ├── anthropic.ts          # System prompt + resume data
│   └── utils.ts              # cn() helper
├── .env.example
├── vercel.json
└── package.json
```

## Local Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Set environment variable

Copy `.env.example` to `.env.local` and add your key:

```bash
cp .env.example .env.local
```

Then edit `.env.local`:
```
ANTHROPIC_API_KEY=sk-ant-...
```

Get your API key from: https://console.anthropic.com

### 3. Run locally

```bash
npm run dev
```

Open http://localhost:3000

## Deploy to Vercel

### Option A: Vercel CLI

```bash
npm i -g vercel
vercel
```

Follow the prompts. When asked for environment variables, add `ANTHROPIC_API_KEY`.

### Option B: GitHub + Vercel Dashboard

1. Push this repo to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. In **Environment Variables**, add:
   - Key: `ANTHROPIC_API_KEY`
   - Value: `sk-ant-...`
5. Click **Deploy**

## Features

- **Streaming AI chat** — real-time token-by-token responses
- **Project deep-dives** — "Ask AI" buttons pre-load project context
- **Suggested prompts** — guides recruiters toward best conversations
- **Responsive** — works on mobile, tablet, desktop
- **Dark theme** — premium cinematic feel
- **Stop generation** — cancel mid-stream

## Customization

To update the AI's knowledge, edit `/lib/anthropic.ts`:
- `RESUME_CONTEXT` — all facts the AI knows about Swapnil
- `SYSTEM_PROMPT` — personality, tone, response framework
