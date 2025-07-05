import { useFocusEffect } from 'expo-router';
import { Clock, Flame, Zap } from 'lucide-react-native';
import React, { useCallback, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/Colors';
import { getSessionHistory, getStreak, getXP } from '../services/xpService';

const HeaderStats = () => {
  const [xp, setXp] = useState(0);
  const [streak, setStreak] = useState(0);
  const [time, setTime] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      const [currentXp, currentStreak, history] = await Promise.all([
        getXP(),
        getStreak(),
        getSessionHistory(),
      ]);
      
      setXp(currentXp);
      setStreak(currentStreak);
      
      // Calculate total time from today's sessions only
      const today = new Date().toISOString().split('T')[0];
      const todaySessions = history.filter((session: any) => session.date === today);
      const totalTime = todaySessions.reduce((acc: number, session: any) => {
        const sessionDuration = session.duration || 25;
        return acc + sessionDuration;
      }, 0);
      
      setTime(totalTime);
    } catch (error) {
      console.error("Failed to fetch header stats:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      // Add a small delay to ensure data is properly saved before fetching
      const timer = setTimeout(() => {
        fetchData();
      }, 100);
      
      return () => clearTimeout(timer);
    }, [fetchData])
  );

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  return (
    <View style={styles.glassContainer}>
      <View style={styles.container}>
        <View style={styles.statItem}>
          <Flame size={18} color={Colors.dark.accent} />
          <Text style={styles.statText}>{isLoading ? '0' : streak}</Text>
        </View>
        <View style={styles.statItem}>
          <Zap size={18} color={Colors.dark.accent} />
          <Text style={styles.statText}>{isLoading ? '0' : xp}</Text>
        </View>
        <View style={styles.statItem}>
          <Clock size={18} color={Colors.dark.darkGray} />
          <Text style={styles.statText}>{isLoading ? '0m' : formatTime(time)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: Colors.dark.white,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 14,
    // marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    marginLeft: 6,
    fontSize: 16,
    fontWeight: '700',
    color: Colors.dark.black,
  },
  glassContainer: {
    borderRadius: 20,
    marginBottom: 16,
    borderColor: Colors.dark.glassBorder,
    borderWidth: 3,
  },
});

export default HeaderStats; 