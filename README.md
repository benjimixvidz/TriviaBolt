# TriviaBolt 🎯

A modern real-time multiplayer trivia game built with Next.js and Supabase. Challenge your friends with AI-generated questions across various categories!

## Features ✨

- **Real-time Multiplayer**: Compete with friends in real-time
- **AI-Generated Questions**: Fresh and unique questions generated by OpenAI
- **Practice Mode**: Solo practice sessions with diverse categories
- **Live Updates**: Real-time score tracking and leaderboard
- **Modern UI**: Clean and responsive interface using Tailwind CSS and shadcn/ui

## Tech Stack 🛠️

### Frontend
- [Next.js 13+](https://nextjs.org/) with App Router
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [shadcn/ui](https://ui.shadcn.com/) for UI components
- [React Hooks](https://reactjs.org/docs/hooks-intro.html) + Context for state management
- [Lucide React](https://lucide.dev/) for icons

### Backend
- [Supabase](https://supabase.com/) for database and authentication
- [OpenAI API](https://openai.com/) for question generation
- Next.js API Routes

## Getting Started 🚀

### Prerequisites
- Node.js 16.8 or later
- NPM or Yarn
- Supabase account
- OpenAI API key

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/triviabolt.git
cd triviabolt
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Set up environment variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
OPENAI_API_KEY=your_openai_api_key
```

4. Set up the database
Run the following SQL commands in your Supabase SQL editor:

```sql
-- Create profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id),
  username TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create game_sessions table
CREATE TABLE game_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  status TEXT CHECK (status IN ('lobby', 'in_progress', 'ended')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create questions table
CREATE TABLE questions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id),
  category TEXT,
  question_text TEXT,
  correct_answer TEXT,
  incorrect_answers TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT min_incorrect_answers CHECK (array_length(incorrect_answers, 1) >= 1)
);

-- Create player_scores table
CREATE TABLE player_scores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  game_session_id UUID REFERENCES game_sessions(id),
  player_id UUID REFERENCES profiles(id),
  score INTEGER DEFAULT 0
);
```

5. Run the development server
```bash
npm run dev
# or
yarn dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure 📁

```
├── app/                      # Next.js App Router pages
│   ├── auth/                # Authentication pages
│   ├── game/                # Game-related pages
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── auth/               # Authentication components
│   ├── game/               # Game-related components
│   ├── layout/             # Layout components
│   └── ui/                 # Reusable UI components
├── lib/                    # Core logic and utilities
│   ├── auth/              # Authentication logic
│   ├── game/              # Game logic
│   ├── openai/            # OpenAI integration
│   └── supabase/          # Supabase configuration
└── public/                # Static assets
```

## Features in Detail 🔍

### Authentication
- User registration and login via Supabase Auth
- Automatic profile creation
- Session management and persistence

### Game Flow
- **Lobby Phase**: Create/join game sessions, real-time player list updates
- **Game Phase**: Real-time question display, timer-based answering, live score updates
- **End Phase**: Final scores display, winner announcement, option to start new game

### Real-time Features
- Live player updates
- Real-time score tracking
- Instant answer validation
- Live leaderboard updates

## Security 🔒

- Row Level Security (RLS) implemented in Supabase
- Environment variables for sensitive data
- Type-safe database operations

## Contributing 🤝

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License 📄

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments 🙏

- [Next.js Documentation](https://nextjs.org/docs)
- [Supabase Documentation](https://supabase.com/docs)
- [OpenAI Documentation](https://platform.openai.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [shadcn/ui Documentation](https://ui.shadcn.com)
