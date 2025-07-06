---
sidebar_position: 5
---

# Code Reference

Complete documentation for all components, functions, and utilities in the NeuroLearn mobile app.

## 📱 Components

### Popup Component

<details>
<summary><strong>📁 File Location:</strong> `components/Popup.tsx`</summary>

**Description:** A reusable modal popup component with different types (success, error, warning, info) and customizable buttons.

**Import:**
```typescript
import { Popup, popup, GlobalPopup } from '@/components/Popup';
```

**Component Props:**
```typescript
interface PopupProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  button1Text?: string;
  button2Text?: string;
  button1Action?: () => void;
  button2Action?: () => void;
  type?: 'success' | 'error' | 'warning' | 'info';
}
```

**Usage Examples:**

1. **Basic Popup:**
```typescript
import { popup } from '@/components/Popup';

// Show a simple info popup
popup.show('Info', 'This is an informational message.', 'OK');

// Show success popup
popup.show('Success!', 'Operation completed successfully.', 'Great!', undefined, undefined, undefined, 'success');

// Show error popup
popup.show('Error', 'Something went wrong.', 'OK', undefined, undefined, undefined, 'error');

// Show warning popup
popup.show('Warning', 'Please be careful.', 'I Understand', undefined, undefined, undefined, 'warning');
```

2. **Two-Button Popup:**
```typescript
popup.show(
  'Confirm Action',
  'Are you sure you want to proceed?',
  'Confirm',
  'Cancel',
  () => console.log('Confirmed'),
  () => console.log('Cancelled'),
  'warning'
);
```

3. **Direct Component Usage:**
```typescript
import { Popup } from '@/components/Popup';

const [showPopup, setShowPopup] = useState(false);

<Popup
  visible={showPopup}
  onClose={() => setShowPopup(false)}
  title="Custom Popup"
  subtitle="This is a custom popup"
  button1Text="OK"
  type="info"
/>
```

4. **Global Popup (Recommended):**
```typescript
// Add to your root layout
import { GlobalPopup } from '@/components/Popup';

// In your root component
<GlobalPopup />

// Then use anywhere in your app
import { popup } from '@/components/Popup';
popup.show('Hello', 'World!');
```

**Popup Service Methods:**
- `popup.show(title, subtitle?, button1Text?, button2Text?, button1Action?, button2Action?, type?)`
- `popup.hide()`
- `popup.subscribe(listener)` - Subscribe to popup events

</details>

### HeaderStats Component

<details>
<summary><strong>📁 File Location:</strong> `components/HeaderStats.tsx`</summary>

**Description:** Displays user statistics (streak, XP, study time) in a glass-morphism container.

**Import:**
```typescript
import HeaderStats from '@/components/HeaderStats';
```

**Usage:**
```typescript
// Simple usage
<HeaderStats />

// The component automatically fetches and displays:
// - Current streak (🔥 icon)
// - Total XP (⚡ icon) 
// - Today's study time (🕐 icon)
```

**Features:**
- Auto-refreshes when screen comes into focus
- Displays loading state while fetching data
- Formats time in hours and minutes
- Uses glass-morphism styling with blur effect

</details>

### ThemedText Component

<details>
<summary><strong>📁 File Location:</strong> `components/ThemedText.tsx`</summary>

**Description:** A themed text component that automatically adapts to light/dark mode.

**Import:**
```typescript
import { ThemedText } from '@/components/ThemedText';
```

**Props:**
```typescript
interface ThemedTextProps extends TextProps {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
}
```

**Usage Examples:**

1. **Basic Usage:**
```typescript
<ThemedText>Default text</ThemedText>
<ThemedText type="title">Large title</ThemedText>
<ThemedText type="subtitle">Subtitle text</ThemedText>
<ThemedText type="link">Clickable link</ThemedText>
```

2. **Custom Colors:**
```typescript
<ThemedText 
  lightColor="#000000" 
  darkColor="#FFFFFF"
  type="defaultSemiBold"
>
  Custom colored text
</ThemedText>
```

**Text Types:**
- `default`: 16px, normal weight
- `title`: 32px, bold
- `subtitle`: 20px, bold
- `defaultSemiBold`: 16px, 600 weight
- `link`: 16px, blue color

</details>

### ThemedView Component

<details>
<summary><strong>📁 File Location:</strong> `components/ThemedView.tsx`</summary>

**Description:** A themed view component that automatically adapts background color to light/dark mode.

**Import:**
```typescript
import { ThemedView } from '@/components/ThemedView';
```

