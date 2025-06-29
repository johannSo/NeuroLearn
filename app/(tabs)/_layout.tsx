import { HapticTab } from '@/components/HapticTab';
import HomeIcon from '@/components/icons/HomeIcon';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import { Tabs } from 'expo-router';
import { Settings as SettingsIcon } from 'lucide-react-native';
import React from 'react';
import { View } from 'react-native';

const AnimatedTabIcon = ({ Component, color, focused, ...rest }: { Component: React.ElementType, color: string, focused: boolean, [key: string]: any }) => {
  const size = focused ? 32 : 24;
  return (
    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Component color={color} width={size} height={size} {...rest} />
    </View>
  );
};

const iconRenderer = (Component: React.ElementType) => ({ color, focused }: { color: string; focused: boolean }) => (
  <AnimatedTabIcon Component={Component} color={color} focused={focused} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.dark.accent,
        headerShown: false,
        tabBarShowLabel: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: [
          {
            position: 'absolute',
            left: 16,
            right: 16,
            bottom: 16,
            borderRadius: 20,
            backgroundColor: Colors.dark.card,
            borderWidth: 2,
            borderColor: Colors.dark.darkGray,
            height: 60,
            elevation: 16,
            shadowColor: Colors.dark.black,
            shadowOffset: { width: 0, height: 8 },
            shadowOpacity: 0.15,
            shadowRadius: 16,
            borderTopWidth: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          },
        ],
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              Component={HomeIcon}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="learn"
        options={{
          title: 'Learn',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              Component={IconSymbol}
              name="BookOpen"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="stats"
        options={{
          title: 'Stats',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              Component={IconSymbol}
              name="BarChart3"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="suggest"
        options={{
          title: 'Suggest',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              Component={IconSymbol}
              name="Lightbulb"
              color={color}
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="review"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="pause"
        options={{
          href: null,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, focused }) => (
            <AnimatedTabIcon
              key={focused ? 'focused' : 'unfocused'}
              Component={SettingsIcon}
              color={color}
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}
