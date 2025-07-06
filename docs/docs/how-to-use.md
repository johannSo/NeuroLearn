---
sidebar_position: 6
---

# How to Use Components & Services

Quick reference for calling components, services, and functions in NeuroLearn.

## 🎯 Popup Component

### Import
```typescript
import { popup } from '@/components/Popup';
```

### Call Patterns

**Simple Info Popup:**
```typescript
popup.show('Title', 'Message', 'OK');
```

**Success Popup:**
```typescript
popup.show('Success!', 'Operation completed!', 'Great!', undefined, undefined, undefined, 'success');
```

**Error Popup:**
```typescript
popup.show('Error', 'Something went wrong', 'OK', undefined, undefined, undefined, 'error');
```

**Warning Popup:**
```typescript
popup.show('Warning', 'Be careful!', 'I Understand', undefined, undefined, undefined, 'warning');
```

**Two Button Popup:**
```typescript
popup.show(
  'Confirm Delete',
  'Are you sure?',
  'Delete',
  'Cancel',
  () => { /* delete action */ },
  () => { /* cancel action */ },
  'warning'
);
```

**Hide Popup:**
```typescript
popup.hide();
```

## 🔥 XP Service

### Import
```typescript
import { 
  getXP, 
  getTodayXP, 
  addXP, 
  getStreak, 
  updateStreak, 
  resetStreak,
  recordSessionForStreak,
  getSessionHistory,
  addSessionHistory
} from '@/services/xpService';
```

### Call Patterns

**Get Total XP:**
```typescript
const totalXP = await getXP();
```

**Get Today's XP:**
```typescript
const todayXP = await getTodayXP();
```

**Add XP (Default 10):**
```typescript
await addXP(); // Adds 10 XP
await addXP(25); // Adds 25 XP
```

**Get Current Streak:**
```typescript
const streak = await getStreak();
```

**Update Streak (+1):**
```typescript
await updateStreak();
```

**Reset Streak to 0:**
```typescript
await resetStreak();
```

**Record Session for Streak:**
```typescript
await recordSessionForStreak();
```

**Get Session History:**
```typescript
const history = await getSessionHistory();
```

**Add New Session:**
```typescript
await addSessionHistory({
  date: '2024-01-15',
  topic: 'React Native',
  concentration: 4,
  mood: 'Happy',
  goalAchieved: 'yes',
  duration: 25
});
```

## 📊 HeaderStats Component

### Import
```typescript
import HeaderStats from '@/components/HeaderStats';
```

### Call Pattern
```typescript
<HeaderStats />
```

## 🎨 ThemedText Component

### Import
```typescript
import { ThemedText } from '@/components/ThemedText';
```

### Call Patterns

**Basic Text:**
```typescript
<ThemedText>Hello World</ThemedText>
```

**Title:**
```typescript
<ThemedText type="title">Large Title</ThemedText>
```

**Subtitle:**
```typescript
<ThemedText type="subtitle">Subtitle</ThemedText>
```

**Link:**
```typescript
<ThemedText type="link">Click me</ThemedText>
```

**Custom Colors:**
```typescript
<ThemedText lightColor="#000" darkColor="#fff" type="defaultSemiBold">
  Custom colored text
</ThemedText>
```

## 🎨 ThemedView Component

### Import
```typescript
import { ThemedView } from '@/components/ThemedView';
```

### Call Pattern
```typescript
<ThemedView>
  <Text>Content</Text>
</ThemedView>
```

**With Custom Background:**
```typescript
<ThemedView lightColor="#f0f0f0" darkColor="#1a1a1a">
  <Text>Content</Text>
</ThemedView>
```

## 📦 Collapsible Component

### Import
```typescript
import { Collapsible } from '@/components/Collapsible';
```

### Call Pattern
```typescript
<Collapsible title="Click to expand">
  <Text>Hidden content</Text>
</Collapsible>
```