**Props:**
```typescript
interface ThemedViewProps extends ViewProps {
  lightColor?: string;
  darkColor?: string;
}
```

**Usage:**
```typescript
// Basic usage
<ThemedView>
  <Text>Content</Text>
</ThemedView>

// Custom background colors
<ThemedView 
  lightColor="#f0f0f0" 
  darkColor="#1a1a1a"
  style={{ padding: 16 }}
>
  <Text>Custom background</Text>
</ThemedView>
```

</details>

### Collapsible Component

<details>
<summary><strong>📁 File Location:</strong> `components/Collapsible.tsx`</summary>

**Description:** A collapsible container with animated chevron icon.

**Import:**
```typescript
import { Collapsible } from '@/components/Collapsible';
```

**Props:**
```typescript
interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}
```

**Usage:**
```typescript
<Collapsible title="Click to expand">
  <Text>This content is hidden by default</Text>
  <Text>Click the title to show/hide</Text>
</Collapsible>
```

**Features:**
- Animated chevron rotation
- Smooth expand/collapse
- Themed styling
- Touch feedback

</details>

### ParallaxScrollView Component

<details>
<summary><strong>📁 File Location:</strong> `components/ParallaxScrollView.tsx`</summary>

**Description:** A scroll view with parallax header effect and blur background.

**Import:**
```typescript
import ParallaxScrollView from '@/components/ParallaxScrollView';
```

**Props:**
```typescript
interface ParallaxScrollViewProps {
  headerImage: ReactElement;
  headerBackgroundColor: { dark: string; light: string };
  children: React.ReactNode;
}
```

**Usage:**
```typescript
<ParallaxScrollView
  headerImage={<Image source={require('./header.jpg')} />}
  headerBackgroundColor={{ dark: '#000000', light: '#ffffff' }}
>
  <Text>Scrollable content</Text>
  <Text>With parallax effect</Text>
</ParallaxScrollView>
```

**Features:**
- Parallax header animation
- Blur effect on iOS
- Automatic theme adaptation
- Smooth scrolling

</details>

### HelloWave Component

<details>
<summary><strong>📁 File Location:</strong> `components/HelloWave.tsx`</summary>

**Description:** An animated waving hand emoji with rotation animation.

**Import:**
```typescript
import { HelloWave } from '@/components/HelloWave';
```

**Usage:**
```typescript
<HelloWave />
```

**Features:**
- Automatic wave animation on mount
- 4 rotation cycles
- Smooth timing animation
- Uses react-native-reanimated

</details>

### HapticTab Component

<details>
<summary><strong>📁 File Location:</strong> `components/HapticTab.tsx`</summary>

**Description:** A tab button component with haptic feedback on iOS.

**Import:**
```typescript
import { HapticTab } from '@/components/HapticTab';
```

**Usage:**
```typescript
// Used in tab navigation
<HapticTab {...tabProps} />
```

**Features:**
- Light haptic feedback on iOS
- Compatible with React Navigation
- No effect on Android/web

</details>

### ExternalLink Component

<details>
<summary><strong>📁 File Location:</strong> `components/ExternalLink.tsx`</summary>

**Description:** A link component that opens URLs in an in-app browser on mobile.

**Import:**
```typescript
import { ExternalLink } from '@/components/ExternalLink';
```

**Props:**
```typescript
interface ExternalLinkProps extends Omit<LinkProps, 'href'> {
  href: string;
}
```

**Usage:**
```typescript
<ExternalLink href="https://neurolearn.app">
  Visit our website
</ExternalLink>
```

**Features:**
- Opens in-app browser on mobile
- Opens in new tab on web
- Uses expo-web-browser

</details>

### Icon Components

<details>
<summary><strong>📁 File Location:</strong> `components/icons/` and `components/ui/`</summary>

**HomeIcon Component:**
```typescript
// File: components/icons/HomeIcon.tsx
import HomeIcon from '@/components/icons/HomeIcon';

<HomeIcon width={24} height={24} color="#ffffff" />
```

**IconSymbol Component:**
```typescript
// File: components/ui/IconSymbol.tsx
import { IconSymbol } from '@/components/ui/IconSymbol';

// Uses Lucide React Native icons
<IconSymbol name="heart" size={24} color="#ff0000" />
<IconSymbol name="star" size={20} color="#ffff00" />
<IconSymbol name="settings" size={18} color="#ffffff" />
```

**Available Icon Names:**
All Lucide React Native icons are available:
- `heart`, `star`, `settings`, `home`, `user`, `search`
- `plus`, `minus`, `check`, `x`, `arrow-right`
- `book`, `clock`, `calendar`, `bell`, `mail`
- And many more...

