import { Colors } from '@/constants/Colors';
import { BlurView } from 'expo-blur';
import { router } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { styles_pause } from '../stylesheet';


export default function PauseScreen() {
  const handleContinue = () => {
    router.push('/(tabs)/learn');
  };

  return (
    <View style={styles_pause.gradientBg}>
      <View style={styles_pause.innerContainer}>
        <Animated.View entering={FadeIn.duration(600)} style={styles_pause.cardGlass}>
          <BlurView intensity={40} tint="dark" style={styles_pause.cardGlass}>
            <View style={[styles_pause.card, {backgroundColor: Colors.dark.card}]}>
              <Text style={[styles_pause.title, {color: Colors.dark.primary}]}>Break Time!</Text>
              <Text style={[styles_pause.subtitle, {color: Colors.dark.text}]}>Take a short break and then continue learning.</Text>
              <TouchableOpacity onPress={handleContinue}>
                <View style={styles_pause.continueButtonGradient}>
                  <Text style={[styles_pause.continueButtonText, {color: Colors.dark.primary}]}>Continue Learning</Text>
                </View>
              </TouchableOpacity>
            </View>
          </BlurView>
        </Animated.View>
      </View>
    </View>
  );
}