## 🔗 ExternalLink Component

### Import
```typescript
import { ExternalLink } from '@/components/ExternalLink';
```

### Call Pattern
```typescript
<ExternalLink href="https://neurolearn.app">
  Visit Website
</ExternalLink>
```

## 🎭 HelloWave Component

### Import
```typescript
import { HelloWave } from '@/components/HelloWave';
```

### Call Pattern
```typescript
<HelloWave />
```

## 🎯 IconSymbol Component

### Import
```typescript
import { IconSymbol } from '@/components/ui/IconSymbol';
```

### Call Patterns

**Basic Icon:**
```typescript
<IconSymbol name="heart" size={24} color="#ff0000" />
```

**Common Icons:**
```typescript
<IconSymbol name="star" size={20} color="#ffff00" />
<IconSymbol name="settings" size={18} color="#ffffff" />
<IconSymbol name="home" size={24} color="#000000" />
<IconSymbol name="user" size={20} color="#888888" />
<IconSymbol name="search" size={16} color="#cccccc" />
<IconSymbol name="plus" size={24} color="#00ff00" />
<IconSymbol name="minus" size={24} color="#ff0000" />
<IconSymbol name="check" size={20} color="#00ff00" />
<IconSymbol name="x" size={20} color="#ff0000" />
<IconSymbol name="arrow-right" size={16} color="#ffffff" />
<IconSymbol name="book" size={24} color="#4a90e2" />
<IconSymbol name="clock" size={20} color="#f5a623" />
<IconSymbol name="calendar" size={20} color="#7ed321" />
<IconSymbol name="bell" size={18} color="#d0021b" />
<IconSymbol name="mail" size={20} color="#9013fe" />
```

## 🎨 Colors

### Import
```typescript
import { Colors } from '@/constants/Colors';
```

### Call Patterns

**Background Colors:**
```typescript
backgroundColor: Colors.dark.background  // Black
backgroundColor: Colors.dark.card        // Dark gray
backgroundColor: Colors.dark.secondary   // Light gray
```

**Text Colors:**
```typescript
color: Colors.dark.text      // White
color: Colors.dark.primary   // White
color: Colors.dark.muted     // Gray
color: Colors.dark.accent    // Gray
```

**Border Colors:**
```typescript
borderColor: Colors.dark.border      // Dark gray
borderColor: Colors.dark.glassBorder // Glass border
```

**Special Colors:**
```typescript
color: Colors.dark.duolingoGreen  // Highlight color
color: Colors.dark.darkGreen      // Green
color: Colors.dark.lightGray      // Light gray
```

## 🔧 Constants