</details>

### TabBarBackground Components

<details>
<summary><strong>📁 File Location:</strong> `components/ui/TabBarBackground.tsx` and `TabBarBackground.ios.tsx`</summary>

**Description:** Platform-specific tab bar background components with blur effect.

**Import:**
```typescript
import BlurTabBarBackground from '@/components/ui/TabBarBackground';
import { useBottomTabOverflow } from '@/components/ui/TabBarBackground';
```

**Usage:**
```typescript
// iOS blur background
<BlurTabBarBackground />

// Get bottom tab height
const bottomOverflow = useBottomTabOverflow();
```

**Features:**
- Blur effect on iOS
- System chrome material adaptation
- Platform-specific behavior

</details>

## 🔧 Services

### XP Service

<details>
<summary><strong>📁 File Location:</strong> `services/xpService.ts`</summary>

**Description:** Manages user experience points, streaks, and session history.

**Import:**
```typescript
import { 
  getXP, 
  getTodayXP, 
  addXP, 
  getStreak, 
  updateStreak, 
  resetStreak,
  getLastSessionDate,
  setLastSessionDate,
  recordSessionForStreak,
  getSessionHistory,
  addSessionHistory
} from '@/services/xpService';
```

**Functions:**

1. **XP Management:**
```typescript
// Get total XP
const totalXP = await getXP();

// Get today's XP
const todayXP = await getTodayXP();

// Add XP (default: 10 XP per session)
await addXP(); // Add default amount
await addXP(25); // Add custom amount
```

2. **Streak Management:**
```typescript
// Get current streak
const streak = await getStreak();

// Update streak (increment by 1)
await updateStreak();

// Reset streak to 0
await resetStreak();
```

3. **Session Tracking:**
```typescript
// Record session for streak calculation
await recordSessionForStreak();

// Get session history
const history = await getSessionHistory();

// Add new session
await addSessionHistory({
  date: '2024-01-15',
  topic: 'React Native',
  concentration: 4,
  mood: 'Happy',
  goalAchieved: 'yes',
  duration: 25
});
```

4. **Date Management:**
```typescript
// Get last session date
const lastDate = await getLastSessionDate();

// Set last session date
await setLastSessionDate('2024-01-15');
```

**Session Interface:**
```typescript
interface Session {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: boolean | string;
  duration?: number; // Duration in minutes
}
```

**Storage Keys:**
- `'xp'` - Total XP
- `'streak'` - Current streak
- `'lastSessionDate'` - Last session date
- `'sessionHistory'` - Session history array

</details>

## 🎨 Constants

### Colors

<details>
<summary><strong>📁 File Location:</strong> `constants/Colors.ts`</summary>

**Description:** App-wide color definitions for dark theme.

**Import:**
```typescript
import { Colors } from '@/constants/Colors';
```

**Available Colors:**
```typescript
Colors.dark = {
  accent: '#888888',        // Gray
  background: '#000000',    // Black
  black: '#FFFFFF',         // White for contrast
  border: '#222222',        // Dark Gray
  card: '#181818',          // Very Dark Gray
  darkGray: '#888888',
  darkGreen: '#006400',
  duolingoGreen: '#AAAAAA', // Use gray for highlight
  glassBackground: 'rgba(0,0,0,0.18)',
  glassBorder: '#444444',
  glassShadow: 'rgba(0,0,0,0.32)',
  lightGray: '#2e2e2e',
  muted: '#AAAAAA',         // Gray
  primary: '#ffffff',       // White
  secondary: '#181818',     // Light Gray
  shadow: '#181818',        // Very Dark Gray
  test: '#222222',
  text: '#FFFFFF',          // White
  white: '#000000',         // Black for contrast
}
```

**Usage:**
```typescript
// In components
<View style={{ backgroundColor: Colors.dark.background }}>
  <Text style={{ color: Colors.dark.text }}>Hello</Text>
</View>

// In styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.dark.card,
    borderColor: Colors.dark.border,
  }
});
```

</details>

### App Constants

<details>
<summary><strong>📁 File Location:</strong> `constants/index.ts`</summary>

**Description:** App-wide constants for XP, streaks, UI, and configuration.

**Import:**
```typescript
import { 
  XP_PER_SESSION,
  STREAK_ICON,
  XP_ICON,
  AVATAR_NAME,
  STREAK_RESET_VALUE,
  SESSION_DURATION_MINUTES,
  STREAK_COLOR,
  XP_COLOR,
  HEART_COLOR,
  LESSON_CARD_RADIUS,
  BUTTON_RADIUS,
  BUTTON_HEIGHT,
  BUTTON_FONT_WEIGHT,
  BUTTON_FONT_SIZE,
  CARD_SHADOW
} from '@/constants';
```

