---
sidebar_position: 4
---

# NeuroLearn API Reference

This document provides technical details for developers who want to integrate with NeuroLearn or understand the app's architecture.

## 📱 App Architecture

### Technology Stack
- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Navigation**: Expo Router
- **State Management**: React Hooks
- **Storage**: AsyncStorage for local data
- **UI Components**: Custom components with React Native

### Project Structure
```
mobile/
├── app/                    # Main app screens
│   ├── (tabs)/           # Tab-based navigation
│   └── _layout.tsx       # Root layout
├── components/            # Reusable UI components
├── constants/             # App constants and colors
├── hooks/                 # Custom React hooks
├── services/              # Business logic and data services
└── assets/               # Images, fonts, and static files
```

## 🎯 Core Features API

### Learning Session Management

#### Session Flow
```typescript
// Session state management
interface SessionState {
  isRunning: boolean;
  hasStarted: boolean;
  secondsLeft: number;
  topic: string;
}

// Session controls
const startSession = (topic: string) => void;
const pauseSession = () => void;
const resumeSession = () => void;
const resetSession = () => void;
```

#### Session Configuration
```typescript
// Session constants
const SESSION_DURATION_MINUTES = 25;
const TOTAL_SECONDS = SESSION_DURATION_MINUTES * 60;

// Session validation
const validateTopic = (topic: string): boolean => {
  return topic.trim().length > 0;
};
```

### Progress Tracking System

#### XP Service
```typescript
// XP management
interface XPService {
  getTodayXP(): Promise<number>;
  addXP(): Promise<void>;
  recordSessionForStreak(): Promise<void>;
}

// Session history
interface SessionData {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: string;
  duration: number;
}

const addSessionHistory = (sessionData: SessionData): Promise<void>;
const getSessionHistory = (): Promise<SessionData[]>;
```

#### Progress Calculations
```typescript
// Daily progress calculation
const getDailyGoalProgress = async () => {
  const xp = await getTodayXP();
  const goal = 100;
  return {
    xp,
    goal,
    progress: Math.min((xp / goal) * 100, 100)
  };
};
```

## 📊 Analytics & Statistics

### Data Processing
```typescript
interface StatsData {
  totalSessions: number;
  totalTime: number;
  avgConcentration: number | string;
  contributionData: { date: string; count: number }[];
  barChartData: {
    labels: string[];
    datasets: { data: number[] }[];
  };
}

const processSessionData = (sessions: SessionData[]): StatsData => {
  // Process session data for analytics
};
```

### Chart Configuration
```typescript
const chartConfig = {
  backgroundColor: Colors.dark.card,
  backgroundGradientFrom: Colors.dark.card,
  backgroundGradientTo: Colors.dark.card,
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`,
  labelColor: (opacity = 1) => Colors.dark.text,
};
```

## 🎨 UI Components

### Custom Components
```typescript
// HeaderStats component
interface HeaderStatsProps {
  // Component props
}

// AnimatedTabIcon component
interface AnimatedTabIconProps {
  Component: React.ElementType;
  color: string;
  focused: boolean;
}

// StarRating component
interface StarRatingProps {
  rating: number;
  setRating: (rating: number) => void;
}
```

### Styling System
```typescript
// Color scheme
interface Colors {
  dark: {
    text: string;
    background: string;
    primary: string;
    secondary: string;
    accent: string;
    muted: string;
    card: string;
  };
  light: {
    // Light theme colors
  };
}
```

## 🔧 Configuration

### App Configuration
```typescript
// app.config.js
export default {
  expo: {
    name: "NeuroLearn",
    slug: "neurolearn",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "automatic",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff"
    },
    // Additional configuration...
  }
};
```

### Constants
```typescript
// constants/index.ts
export const SESSION_DURATION_MINUTES = 25;
export const DAILY_GOAL_XP = 100;
export const XP_PER_SESSION = 10;
```

## 📱 Navigation

### Tab Navigation
```typescript
// Tab structure
const tabs = [
  { name: 'index', title: 'Home', icon: HomeIcon },
  { name: 'learn', title: 'Learn', icon: BookOpen },
  { name: 'stats', title: 'Stats', icon: BarChart3 },
  { name: 'pause', title: 'Pause', icon: Pause },
  { name: 'settings', title: 'Settings', icon: Settings },
];
```

### Screen Navigation
```typescript
// Navigation patterns
const navigateToLearn = () => router.push('/(tabs)/learn');
const navigateToReview = (topic: string) => 
  router.replace({ pathname: '/(tabs)/review', params: { topic } });
