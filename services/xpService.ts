import { STREAK_RESET_VALUE, XP_PER_SESSION } from '@/constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const XP_KEY = 'xp';
const STREAK_KEY = 'streak';
const LAST_SESSION_DATE_KEY = 'lastSessionDate';
const SESSION_HISTORY_KEY = 'sessionHistory';

interface Session {
  date: string;
  topic: string;
  concentration: number;
  mood: string;
  goalAchieved: boolean | string;
  duration?: number; // Duration in minutes
}

export async function getXP() {
  const xp = await AsyncStorage.getItem(XP_KEY);
  return xp ? parseInt(xp, 10) : 0;
}

export async function addXP(amount = XP_PER_SESSION) {
  const current = await getXP();
  const newXP = current + amount;
  await AsyncStorage.setItem(XP_KEY, newXP.toString());
  return newXP;
}

export async function getStreak() {
  const streak = await AsyncStorage.getItem(STREAK_KEY);
  return streak ? parseInt(streak, 10) : 0;
}

export async function updateStreak(increment = true) {
  let streak = await getStreak();
  streak = increment ? streak + 1 : STREAK_RESET_VALUE;
  await AsyncStorage.setItem(STREAK_KEY, streak.toString());
  return streak;
}

export async function resetStreak() {
  await AsyncStorage.setItem(STREAK_KEY, STREAK_RESET_VALUE.toString());
}

export async function getLastSessionDate() {
  return await AsyncStorage.getItem(LAST_SESSION_DATE_KEY);
}

export async function setLastSessionDate(dateStr: string) {
  await AsyncStorage.setItem(LAST_SESSION_DATE_KEY, dateStr);
}

export async function recordSessionForStreak() {
  const lastSessionDate = await getLastSessionDate();
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];

  if (lastSessionDate === todayStr) {
    return; // A session has already been recorded today, so the streak is safe.
  }

  const yesterday = new Date();
  yesterday.setDate(today.getDate() - 1);
  const yesterdayStr = yesterday.toISOString().split('T')[0];
  
  let streak = await getStreak();
  if (lastSessionDate === yesterdayStr) {
    // It's a consecutive day, so increment the streak.
    streak++;
  } else {
    // It's not a consecutive day, so the streak resets to 1.
    streak = 1;
  }

  await AsyncStorage.setItem(STREAK_KEY, streak.toString());
  await setLastSessionDate(todayStr); // Mark that a session has been completed today.
}

export async function getSessionHistory() {
  const history = await AsyncStorage.getItem(SESSION_HISTORY_KEY);
  return history ? JSON.parse(history) : [];
}

export async function addSessionHistory(session: Session) {
  const history = await getSessionHistory();
  history.push(session);
  await AsyncStorage.setItem(SESSION_HISTORY_KEY, JSON.stringify(history));
} 