**Available Constants:**
```typescript
export const XP_PER_SESSION = 10;                    // XP earned per session
export const STREAK_ICON = '🔥';                      // Streak display icon
export const XP_ICON = '💎';                         // XP display icon
export const AVATAR_NAME = 'Duo the Owl';            // Avatar name
export const STREAK_RESET_VALUE = 0;                 // Streak reset value
export const SESSION_DURATION_MINUTES = 0.05;        // Session duration (test value)
export const STREAK_COLOR = '#FF9600';               // Streak color
export const XP_COLOR = '#1CB0F6';                   // XP color
export const HEART_COLOR = '#FF4B4B';                // Heart color
export const LESSON_CARD_RADIUS = 16;                // Card border radius
export const BUTTON_RADIUS = 16;                     // Button border radius
export const BUTTON_HEIGHT = 56;                     // Button height
export const BUTTON_FONT_WEIGHT = '700';             // Button font weight
export const BUTTON_FONT_SIZE = 18;                  // Button font size
export const CARD_SHADOW = '0 4px 12px rgba(0,0,0,0.15)'; // Card shadow
```

**Usage:**
```typescript
// In XP calculations
const earnedXP = XP_PER_SESSION;

// In UI components
<View style={{ 
  borderRadius: LESSON_CARD_RADIUS,
  shadow: CARD_SHADOW 
}}>
  <Text style={{ color: STREAK_COLOR }}>{STREAK_ICON} 5</Text>
</View>
```

</details>

## 🪝 Hooks

### useThemeColor Hook

<details>
<summary><strong>📁 File Location:</strong> `hooks/useThemeColor.ts`</summary>

**Description:** Hook to get theme-appropriate colors based on current color scheme.

**Import:**
```typescript
import { useThemeColor } from '@/hooks/useThemeColor';
```

**Usage:**
```typescript
const backgroundColor = useThemeColor(
  { light: '#ffffff', dark: '#000000' }, 
  'background'
);

const textColor = useThemeColor(
  { light: '#000000', dark: '#ffffff' }, 
  'text'
);
```

**Parameters:**
- `props`: Object with `light` and `dark` color values
- `colorName`: Key from Colors.light/Colors.dark

**Returns:** Color string appropriate for current theme

</details>

### useColorScheme Hook

<details>
<summary><strong>📁 File Location:</strong> `hooks/useColorScheme.ts` and `hooks/useColorScheme.web.ts`</summary>

**Description:** Hook to get current color scheme (light/dark).

**Import:**
```typescript
import { useColorScheme } from '@/hooks/useColorScheme';
```

**Usage:**
```typescript
const colorScheme = useColorScheme(); // 'light' | 'dark' | null
```

**Features:**
- Platform-specific implementation
- Web hydration support
- Automatic theme detection

</details>

## 📱 App Screens

### Home Screen (Dashboard)

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/index.tsx`</summary>

**Description:** Main dashboard screen with daily progress, tips, and quick actions.

**Key Functions:**
```typescript
// Get daily goal progress
const getDailyGoalProgress = async () => {
  const xp = await getTodayXP();
  const goal = 100;
  return {
    xp: xp,
    goal: goal,
    progress: Math.min((xp / goal) * 100, 100)
  };
};

// Animated tab icon component
const AnimatedTabIcon = ({ Component, color, focused, ...rest }) => {
  // Animated size change on focus
};
```

**Features:**
- Daily XP progress tracking
- Learning tips rotation
- Animated tab icons
- Quick start learning button
- Progress visualization

</details>

### Learn Screen

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/learn.tsx`</summary>

**Description:** 25-minute Pomodoro timer with topic input and session controls.

**Key Functions:**
```typescript
// Session state management
const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
const [isRunning, setIsRunning] = useState(false);
const [hasStarted, setHasStarted] = useState(false);
const [topic, setTopic] = useState('');

// Timer controls
const handleStart = () => { /* Start session */ };
const handlePause = () => setIsRunning(false);
const handleResume = () => setIsRunning(true);
const handleReset = () => { /* Reset session */ };
```

**Features:**
- 25-minute countdown timer
- Topic input validation
- Pause/resume functionality
- Progress bar visualization
- Automatic navigation to review

</details>

### Review Screen

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/review.tsx`</summary>

**Description:** Post-session review with concentration rating, mood tracking, and goal assessment.

**Key Components:**
```typescript
// Star rating component
const StarRating = ({ rating, setRating }) => {
  // 5-star rating system
};

