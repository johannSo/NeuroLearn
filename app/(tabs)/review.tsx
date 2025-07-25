import { Colors } from '@/constants/Colors';
import { addSessionHistory, addXP, recordSessionForStreak } from '@/services/xpService';
import { router, useLocalSearchParams } from 'expo-router';
import { Frown, Meh, Smile, Star } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { KeyboardAvoidingView, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { styles_review } from '../stylesheet';

const StarRating = ({ rating, setRating }: { rating: number; setRating: (rating: number) => void }) => (
  <View style={styles_review.ratingContainer}>
    {[1, 2, 3, 4, 5].map((star) => (
      <TouchableOpacity key={star} onPress={() => setRating(star)}>
        <Star size={40} color={rating >= star ? Colors.dark.primary : Colors.dark.muted} />
      </TouchableOpacity>
    ))}
  </View>
);

const MoodSelector = ({ mood, setMood }: { mood: string; setMood: (mood: string) => void }) => (
  <View style={styles_review.ratingContainer}>
    <TouchableOpacity onPress={() => setMood('Happy')}>
      <Smile size={40} color={mood === 'Happy' ? Colors.dark.primary : Colors.dark.muted} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setMood('Neutral')}>
      <Meh size={40} color={mood === 'Neutral' ? Colors.dark.primary : Colors.dark.muted} />
    </TouchableOpacity>
    <TouchableOpacity onPress={() => setMood('Sad')}>
      <Frown size={40} color={mood === 'Sad' ? Colors.dark.primary : Colors.dark.muted} />
    </TouchableOpacity>
  </View>
);

export default function ReviewScreen() {
  const params = useLocalSearchParams();
  const [topic, setTopic] = useState('');
  const [concentration, setConcentration] = useState(0);
  const [mood, setMood] = useState('');
  const [goalAchieved, setGoalAchieved] = useState<string | null>(null);

  useEffect(() => {
    if (params.topic && typeof params.topic === 'string') {
      setTopic(params.topic);
    }
  }, [params.topic]);

  const isComplete = topic && concentration && mood && goalAchieved !== null;

  const handleComplete = async () => {
    if (!isComplete) return;
    
    try {
      // Save all data first
      await addXP();
      await recordSessionForStreak();

      const sessionData = {
        date: new Date().toISOString().split('T')[0],
        topic,
        concentration,
        mood,
        goalAchieved,
        duration: 25,
      };
      
      console.log('Saving session data:', sessionData); // Debug log
      await addSessionHistory(sessionData);

      // Navigate after all data is saved
      router.replace('/(tabs)/pause');
    } catch (error) {
      console.error("Failed to complete session:", error);
      // You might want to show an error message to the user here
    }
  };

  return (
    <View style={styles_review.gradientBg}>
      <KeyboardAvoidingView 
        style={styles_review.container}
      >
        <ScrollView contentContainerStyle={styles_review.scrollContainer} showsVerticalScrollIndicator={false}>
           {/* <View style={styles_review.cardGlass}> */}
            {/* <BlurView intensity={40} tint="dark" style={styles_review.cardGlass}> */}
              <View style={[styles_review.card, {backgroundColor: Colors.dark.card}]}>
                <Text style={[styles_review.title, {color: Colors.dark.primary}]}>Session Review</Text>
                <Text style={styles_review.question}>What did you work on?</Text>
                <Text style={[styles_review.input, {color: Colors.dark.primary}]}>
                  {topic || "Error: couldn't load var topic"}
                </Text>
                <Text style={styles_review.question}>How was your concentration?</Text>
                <StarRating rating={concentration} setRating={setConcentration} />
                <Text style={styles_review.question}>How are you feeling?</Text>
                <MoodSelector mood={mood} setMood={setMood} />
                <Text style={styles_review.question}>Did you achieve your goal?</Text>
                <View style={styles_review.ratingContainer}>
                  <TouchableOpacity 
                    style={[styles_review.choiceButton, goalAchieved === 'yes' && styles_review.choiceSelected]} 
                    onPress={() => setGoalAchieved('yes')}
                  >
                    <Text style={styles_review.choiceText}>Yes</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles_review.choiceButton, goalAchieved === 'no' && styles_review.choiceSelected]} 
                    onPress={() => setGoalAchieved('no')}
                  >
                    <Text style={styles_review.choiceText}>No</Text>
                  </TouchableOpacity>
                  <TouchableOpacity 
                    style={[styles_review.choiceButton, goalAchieved === 'not_yet' && styles_review.choiceSelected]} 
                    onPress={() => setGoalAchieved('not_yet')}
                  >
                    <Text style={styles_review.choiceText}>Not yet</Text>
                  </TouchableOpacity>
                </View>
                <TouchableOpacity 
                  style={[styles_review.completeButton, !isComplete && styles_review.disabledButton]} 
                  onPress={handleComplete}
                  disabled={!isComplete}
                >
                  <Text style={styles_review.completeButtonText}>Complete Session</Text>
                </TouchableOpacity>
              </View>
            {/* </BlurView> */}
          {/* </View> */}
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}