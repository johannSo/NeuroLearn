import { getSessionHistory } from '@/services/xpService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { Bot, User } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
    ActivityIndicator,
    KeyboardAvoidingView,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { Colors } from '../../constants/Colors';
import { styles_ai } from '../stylesheet';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Session {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: boolean | string;
}

const formatSessionForPrompt = (sessions: Session[]): string => {
  if (sessions.length === 0) {
    return "The user hasn't recorded any learning sessions yet.";
  }

  const recentSessions = sessions.slice(-3); // Get last 3 sessions for brevity
  let context = "Here is the user's recent learning history for context:\n";
  
  recentSessions.forEach((s, i) => {
    context += `- Session ${i+1} on ${s.date}: Topic: "${s.topic}", Concentration: ${s.concentration}/5, Mood: ${s.mood}, Goal Achieved: ${s.goalAchieved}\n`;
  });
  
  return context;
};

// Helper to format profile data for prompt
const formatProfileForPrompt = (profile: any): string => {
  if (!profile) return "No profile data available.";
  return `User profile:\n- Name: ${profile.name || 'Not specified'}\n- Age: ${profile.age || 'Not specified'}\n- Country: ${profile.country || 'Not specified'}\n- Learning Habits: ${profile.learningHabits || 'Not specified'}\n- ADHD: ${profile.adhd || 'Not specified'}`;
};

