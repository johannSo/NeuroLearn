import HeaderStats from '@/components/HeaderStats';
import { Colors } from '@/constants/Colors';
import { getSessionHistory } from '@/services/xpService';
import { useFocusEffect } from 'expo-router';
import { BookOpen, BrainCircuit, Clock } from 'lucide-react-native';
import React, { useState } from 'react';
import { ActivityIndicator, Dimensions, ScrollView, Text, View } from 'react-native';
import { BarChart, ContributionGraph } from 'react-native-chart-kit';
import { styles_stats } from '../stylesheet';

const screenWidth = Dimensions.get('window').width;

interface Session {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: boolean | string;
  duration?: number;
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
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{ data: [0, 0, 0, 0, 0, 0, 0] }],
      },
    };
  }

  const totalSessions = sessions.length;
  const totalTime = sessions.reduce((acc: number, s: Session) => {
    // Use actual duration if available, otherwise default to 25 minutes
    const sessionDuration = s.duration || 25;
    return acc + sessionDuration;
  }, 0);
  const avgConcentration = sessions.reduce((acc: number, s: Session) => acc + s.concentration, 0) / totalSessions;

  const contributionData = sessions.map((s: Session) => ({
    date: s.date,
    count: 1, // Use 1 for all study days (same color) instead of concentration level
  }));

  const sessionsPerDay = [0, 0, 0, 0, 0, 0, 0]; // Mon -> Sun
  sessions.forEach((s: Session) => {
    const dayOfWeek = new Date(s.date).getUTCDay();
    // Convert Sunday (0) to 6, Monday (1) to 0, etc.
    const adjustedDay = dayOfWeek === 0 ? 6 : dayOfWeek - 1;
    sessionsPerDay[adjustedDay]++;
  });

  return {
    totalSessions,
    totalTime,
    avgConcentration: avgConcentration.toFixed(1),
    contributionData,
    barChartData: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
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
    color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`,
    labelColor: (opacity = 1) => Colors.dark.text,
    propsForLabels: {
      fontSize: 12,
      fill: Colors.dark.text,
    },
    style: {
      borderRadius: 8,
      paddingLeft: 10,
      paddingRight: 10,
    },
    propsForDots: {
      r: '3',
      strokeWidth: '1',
      stroke: Colors.dark.primary,
    },
  };

  return (
    <View style={styles_stats.container}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={styles_stats.contentContainer} showsVerticalScrollIndicator={false}>
        <HeaderStats />
        <Text style={styles_stats.headerTitle}>Your Progress</Text>
        
        <View style={styles_stats.statsGrid}>
          <View style={styles_stats.statCard}>
            <BookOpen size={20} color={Colors.dark.primary} />
            <Text style={styles_stats.statValue}>{stats.totalSessions}</Text>
            <Text style={styles_stats.statLabel}>Total Sessions</Text>
          </View>
          
          <View style={styles_stats.statCard}>
            <Clock size={20} color={Colors.dark.primary} />
            <Text style={styles_stats.statValue}>{Math.floor(stats.totalTime / 60)}h {stats.totalTime % 60}m</Text>
            <Text style={styles_stats.statLabel}>Total Time</Text>
          </View>
          
          <View style={styles_stats.statCard}>
            <BrainCircuit size={20} color={Colors.dark.primary} />
            <Text style={styles_stats.statValue}>{stats.avgConcentration}/5</Text>
            <Text style={styles_stats.statLabel}>Avg. Focus</Text>
          </View>
        </View>

        <View style={styles_stats.chartCard}>
          <Text style={styles_stats.chartTitle}>Study Consistency</Text>
          <ContributionGraph
                values={stats.contributionData}
                endDate={new Date()}
                numDays={105}
                width={screenWidth - 20}
                height={220}
                chartConfig={{
                  ...chartConfig,
                  color: (opacity = 1) => `rgba(88, 204, 2, ${opacity})`,
                  backgroundGradientFrom: Colors.dark.card,
                  backgroundGradientTo: Colors.dark.card,
                }}
                tooltipDataAttrs={() => ({})}
                gutterSize={2}
                squareSize={20}
          />
        </View>

        <View style={styles_stats.chartCard}>
          <Text style={styles_stats.chartTitle}>Daily Activity</Text>
          <BarChart
            data={stats.barChartData}
            width={screenWidth - 40}
            height={180}
            yAxisLabel=""
            yAxisSuffix=""
            chartConfig={chartConfig}
            verticalLabelRotation={0}
            withVerticalLabels={true}
            withHorizontalLabels={true}
            style={{
              paddingLeft: 0,
              paddingRight: 0,
              alignSelf: 'center',
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
}