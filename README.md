# X Analytics Dashboard

A beautiful, free analytics dashboard for your X (Twitter) account. View detailed insights about your posts including impressions, engagement rates, and trends.

![X Analytics Dashboard](https://img.shields.io/badge/X-Analytics-000000?style=for-the-badge&logo=x&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-16.0-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.1-38B2AC?style=for-the-badge&logo=tailwind-css)

## Features

- **OAuth 2.0 Authentication** - Secure login with your X account
- **Post Analytics** - View impressions, likes, retweets, and replies for all your posts
- **Engagement Metrics** - Calculate engagement rates and track performance
- **Visual Charts** - Beautiful charts showing trends over time
- **Top Posts Analysis** - See your best-performing posts by impressions and engagement
- **100% Free** - Works with X API free tier (no cost!)
- **Multi-User Support** - Anyone can log in and see their own analytics

## What You'll See

- Total tweets, impressions, likes, retweets
- Average engagement rate
- Impressions trend chart
- Engagement over time chart
- Top 5 posts by impressions
- Top 5 posts by engagement rate

## Prerequisites

- Node.js 18+ installed
- An X (Twitter) Developer account
- X API credentials (Client ID and Client Secret)

## Setup Instructions

### 1. Get X API Credentials

1. Go to [X Developer Portal](https://developer.twitter.com/en/portal/dashboard)
2. Create a new project and app (if you don't have one)
3. In your app settings, go to "Keys and tokens"
4. Enable OAuth 2.0
5. Set the OAuth 2.0 settings:
   - **Type of App**: Web App
   - **Callback URLs**: `http://localhost:3000/api/auth/callback/twitter`
   - **Website URL**: `http://localhost:3000`
6. Save your **Client ID** and **Client Secret**

### 2. Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd X-DASHBOARD

# Install dependencies
npm install
```

### 3. Configure Environment Variables

```bash
# Copy the example env file
cp .env.example .env

# Edit .env with your credentials
```

Update `.env` with your values:

```env
# X (Twitter) API Credentials
TWITTER_CLIENT_ID=your_actual_client_id_here
TWITTER_CLIENT_SECRET=your_actual_client_secret_here

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_a_random_secret_here

# X API Settings
TWITTER_API_VERSION=2
```

To generate `NEXTAUTH_SECRET`, run:
```bash
openssl rand -base64 32
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. Click "Sign in with X" on the homepage
2. Authorize the app to access your X account
3. View your analytics dashboard with all your post insights!

## How It Works

1. **Authentication**: Users authenticate via OAuth 2.0 with their X account
2. **Data Fetching**: The app fetches the user's recent tweets (up to 100) with full analytics
3. **Analytics Calculation**: Engagement rates, trends, and insights are calculated in real-time
4. **Visualization**: Beautiful charts and cards display the analytics

## API Limitations

### Free Tier (What This App Uses)
- ✅ OAuth 2.0 user authentication
- ✅ Up to 1,500 tweets read per month per user
- ✅ Public metrics (likes, retweets, replies)
- ✅ Non-public metrics (impressions) - **last 30 days only**
- ✅ Perfect for personal use!

### Important Notes
- **Impressions data** is only available for posts from the **last 30 days**
- Each user authenticates with their own account, so quota is per user
- Completely free for unlimited users!

## Tech Stack

- **Frontend**: Next.js 16 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS 4.1
- **Charts**: Recharts
- **Authentication**: NextAuth.js with X OAuth 2.0
- **API**: X API v2

## Project Structure

```
X-DASHBOARD/
├── app/
│   ├── api/
│   │   ├── auth/[...nextauth]/  # NextAuth configuration
│   │   └── twitter/             # X API routes
│   ├── dashboard/               # Dashboard page
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Landing page
│   └── globals.css              # Global styles
├── components/
│   └── dashboard/               # Dashboard components
│       ├── StatsCard.tsx
│       ├── TweetCard.tsx
│       ├── EngagementChart.tsx
│       └── ImpressionsChart.tsx
├── lib/
│   ├── types.ts                 # TypeScript types
│   ├── twitter.ts               # X API functions
│   └── analytics.ts             # Analytics calculations
└── README.md
```

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Update X API callback URL to `https://your-domain.vercel.app/api/auth/callback/twitter`
5. Update `NEXTAUTH_URL` in Vercel env vars
6. Deploy!

### Deploy to Other Platforms

Make sure to:
- Set all environment variables
- Update callback URLs in X Developer Portal
- Update `NEXTAUTH_URL` to your production domain

## Troubleshooting

### "Failed to fetch tweets"
- Check if your X API credentials are correct
- Ensure you have the correct OAuth 2.0 scopes enabled
- Verify your app has read permissions

### "Unauthorized" Error
- Make sure `NEXTAUTH_SECRET` is set
- Check if `NEXTAUTH_URL` matches your current URL
- Clear cookies and try logging in again

### No Impressions Data
- Impressions are only available for posts from the last 30 days
- You need OAuth 2.0 user context (which this app uses)
- Make sure you're fetching with the correct metrics fields

## Contributing

Feel free to submit issues or pull requests!

## License

MIT License - feel free to use this for personal or commercial projects.

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- Icons from [Lucide](https://lucide.dev/)
- Charts by [Recharts](https://recharts.org/)

---

**Built for X Analytics Enthusiasts** 🚀
