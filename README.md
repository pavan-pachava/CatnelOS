# CatnelOS - Your Life as a Living Data OS

A comprehensive personal analytics platform that tracks and visualizes your life data across multiple integrations.

## Features

### 🔌 Data Integrations
- **Spotify**: Listening history, audio features (BPM, energy, valence), recently played, top tracks
- **GitHub**: Commits, PRs, code reviews, languages, contribution streaks
- **Weather API**: Temperature, humidity, UV index correlated with behavior
- **Wakatime**: Precise coding time per language

### 📊 Daily Dashboard
- **Today at a Glance**: 4 key metrics (energy, streak, coding, mood)
- **Morning Briefing**: AI-generated summary of your patterns
- **Live Now Widget**: Current track, focus mode
- **Streak Tracker**: Multiple habit streaks with progress
- **Week Heatmap**: 7-day productivity visualization
- **Focus Score**: Daily 0-100 composite score

### ✨ Correlation Insights
- Music → Productivity correlation
- Weather → Mood effects
- Sleep proxy detection
- Anomaly alerts
- Optimal work window detection

### 📈 Deep Analytics
- **Listening Timeline**: Full Spotify history with filters
- **Coding Timeline**: Commit frequency and patterns
- **Time Allocation**: Meetings vs deep work breakdown
- **Monthly Retrospective**: Auto-generated monthly insights
- **Year in Review**: Annual summary and statistics
- **Custom Metric Builder**: Define your own formulas

## Tech Stack

- **Frontend**: Next.js 14+ with React & TypeScript
- **Styling**: Tailwind CSS (dark theme)
- **Visualization**: Recharts for charts
- **State Management**: React Context + Hooks
- **Mock Data**: Built-in demo data for exploration

## Getting Started

### Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Demo Mode

The app runs in demo mode with mock data. Simply:
1. Visit the landing page
2. Click "Get Started"
3. Enter any email on the login page
4. Explore all dashboards and features

## Project Structure

```
.
├── app/                      # Next.js app directory
│   ├── page.tsx             # Landing page
│   ├── login/
│   │   └── page.tsx         # Login page
│   ├── dashboard/
│   │   ├── layout.tsx       # Dashboard layout with sidebar
│   │   ├── daily/
│   │   ├── integrations/
│   │   ├── insights/
│   │   ├── analytics/
│   │   └── profile/
│   ├── layout.tsx           # Root layout
│   └── globals.css          # Global styles
├── components/
│   ├── ui/                  # Base components (Button, Card, Badge)
│   ├── charts/              # Chart components (HeatmapGrid)
│   ├── Sidebar.tsx          # Dashboard sidebar
│   ├── MetricCard.tsx       # Metric display card
│   └── InsightCard.tsx      # Insight card component
├── lib/
│   ├── auth-context.tsx     # Authentication state
│   └── mockData.ts          # Mock data for demo
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Key Pages

- `/` - Landing page showcasing features
- `/login` - Login page (demo mode)
- `/dashboard/daily` - Main daily dashboard
- `/dashboard/integrations` - Connected integrations status
- `/dashboard/insights` - Correlation insights
- `/dashboard/analytics` - Deep analytics & charts
- `/dashboard/profile` - User profile & settings

## Styling

All components use Tailwind CSS with a dark theme. Key colors:
- **Slate**: Primary neutral color (`#0f172a` - `#e2e8f0`)
- **Purple/Indigo**: Accent gradient
- **Green/Orange/Red**: Status indicators

## Future Enhancements

- Real backend integration with Next.js API routes
- PostgreSQL + TimescaleDB for event storage
- FastAPI ML service for correlations
- Redis caching layer
- BullMQ job queue for background workers
- Stripe integration for subscriptions
- Real OAuth flows for Spotify, GitHub
- Dark/Light theme toggle
- Mobile app (React Native)

## Building for Production

```bash
npm run build
npm start
```

## License

MIT