export default function SuggestScreen() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [sessionHistory, setSessionHistory] = useState<Session[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const [apiKey, setApiKey] = useState<string | null>(null);
  const [showApiKeyError, setShowApiKeyError] = useState(false);
  const [profile, setProfile] = useState<any>(null);

  const suggestedQuestions = [
    "How can I improve my focus while studying?",
    "What's the best way to memorize information?",
    "How should I plan my study schedule?",
    "Can you suggest learning techniques for my subject?",
    "How do I overcome procrastination?"
  ];

  const sendSuggestedQuestion = (question: string) => {
    setInputText(question);
    // Automatically send the question
    setTimeout(() => {
      sendMessage(question);
    }, 100);
  };

  useEffect(() => {
    const fetchHistoryAndKey = async () => {
      const history = await getSessionHistory();
      setSessionHistory(history);
      setMessages([
        {
          id: '1',
          text: "Hi! I'm your AI learning assistant. I can see your recent progress. Ask me anything about your learning goals or study strategies!",
          isUser: false,
          timestamp: new Date()
        }
      ]);
      const key = await AsyncStorage.getItem('GEMINI_API_KEY');
      setApiKey(key);
      // Load profile data
      const profileRaw = await AsyncStorage.getItem('PROFILE_DATA');
      setProfile(profileRaw ? JSON.parse(profileRaw) : null);
    };
    fetchHistoryAndKey();
  }, []);

  const sendMessage = async (customText?: string) => {
    const textToSend = customText || inputText.trim();
    if (!textToSend || isLoading) return;
    if (!apiKey) {
      setShowApiKeyError(true);
      return;
    }
    setShowApiKeyError(false);

    const userMessage: Message = {
      id: Date.now().toString(),
      text: textToSend,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    const sessionContext = formatSessionForPrompt(sessionHistory);
    const profileContext = formatProfileForPrompt(profile);

    try {
      const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${profileContext}\n\n${sessionContext}\n\nYou are an AI learning assistant for the app called \"NeuroLearn\", it is an inteligent Pomodoro Timer with you the AI built into it. The user asks: \"${textToSend}\". Please provide helpful, encouraging, and practical advice based on their history and profile. Keep your response SHORT and CONCISE - aim for 2-3 short paragraphs maximum. Be encouraging but direct.`
                }
              ]
            }
          ]
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      let aiText = 'Sorry, I could not process your request.';
      if (data.candidates && data.candidates[0] && data.candidates[0].content && data.candidates[0].content.parts && data.candidates[0].content.parts[0].text) {
        aiText = data.candidates[0].content.parts[0].text;
      }
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiText,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      let errorMessage = 'Sorry, I\'m having trouble connecting right now. Please check your internet connection and try again.';
      
      if (error instanceof TypeError && error.message.includes('Network request failed')) {
        errorMessage = 'Cannot connect to the server';
      } else if (error instanceof Error) {
        errorMessage = `Connection error: ${error.message}`;
      }
      
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: errorMessage,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Auto-scroll to bottom when new messages arrive
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  }, [messages]);

  const renderMessage = (message: Message) => (
    <View key={message.id} style={[styles_ai.messageContainer, message.isUser ? styles_ai.userMessage : styles_ai.aiMessage]}>
      <View style={[styles_ai.messageBubble, message.isUser ? styles_ai.userBubble : styles_ai.aiBubble]}>
        <View style={styles_ai.messageHeader}>
          {message.isUser ? (
            <User size={16} color={Colors.dark.primary} />
          ) : (
            <Bot size={16} color={Colors.dark.primary} />
          )}
          <Text style={[styles_ai.messageSender, message.isUser ? styles_ai.userSender : styles_ai.aiSender]}>
            {message.isUser ? 'You' : 'AI Assistant'}
          </Text>
        </View>
        <Text style={[styles_ai.messageText, message.isUser ? styles_ai.userText : styles_ai.aiText]}>
          {message.text}
        </Text>
      </View>
    </View>
  );

  return (
    <LinearGradient colors={[Colors.dark.primary, Colors.dark.secondary]} style={styles_ai.gradientBg}>
      <KeyboardAvoidingView 
        style={styles_ai.container}
      >
        <View style={styles_ai.header}>
          <Text style={[styles_ai.title, {color: Colors.dark.primary}]}>Learning Assistant</Text>
          <Text style={styles_ai.subtitle}>Get personalized learning suggestions</Text>
          {showApiKeyError && (
            <Text style={{ color: 'red', marginTop: 10, fontWeight: 'bold' }}>
              Please enter your Gemini API key in Settings to use AI features.
            </Text>
          )}
        </View>
        <ScrollView 
          ref={scrollViewRef}
          style={styles_ai.messagesContainer}
          contentContainerStyle={styles_ai.messagesContent}
          showsVerticalScrollIndicator={false}
        >
          {messages.map((message, idx) => (
            <Animated.View key={message.id} entering={FadeIn.duration(400 + idx * 100)}>
              <BlurView intensity={30} tint="dark" style={styles_ai.bubbleGlass}>
                <View style={[styles_ai.messageBubble, {backgroundColor: Colors.dark.card}]}>
                  {renderMessage(message)}
                </View>
              </BlurView>
            </Animated.View>
          ))}
          {isLoading && (
            <Animated.View entering={FadeIn.duration(1000)}>
              <BlurView intensity={30} tint="dark" style={styles_ai.bubbleGlass}>
                <View style={[styles_ai.messageContainer, styles_ai.aiMessage]}>
                  <View style={[styles_ai.messageBubble, styles_ai.aiBubble]}>
                    <View style={styles_ai.loadingContainer}>
                      <ActivityIndicator size="small" color={Colors.dark.primary} />
                      <Text style={styles_ai.loadingText}>AI is thinking...</Text>
                    </View>
                  </View>
                </View>
              </BlurView>
            </Animated.View>
          )}
          
          {/* Show suggested questions if only the welcome message exists */}
          {messages.length === 1 && !isLoading && (
            <View style={styles_ai.suggestedQuestionsContainer}>
              <Text style={styles_ai.suggestedQuestionsTitle}>Try asking:</Text>
              <View style={styles_ai.suggestedQuestionsRow}>
                {suggestedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles_ai.suggestedQuestionButton}
                    onPress={() => sendSuggestedQuestion(question)}
                  >
                    <Text style={styles_ai.suggestedQuestionText}>{question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
          
          {/* Show suggested questions after any conversation */}
          {messages.length > 1 && !isLoading && (
            <View style={styles_ai.suggestedQuestionsContainer}>
              <Text style={styles_ai.suggestedQuestionsTitle}>More questions to try:</Text>
              <View style={styles_ai.suggestedQuestionsRow}>
                {suggestedQuestions.map((question, index) => (
                  <TouchableOpacity
                    key={`suggested-${index}`}
                    style={styles_ai.suggestedQuestionButton}
                    onPress={() => sendSuggestedQuestion(question)}
                  >
                    <Text style={styles_ai.suggestedQuestionText}>{question}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          )}
        </ScrollView>
        { /* <View style={styles_ai.inputRow}>
          <BlurView intensity={30} tint="dark" style={styles_ai.inputGlass}>
            <TextInput
              // style={styles_ai.input}
              placeholder="Ask me anything..."
              placeholderTextColor={Colors.dark.muted}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={() => sendMessage()}
              editable={!isLoading}
            />
            <TouchableOpacity style={styles_ai.sendButton} onPress={() => sendMessage()} disabled={isLoading || !inputText.trim()}>
              <LinearGradient colors={[Colors.dark.primary, Colors.dark.secondary]} style={styles_ai.sendButtonGradient}>
                <Send size={20} color={Colors.dark.primary} />
              </LinearGradient>
            </TouchableOpacity>
          </BlurView>
        </View> */ }
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}