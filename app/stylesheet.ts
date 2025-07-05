import { Colors } from '@/constants/Colors';
import { StyleSheet } from 'react-native';


export const styles_ai = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: Colors.dark.card,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark.border,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: Colors.dark.primary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: Colors.dark.muted,
  },
  messagesContainer: {
    flex: 1,
  },
  messagesContent: {
    padding: 16,
    paddingBottom: 20,
  },
  messageContainer: {
    marginBottom: 12,
  },
  userMessage: {
    alignItems: 'flex-end',
  },
  aiMessage: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 16,
  },
  userBubble: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  aiBubble: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  messageHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
  },
  userSender: {
    color: Colors.dark.primary,
  },
  aiSender: {
    color: Colors.dark.primary,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  userText: {
    color: Colors.dark.primary,
  },
  aiText: {
    color: Colors.dark.text,
  },
  loadingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  loadingText: {
    marginLeft: 8,
    fontSize: 14,
    color: Colors.dark.muted,
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: Colors.dark.card,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
    alignItems: 'flex-end',
  },
  textInput: {
    flex: 1,
    backgroundColor: Colors.dark.border,
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
    fontSize: 16,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: Colors.dark.primary,
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: Colors.dark.muted,
  },
  suggestedQuestionsContainer: {
    padding: 12,
    backgroundColor: Colors.dark.card,
    borderTopWidth: 1,
    borderTopColor: Colors.dark.border,
  },
  suggestedQuestionsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.muted,
    marginBottom: 8,
  },
  suggestedQuestionButton: {
    padding: 8,
    backgroundColor: '#222',
    borderRadius: 16,
    marginBottom: 6,
    marginRight: 8,
    alignSelf: 'flex-start',
  },
  suggestedQuestionText: {
    fontSize: 13,
    fontWeight: '500',
    color: Colors.dark.primary,
  },
  suggestedQuestionsRow: {
    flexDirection: 'row',
    color: Colors.dark.muted,
    flexWrap: 'wrap',
  },
  gradientBg: {
    flex: 1,
  },
  bubbleGlass: {
    borderRadius: 18,
    marginBottom: 10,
    overflow: 'hidden',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
  },
  inputGlass: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 16,
    paddingHorizontal: 12,
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
  sendButtonGradient: {
    borderRadius: 16,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 

export const styles_stats = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: Colors.dark.background,
  },
  center: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    padding: 20,
    paddingBottom: 100,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: Colors.dark.text,
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
    color: Colors.dark.primary,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.muted,
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.dark.text,
    marginTop: 8,
  },
  statLabel: {
    fontSize: 14,
    color: Colors.dark.muted,
    marginTop: 4,
  },
  chartCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: Colors.dark.text,
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  gradientBg: {
    flex: 1,
  },
  cardGlass: {
    borderRadius: 20,
    marginBottom: 18,
    overflow: 'hidden',
  },
}); 

export const styles_settings = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark.background,
    padding: 24,
    paddingTop: 48,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 24,
  },
}); 

export const styles_pause = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardGlass: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.dark.text,
    marginBottom: 32,
    textAlign: 'center',
  },
  continueButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    minHeight: 56,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 3,
  },
  continueButtonText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  continueButtonGradient: {
    backgroundColor: Colors.dark.lightGray,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    width: '100%',
  },
}); 

