import React from 'react';
import { Text, View } from 'react-native';
import { styles_settings } from './stylesheet';

export default function SettingsScreen() {
  return (
    <View style={styles_settings.container}>
      <Text style={styles_settings.title}>Settings</Text>
      {/* Add settings options here */}
    </View>
  );
}