// Mood selector component
const MoodSelector = ({ mood, setMood }) => {
  // Happy/Neutral/Sad mood selection
};
```

**Features:**
- Concentration rating (1-5 stars)
- Mood tracking (Happy/Neutral/Sad)
- Goal achievement assessment
- Session data collection
- XP and streak recording

</details>

### Stats Screen

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/stats.tsx`</summary>

**Description:** Analytics screen with session statistics and visual charts.

**Key Functions:**
```typescript
// Process session data for analytics
const processSessionData = (sessions: Session[]): StatsData => {
  // Calculate totals, averages, and chart data
};

// Chart configuration
const chartConfig = {
  backgroundColor: Colors.dark.card,
  color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`,
  // ... other chart settings
};
```

**Features:**
- Total sessions count
- Total study time
- Average concentration
- Study consistency heatmap
- Daily activity chart
- Progress trends

</details>

### Settings Screen

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/settings.tsx`</summary>

**Description:** App settings with API key management and data controls.

**Key Functions:**
```typescript
// Save API key
const saveKey = async () => {
  await AsyncStorage.setItem('GEMINI_API_KEY', apiKey.trim());
};

// Clear all data
const clearAllData = async () => {
  await AsyncStorage.clear();
};

// Test popups
const testPopups = () => {
  // Test different popup types
};
```

**Features:**
- Gemini API key management
- Data clearing functionality
- Popup testing tools
- Success/error feedback

</details>

### Suggest Screen (AI Assistant)

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/suggest.tsx`</summary>

**Description:** AI-powered learning assistant with chat interface.

**Key Functions:**
```typescript
// Format session history for AI prompt
const formatSessionForPrompt = (sessions: Session[]): string => {
  // Create context from recent sessions
};

// Send message to AI
const sendMessage = async (customText?: string) => {
  // Call Gemini API with session context
};
```

**Features:**
- AI chat interface
- Session history integration
- Suggested questions
- Real-time responses
- Error handling

</details>

### Pause Screen

<details>
<summary><strong>📁 File Location:</strong> `app/(tabs)/pause.tsx`</summary>

**Description:** Break management screen with session controls.

**Features:**
- Break timer
- Session continuation
- Break activity suggestions
- Session controls

</details>

## 🎨 Styling

### Stylesheet

<details>
<summary><strong>📁 File Location:</strong> `app/stylesheet.ts`</summary>

**Description:** Centralized styles for all app screens and components.

**Import:**
```typescript
import { styles, styles_learn, styles_review, styles_stats, styles_settings, styles_ai } from './stylesheet';
```

**Available Style Objects:**
- `styles` - General app styles
- `styles_learn` - Learn screen styles
- `styles_review` - Review screen styles
- `styles_stats` - Stats screen styles
- `styles_settings` - Settings screen styles
- `styles_ai` - AI assistant styles

**Usage:**
```typescript
// In components
<View style={styles.container}>
  <Text style={styles.title}>Hello</Text>
</View>

// In learn screen
<View style={styles_learn.cardGlass}>
  <Text style={styles_learn.title}>Ready to Learn?</Text>
</View>
```

</details>

## 🔧 Configuration

### App Config

<details>
<summary><strong>📁 File Location:</strong> `app.config.js`</summary>

**Description:** Expo app configuration with metadata and settings.

**Key Settings:**
```javascript
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
    // ... other settings
  }
};
```

</details>

### EAS Config

<details>
<summary><strong>📁 File Location:</strong> `eas.json`</summary>

**Description:** EAS Build configuration for app deployment.

**Usage:**
```bash
# Build for development
eas build --profile development

# Build for production
eas build --profile production

# Submit to stores
eas submit
```

</details>

## 📦 Dependencies

### Core Dependencies

<details>
<summary><strong>📁 File Location:</strong> `package.json`</summary>

**Key Dependencies:**
- `expo` - React Native framework
- `react-native-reanimated` - Animations
- `expo-blur` - Blur effects
- `expo-linear-gradient` - Gradient backgrounds
- `lucide-react-native` - Icons
- `react-native-chart-kit` - Charts
- `@react-native-async-storage/async-storage` - Local storage

**Installation:**
```bash
npm install
# or
yarn install
```

**Development:**
```bash
npm start
# or
yarn start
```

</details>

---

This comprehensive code reference covers all components, services, hooks, and utilities in the NeuroLearn mobile app. Each section includes file locations, import statements, usage examples, and detailed explanations of functionality. 