const navigateToPause = () => router.replace('/(tabs)/pause');
```

## 🔄 Data Flow

### State Management
```typescript
// Local state management with React hooks
const [sessionState, setSessionState] = useState<SessionState>({
  isRunning: false,
  hasStarted: false,
  secondsLeft: TOTAL_SECONDS,
  topic: '',
});

// Effect for timer management
useEffect(() => {
  if (!isRunning || !hasStarted) return;
  if (secondsLeft <= 0) {
    // Navigate to review screen
    return;
  }
  const interval = setInterval(() => {
    setSecondsLeft((s) => s - 1);
  }, 1000);
  return () => clearInterval(interval);
}, [secondsLeft, isRunning, hasStarted]);
```

### Data Persistence
```typescript
// AsyncStorage keys
const STORAGE_KEYS = {
  SESSION_HISTORY: 'session_history',
  XP_DATA: 'xp_data',
  STREAK_DATA: 'streak_data',
  USER_PREFERENCES: 'user_preferences',
};
```

## 🎯 Integration Points

### External Services
```typescript
// Potential integration points
interface IntegrationAPI {
  // Analytics service
  trackSession: (sessionData: SessionData) => Promise<void>;
  
  // Cloud sync
  syncData: (localData: any) => Promise<void>;
  
  // Notifications
  scheduleReminder: (time: Date) => Promise<void>;
  
  // Social features
  shareProgress: (progressData: any) => Promise<void>;
}
```

### Plugin System
```typescript
// Plugin interface for extensibility
interface NeuroLearnPlugin {
  name: string;
  version: string;
  initialize: () => Promise<void>;
  onSessionComplete: (sessionData: SessionData) => void;
  onAppLaunch: () => void;
}
```

## 🔒 Security & Privacy

### Data Protection
```typescript
// Data encryption
const encryptData = (data: any): string => {
  // Implement encryption logic
};

const decryptData = (encryptedData: string): any => {
  // Implement decryption logic
};
```

### Privacy Controls
```typescript
interface PrivacySettings {
  allowAnalytics: boolean;
  allowCloudSync: boolean;
  allowNotifications: boolean;
  dataRetentionDays: number;
}
```

## 🚀 Performance

### Optimization Strategies
```typescript
// Memory management
const useSessionCleanup = () => {
  useEffect(() => {
    return () => {
      // Cleanup session data
    };
  }, []);
};

// Lazy loading
const LazyComponent = React.lazy(() => import('./HeavyComponent'));

// Image optimization
const optimizedImage = {
  width: 300,
  height: 200,
  quality: 0.8,
  format: 'webp',
};
```

## 📝 Development Guidelines

### Code Standards
- **TypeScript**: Strict type checking enabled
- **ESLint**: Code quality and consistency
- **Prettier**: Code formatting
- **Testing**: Unit tests for critical functions

### Best Practices
```typescript
// Error handling
const safeAsyncOperation = async (operation: () => Promise<any>) => {
  try {
    return await operation();
  } catch (error) {
    console.error('Operation failed:', error);
    // Handle error appropriately
    throw error;
  }
};

// Performance monitoring
const measurePerformance = (operation: () => void, name: string) => {
  const start = performance.now();
  operation();
  const end = performance.now();
  console.log(`${name} took ${end - start}ms`);
};
```

---

For more detailed implementation examples or to contribute to NeuroLearn, visit our [GitHub repository](https://github.com/neurolearn/neurolearn-mobile). 