export const styles_review = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    color: '#4F8EF7',
    textAlign: 'center',
    marginBottom: 24,
  },
  question: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
    marginBottom: 12,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#181818',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#FFF',
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 12,
  },
  choiceButton: {
    backgroundColor: '#181818',
    borderWidth: 2,
    borderColor: '#222',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    minWidth: 80,
    alignItems: 'center',
  },
  choiceSelected: {
    borderColor: '#fff',
    backgroundColor: '#222',
  },
  choiceText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFF',
  },
  completeButton: {
    backgroundColor: '#888',
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
    width: '100%',
  },
  completeButtonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: '700',
  },
  disabledButton: {
    backgroundColor: '#222',
  },
  cardGlass: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: 'rgba(24,24,24,0.85)',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
    backgroundColor: 'transparent',
  },
}); 

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: Colors.dark.background,
      padding: 20,
      paddingTop: 40,
    },
    tipCard: {
      backgroundColor: Colors.dark.card,
      borderRadius: 16,
      padding: 20,
      marginBottom: 24,
      shadowColor: Colors.dark.shadow,
      shadowOpacity: 0.1,
      shadowRadius: 8,
      shadowOffset: { width: 0, height: 4 },
      elevation: 2,
    },
    tipTitle: {
      fontSize: 16,
      fontWeight: '700',
      color: Colors.dark.accent,
      marginBottom: 8,
    },
    tipText: {
      fontSize: 15,
      color: Colors.dark.text,
    },
    startButton: {
      borderRadius: 16,
      marginBottom: 28,
      overflow: 'hidden',
    },
    startButtonGradient: {
      paddingVertical: 18,
      alignItems: 'center',
      justifyContent: 'center',
    },
    startButtonText: {
      color: '#fff',
      fontSize: 20,
      fontWeight: '800',
      letterSpacing: 1,
      textAlign: 'center',
    },
    progressContainer: {
      backgroundColor: Colors.dark.card,
      borderRadius: 14,
      padding: 16,
      alignItems: 'center',
      marginTop: 8,
      shadowColor: Colors.dark.shadow,
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 2 },
      elevation: 1,
    },
    progressLabel: {
      fontSize: 15,
      color: Colors.dark.muted,
      marginBottom: 8,
      fontWeight: '600',
    },
    progressBarBg: {
      width: '100%',
      height: 12,
      backgroundColor: Colors.dark.lightGray,
      borderRadius: 6,
      overflow: 'hidden',
    },
    progressBarFill: {
      height: 12,
      backgroundColor: Colors.dark.primary,
      borderRadius: 6,
    },
    progressText: {
      fontSize: 14,
      color: Colors.dark.text,
      fontWeight: '700',
    },
});


export const styles_learn = StyleSheet.create({
  gradientBg: {
    flex: 1,
    backgroundColor: '#000',
  },
  innerContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  cardGlass: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  card: {
    borderRadius: 20,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
    marginBottom: 18,
    overflow: 'hidden',
  },
  title: {
    fontSize: 28,
    fontWeight: '800',
    marginBottom: 24,
    color: Colors.dark.primary,
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#181818',
    borderRadius: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: '#222',
    marginBottom: 20,
    width: '100%',
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    color: '#FFF',
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  topicContainer: {
    padding: 12,
    // backgroundColor: Colors.dark.white,
    borderRadius: 12,
    marginBottom: 24,
  },
  topicText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.dark.primary,
  },
  timerContainer: {
    alignItems: 'center',
    marginBottom: 16,
    width: '100%',
  },
  timerText: {
    fontSize: 64,
    fontWeight: '800',
    color: Colors.dark.primary,
    marginBottom: 16,
    letterSpacing: 2,
  },
  progressBarBg: {
    width: '100%',
    height: 12,
    backgroundColor: Colors.dark.lightGray,
    borderRadius: 6,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: 12,
    backgroundColor: Colors.dark.primary,
    borderRadius: 6,
  },
  infoText: {
    fontSize: 14,
    color: Colors.dark.text,
    marginTop: 16,
    textAlign: 'center',
    marginBottom: 24,
  },
  startButton: {
    backgroundColor: '#888',
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 32,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#222',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  disabledButton: {
    backgroundColor: '#222',
    shadowColor: 'transparent',
    elevation: 0,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginTop: 16,
  },
  controlButton: {
    backgroundColor: Colors.dark.lightGray,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 20,
    minWidth: 90,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#222',
  },
  controlButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
});