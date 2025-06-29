import HeaderStats from '@/components/HeaderStats';
import { Colors } from '@/constants/Colors';
import { getSessionHistory } from '@/services/xpService';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { useFocusEffect } from 'expo-router';
import { BookOpen, BrainCircuit, Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { BarChart, ContributionGraph } from 'react-native-chart-kit';
import Animated, { FadeIn } from 'react-native-reanimated';
import { styles_stats } from './stylesheet';

const screenWidth = Dimensions.get('window').width;

interface Session {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: boolean | string;
}

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

// Helper to process session data
const processSessionData = (sessions: Session[]): StatsData => {
  if (!sessions || sessions.length === 0) {
    return {
      totalSessions: 0,
      totalTime: 0,
      avgConcentration: 0,
      contributionData: [],
      barChartData: {
        labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      },
    };
  }

  const totalSessions = sessions.length;
  const totalTime = totalSessions * 25; // Each session is 25 minutes
  const avgConcentration = sessions.reduce((acc: number, s: Session) => acc + s.concentration, 0) / totalSessions;

  const contributionData = sessions.map((s: Session) => ({
    date: s.date,
    count: Math.round(s.concentration), // Use concentration for heatmap intensity
  }));

  const sessionsPerDay = [0, 0, 0, 0, 0, 0, 0]; // Sun -> Sat
  sessions.forEach((s: Session) => {
    const dayOfWeek = new Date(s.date).getUTCDay();
    sessionsPerDay[dayOfWeek]++;
  });

  return {
    totalSessions,
    totalTime,
    avgConcentration: avgConcentration.toFixed(1),
    contributionData,
    barChartData: {
      labels: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      datasets: [{ data: sessionsPerDay }],
    },
  };
};


export default function StatsScreen() {
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    React.useCallback(() => {
      setLoading(true);
      getSessionHistory()
        .then(sessions => {
          const processedStats = processSessionData(sessions);
          setStats(processedStats);
        })
        .catch(console.error)
        .finally(() => setLoading(false));
    }, [])
  );

  if (loading) {
    return (
      <View style={[styles_stats.container, styles_stats.center]}>
        <ActivityIndicator size="large" color={Colors.dark.primary} />
      </View>
    );
  }

  if (!stats || stats.totalSessions === 0) {
    return (
      <View style={[styles_stats.container, styles_stats.center]}>
        <Text style={styles_stats.title}>No Stats Yet</Text>
        <Text style={styles_stats.subtitle}>Complete a learning session to see your progress here!</Text>
      </View>
    );
  }

  const chartConfig = {
    backgroundColor: Colors.dark.card,
    backgroundGradientFrom: Colors.dark.card,
    backgroundGradientTo: Colors.dark.card,
    decimalPlaces: 0,
    color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`, // Duolingo Green
    labelColor: (opacity = 1) => `rgba(75, 75, 75, ${opacity})`, // Dark Gray
    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '4',
      strokeWidth: '2',
      stroke: Colors.dark.darkGreen,
    },
  };

  return (
    <LinearGradient colors={[Colors.dark.primary, Colors.dark.secondary]} style={styles_stats.gradientBg}>
      <ScrollView style={{flex:1}} contentContainerStyle={styles_stats.contentContainer} showsVerticalScrollIndicator={false}>
        <HeaderStats />
        <Animated.View entering={FadeIn.duration(600)}>
          <Text style={styles_stats.headerTitle}>Your Progress</Text>
        </Animated.View>
        <View style={styles_stats.statsGrid}>
          <Animated.View entering={FadeIn.duration(700)} style={styles_stats.cardGlass}>
            <BlurView intensity={40} tint="dark" style={styles_stats.cardGlass}>
              <View style={[styles_stats.statCard, {backgroundColor: Colors.dark.card}]}>
                <BookOpen size={24} color={Colors.dark.primary} />
                <Text style={[styles_stats.statValue, {color: Colors.dark.text}]}>{stats.totalSessions}</Text>
                <Text style={styles_stats.statLabel}>Total Sessions</Text>
              </View>
            </BlurView>
          </Animated.View>
          <Animated.View entering={FadeIn.duration(800)} style={styles_stats.cardGlass}>
            <BlurView intensity={40} tint="dark" style={styles_stats.cardGlass}>
              <View style={[styles_stats.statCard, {backgroundColor: Colors.dark.card}]}>
                <Clock size={24} color={Colors.dark.primary} />
                <Text style={[styles_stats.statValue, {color: Colors.dark.text}]}>{Math.floor(stats.totalTime / 60)}h {stats.totalTime % 60}m</Text>
                <Text style={styles_stats.statLabel}>Total Time</Text>
              </View>
            </BlurView>
          </Animated.View>
          <Animated.View entering={FadeIn.duration(900)} style={styles_stats.cardGlass}>
            <BlurView intensity={40} tint="dark" style={styles_stats.cardGlass}>
              <View style={[styles_stats.statCard, {backgroundColor: Colors.dark.card}]}>
                <BrainCircuit size={24} color={Colors.dark.primary} />
                <Text style={[styles_stats.statValue, {color: Colors.dark.text}]}>{stats.avgConcentration} / 5</Text>
                <Text style={styles_stats.statLabel}>Avg. Focus</Text>
              </View>
            </BlurView>
          </Animated.View>
        </View>
        <Animated.View entering={FadeIn.duration(1000)} style={styles_stats.cardGlass}>
          <BlurView intensity={40} tint="dark" style={styles_stats.cardGlass}>
            <View style={styles_stats.chartCard}>
              <Text style={styles_stats.chartTitle}>Study Consistency</Text>
              <ContributionGraph
                values={stats.contributionData}
                endDate={new Date()}
                numDays={105}
                width={screenWidth - 40}
                height={220}
                chartConfig={chartConfig}
                tooltipDataAttrs={() => ({})}
              />
            </View>
          </BlurView>
        </Animated.View>
        <Animated.View entering={FadeIn.duration(1100)} style={styles_stats.cardGlass}>
          <BlurView intensity={40} tint="dark" style={styles_stats.cardGlass}>
            <View style={styles_stats.chartCard}>
              <Text style={styles_stats.chartTitle}>Daily Activity</Text>
              <BarChart
                data={stats.barChartData}
                width={screenWidth - 40}
                height={220}
                yAxisLabel=""
                yAxisSuffix=""
                chartConfig={chartConfig}
                verticalLabelRotation={0}
                fromZero={true}
              />
            </View>
          </BlurView>
        </Animated.View>
      </ScrollView>
    </LinearGradient>
  );
}