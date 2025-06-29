import { SESSION_DURATION_MINUTES } from '@/constants';
import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { router, useFocusEffect } from 'expo-router';
import { BookOpen } from 'lucide-react-native';
import React, { useState } from 'react';
import { Keyboard, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { styles_learn } from './stylesheet';

const TOTAL_SECONDS = SESSION_DURATION_MINUTES * 60;

export default function LearnScreen() {
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [isRunning, setIsRunning] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [topic, setTopic] = useState('');

  // This will run every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      // Reset the timer state
      setHasStarted(false);
      setIsRunning(false);
      setSecondsLeft(TOTAL_SECONDS);
      setTopic(''); // Reset topic as well
      
      return () => {
        // Optional: cleanup when the screen loses focus
      };
    }, [])
  );

  React.useEffect(() => {
    if (!isRunning || !hasStarted) return;
    if (secondsLeft <= 0) {
      setTimeout(() => router.replace({ pathname: '/(tabs)/review', params: { topic: topic } }), 1000);
      return;
    }
    const interval = setInterval(() => {
      setSecondsLeft((s) => s - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [secondsLeft, isRunning, hasStarted, topic]);

  const minutes = Math.floor(secondsLeft / 60).toString().padStart(2, '0');
  const seconds = (secondsLeft % 60).toString().padStart(2, '0');
  const progress = 1 - secondsLeft / TOTAL_SECONDS;

  const handleStart = () => {
    if (!topic.trim()) {
      alert('Please enter a topic to focus on!');
      return;
    }
    Keyboard.dismiss();
    setHasStarted(true);
    setIsRunning(true);
  };

  const handlePause = () => setIsRunning(false);
  const handleResume = () => setIsRunning(true);
  
  const handleReset = () => {
    setHasStarted(false);
    setIsRunning(false);
    setSecondsLeft(TOTAL_SECONDS);
    setTopic('');
  };

  return (
    <View style={styles_learn.gradientBg}>
      <View style={styles_learn.innerContainer}>
        {!hasStarted ? (
          <Animated.View entering={FadeIn.duration(600)} style={styles_learn.cardGlass}>
            <BlurView intensity={40} tint="dark" style={styles_learn.cardGlass}>
              <View style={[styles_learn.card, {backgroundColor: Colors.dark.card}]}>
                <Text style={[styles_learn.title, {color: Colors.dark.primary}]}>Ready to Learn?</Text>
                <View style={styles_learn.inputContainer}>
                  <BookOpen color={Colors.dark.muted} size={20} style={styles_learn.inputIcon} />
                  <TextInput
                    style={styles_learn.input}
                    placeholder="What are you focusing on?"
                    placeholderTextColor={Colors.dark.primary}
                    value={topic}
                    onChangeText={setTopic}
                  />
                </View>
                <TouchableOpacity style={[styles_learn.startButton, !topic.trim() && styles_learn.disabledButton]} onPress={handleStart} disabled={!topic.trim()}>
                  <Text style={styles_learn.startButtonText}>Start 25-Min Session</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        ) : (
          <Animated.View entering={FadeIn.duration(600)} style={styles_learn.cardGlass}>
            <BlurView intensity={40} tint="dark" style={styles_learn.cardGlass}>
              <View style={styles_learn.topicContainer}>
                <Text style={styles_learn.topicText}>{topic}</Text>
              </View>
              <View style={styles_learn.timerContainer}>
                <Text style={styles_learn.timerText}>{minutes}:{seconds}</Text>
                <View style={styles_learn.progressBarBg}>
                  <View style={[styles_learn.progressBarFill, { width: `${progress * 100}%` }]} />
                </View>
              </View>
              <Text style={styles_learn.infoText}>Stay focused. You can pause or reset at any time.</Text>
              <View style={styles_learn.buttonRow}>
                {isRunning ? (
                  <TouchableOpacity style={styles_learn.controlButton} onPress={handlePause}>
                    <Text style={styles_learn.controlButtonText}>Pause</Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity style={styles_learn.controlButton} onPress={handleResume}>
                    <Text style={styles_learn.controlButtonText}>Resume</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity style={styles_learn.controlButton} onPress={handleReset}>
                  <Text style={styles_learn.controlButtonText}>Reset/Quit</Text>
                </TouchableOpacity>
              </View>
            </BlurView>
          </Animated.View>
        )}
      </View>
    </View>
  );
}