import HeaderStats from '@/components/HeaderStats';
import { Colors } from '@/constants/Colors';
import { getTodayXP } from '@/services/xpService';
import { LinearGradient } from 'expo-linear-gradient';
import { router, useFocusEffect } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Text, TouchableOpacity, View } from 'react-native';
import { styles } from '../stylesheet';

const learningTips = [
  "Take short breaks every 25-30 minutes to stay fresh.",
  "Explain what you learned to someone else to solidify your understanding.",
  "Connect new concepts to what you already know.",
  "Get enough sleep; it's crucial for memory consolidation.",
  "Practice active recall instead of passive review."
];

const getDailyGoalProgress = async () => {
  try {
    const xp = await getTodayXP();
    const goal = 100;
    return {
      xp: xp,
      goal: goal,
      progress: Math.min((xp / goal) * 100, 100)
    };
  } catch (error) {
    console.error("Failed to get daily goal progress:", error);
    return { xp: 0, goal: 100, progress: 0 };
  }
};

const AnimatedTabIcon = ({ Component, color, focused, ...rest }: { Component: React.ElementType, color: string, focused: boolean, [key: string]: any }) => {
  const animatedValue = React.useRef(new Animated.Value(focused ? 1 : 0)).current;

  useEffect(() => {
    // Reset the value immediately when focus changes, before animating
    animatedValue.setValue(focused ? 0 : 1);
    Animated.spring(animatedValue, {
      toValue: focused ? 1 : 0,
      useNativeDriver: false,
      friction: 6,
      tension: 80,
    }).start();
  }, [focused]);

  const size = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [24, 32],
  });

  return (
    <Animated.View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Component color={color} width={size} height={size} {...rest} />
    </Animated.View>
  );
};

export default function DashboardScreen() {
  const [dailyProgress, setDailyProgress] = React.useState({ xp: 0, goal: 100, progress: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const tipOfTheDay = React.useMemo(() => learningTips[new Date().getDate() % learningTips.length], []);

  const updateProgress = async () => {
    try {
      setIsLoading(true);
      // Add a small delay to ensure data is properly saved before fetching
      await new Promise(resolve => setTimeout(resolve, 100));
      const progress = await getDailyGoalProgress();
      console.log('Updated daily progress:', progress); // Debug log
      setDailyProgress(progress);
    } catch (error) {
      console.error("Failed to update progress:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      updateProgress();
    }, [])
  );

  const handleStart = () => {
    router.push('/(tabs)/learn');
  };

  return (
    <View style={styles.container}>
      <HeaderStats />
      <Text style={{ color: Colors.dark.text, fontSize: 28, fontWeight: 'bold', marginBottom: 16 }}>Home</Text>
      <View style={styles.tipCard}>
        <Text style={styles.tipTitle}>Tip of the Day</Text>
        <Text style={styles.tipText}>{tipOfTheDay}</Text>
      </View>
      <TouchableOpacity style={styles.startButton} onPress={handleStart}>
        <LinearGradient
          colors={[Colors.dark.secondary, Colors.dark.accent]}
          start={{ x: 1, y: 0 }}
          end={{ x: 0, y: 0 }}
          style={styles.startButtonGradient}
        >
          <Text style={styles.startButtonText}>Start Learning</Text>
        </LinearGradient>
      </TouchableOpacity>
      <View style={styles.progressContainer}>
        <Text style={styles.progressLabel}>Today's Progress</Text>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFill, { width: `${dailyProgress.progress}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {isLoading ? '0 / 100 XP' : `${dailyProgress.xp} / ${dailyProgress.goal} XP`}
        </Text>
      </View>
    </View>
  );
}