### Import
```typescript
import { 
  XP_PER_SESSION,
  STREAK_ICON,
  XP_ICON,
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

### Call Patterns

**XP Constants:**
```typescript
const earnedXP = XP_PER_SESSION;  // 10
const streakIcon = STREAK_ICON;    // 🔥
const xpIcon = XP_ICON;           // 💎
```

**Colors:**
```typescript
color: STREAK_COLOR;  // #FF9600
color: XP_COLOR;      // #1CB0F6
color: HEART_COLOR;   // #FF4B4B
```

**UI Constants:**
```typescript
borderRadius: LESSON_CARD_RADIUS;  // 16
borderRadius: BUTTON_RADIUS;       // 16
height: BUTTON_HEIGHT;             // 56
fontWeight: BUTTON_FONT_WEIGHT;    // '700'
fontSize: BUTTON_FONT_SIZE;        // 18
shadow: CARD_SHADOW;               // '0 4px 12px rgba(0,0,0,0.15)'
```

## 🪝 Hooks

### useThemeColor Hook

**Import:**
```typescript
import { useThemeColor } from '@/hooks/useThemeColor';
```

**Call Pattern:**
```typescript
const backgroundColor = useThemeColor(
  { light: '#ffffff', dark: '#000000' }, 
  'background'
);
```

### useColorScheme Hook

**Import:**
```typescript
import { useColorScheme } from '@/hooks/useColorScheme';
```

**Call Pattern:**
```typescript
const colorScheme = useColorScheme(); // 'light' | 'dark' | null
```

## 📱 Screen Navigation

### Import
```typescript
import { router } from 'expo-router';
```

### Call Patterns

**Navigate to Learn:**
```typescript
router.push('/(tabs)/learn');
```

**Navigate to Review with Topic:**
```typescript
router.replace({ pathname: '/(tabs)/review', params: { topic: 'React Native' } });
```

**Navigate to Pause:**
```typescript
router.replace('/(tabs)/pause');
```

**Navigate to Stats:**
```typescript
router.push('/(tabs)/stats');
```

**Navigate to Settings:**
```typescript
router.push('/(tabs)/settings');
```

**Navigate to Suggest:**
```typescript
router.push('/(tabs)/suggest');
```

## 💾 AsyncStorage

### Import
```typescript
import AsyncStorage from '@react-native-async-storage/async-storage';
```

### Call Patterns

**Save Data:**
```typescript
await AsyncStorage.setItem('KEY', 'value');
await AsyncStorage.setItem('KEY', JSON.stringify(object));
```

**Get Data:**
```typescript
const value = await AsyncStorage.getItem('KEY');
const object = JSON.parse(await AsyncStorage.getItem('KEY') || '{}');
```

**Remove Data:**
```typescript
await AsyncStorage.removeItem('KEY');
```

**Clear All:**
```typescript
await AsyncStorage.clear();
```

## 🎨 Styles

### Import
```typescript
import { styles, styles_learn, styles_review, styles_stats, styles_settings, styles_ai } from './stylesheet';
```

### Call Patterns

**General Styles:**
```typescript
<View style={styles.container}>
<Text style={styles.title}>Title</Text>
```

**Learn Screen Styles:**
```typescript
<View style={styles_learn.cardGlass}>
<Text style={styles_learn.title}>Ready to Learn?</Text>
<View style={styles_learn.inputContainer}>
<TouchableOpacity style={styles_learn.startButton}>
```

**Review Screen Styles:**
```typescript
<View style={styles_review.card}>
<Text style={styles_review.title}>Session Review</Text>
<View style={styles_review.ratingContainer}>
```

**Stats Screen Styles:**
```typescript
<View style={styles_stats.container}>
<Text style={styles_stats.title}>Your Progress</Text>
<View style={styles_stats.statsGrid}>
```

**Settings Screen Styles:**
```typescript
<View style={styles_settings.container}>
<Text style={styles_settings.title}>Settings</Text>
```

**AI Screen Styles:**
```typescript
<View style={styles_ai.messageContainer}>
<Text style={styles_ai.messageText}>Message</Text>
```

## 🔧 Common Patterns

### State Management
```typescript
const [value, setValue] = useState(initialValue);
const [isLoading, setIsLoading] = useState(false);
const [data, setData] = useState(null);
```

### useEffect for Data Fetching
```typescript
useEffect(() => {
  const fetchData = async () => {
    const result = await someFunction();
    setData(result);
  };
  fetchData();
}, []);
```

### useFocusEffect for Screen Refresh
```typescript
import { useFocusEffect } from 'expo-router';

useFocusEffect(
  React.useCallback(() => {
    // Refresh data when screen comes into focus
    fetchData();
  }, [])
);
```

### Error Handling
```typescript
try {
  const result = await someAsyncFunction();
  // Handle success
} catch (error) {
  console.error('Error:', error);
  popup.show('Error', 'Something went wrong', 'OK', undefined, undefined, undefined, 'error');
}
```

### Loading States
```typescript
if (isLoading) {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Colors.dark.primary} />
    </View>
  );
}
```

---

This guide shows you exactly **HOW TO CALL** each component and service without explaining what they do. Just copy the patterns you need! 