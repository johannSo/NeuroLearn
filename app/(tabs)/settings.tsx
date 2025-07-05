import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { popup } from '../../components/Popup';
import { styles_learn, styles_settings } from '../stylesheet';

export default function SettingsScreen() {
  const [apiKey, setApiKey] = useState('');
  const [savedKey, setSavedKey] = useState('');
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  useEffect(() => {
    (async () => {
      const storedKey = await AsyncStorage.getItem('GEMINI_API_KEY');
      if (storedKey) {
        setApiKey(storedKey);
        setSavedKey(storedKey);
      }
    })();
  }, []);

  const saveKey = async () => {
    if (!apiKey.trim()) {
      popup.show('API Key Required', 'Please enter your Gemini API key to continue.', 'OK', undefined, undefined, undefined, 'warning');
      return;
    }
    await AsyncStorage.setItem('GEMINI_API_KEY', apiKey.trim());
    setSavedKey(apiKey.trim());
    setShowSuccessMessage(true);
    setTimeout(() => setShowSuccessMessage(false), 3000);
  };

  const clearAllData = async () => {
    try {
      await AsyncStorage.clear();
      setApiKey('');
      setSavedKey('');
      popup.show('Cleared Successfully', 'All data has been cleared successfully.', 'OK', undefined, undefined, undefined, 'success');
    } catch (error) {
      popup.show('Error', 'Failed to clear data. Please try again.', 'OK', undefined, undefined, undefined, 'error');
    }
  };

  const showDeleteConfirmation = () => {
    popup.show(
      'Clear All Data',
      'This will permanently delete all stored data including your API key. This action cannot be undone.',
      'Delete All',
      'Cancel',
      clearAllData,
      undefined,
      'warning'
    );
  };

  const testPopups = () => {
    // Test different popup types
    popup.show('Info Popup', 'This is an informational message.', 'OK', undefined, undefined, undefined, 'info');
    
    setTimeout(() => {
      popup.show('Success Popup', 'Operation completed successfully!', 'Great!', undefined, undefined, undefined, 'success');
    }, 1000);
    
    setTimeout(() => {
      popup.show('Warning Popup', 'Please be careful with this action.', 'I Understand', undefined, undefined, undefined, 'warning');
    }, 2000);
    
    setTimeout(() => {
      popup.show('Error Popup', 'Something went wrong. Please try again.', 'OK', undefined, undefined, undefined, 'error');
    }, 3000);
    
    setTimeout(() => {
      popup.show('Two Button Popup', 'This popup has two buttons for different actions.', 'Confirm', 'Cancel', 
        () => popup.show('Confirmed!', 'You pressed the confirm button.', 'OK', undefined, undefined, undefined, 'success'),
        () => popup.show('Cancelled!', 'You pressed the cancel button.', 'OK', undefined, undefined, undefined, 'info'),
        'info'
      );
    }, 4000);
  };

  return (
    <View style={styles_settings.container}>
      <Text style={styles_settings.title}>Settings</Text>
      <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 8 }}>Gemini API Key</Text>
      <TextInput
        value={apiKey}
        onChangeText={setApiKey}
        placeholder="Enter your Gemini API key"
        style={{
          backgroundColor: '#222',
          color: '#fff',
          borderRadius: 10,
          padding: 12,
          marginBottom: 12,
          borderWidth: 1,
          borderColor: '#444',
        }}
        autoCapitalize="none"
        autoCorrect={false}
        secureTextEntry
        placeholderTextColor="#fff"
      />
      <TouchableOpacity
        style={[
          styles_learn.startButton,
          { width: 'auto', alignSelf: 'stretch', paddingHorizontal: 0, marginBottom: 0 },
          !apiKey.trim() && styles_learn.disabledButton
        ]}
        onPress={saveKey}
        disabled={!apiKey.trim()}
      >
        <Text style={styles_learn.startButtonText}>Save API Key</Text>
      </TouchableOpacity>
      
      {showSuccessMessage && (
        <View style={{
          backgroundColor: '#1a3a1a',
          borderWidth: 1,
          borderColor: '#4CAF50',
          borderRadius: 10,
          padding: 12,
          marginTop: 12,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
          <Text style={{ color: '#4CAF50', fontSize: 16, marginRight: 8 }}>✓</Text>
          <Text style={{ color: '#4CAF50', fontSize: 14, fontWeight: '500' }}>
            API key saved successfully!
          </Text>
        </View>
      )}
      
      {savedKey && !showSuccessMessage ? (
        <Text style={{ color: '#4F8EF7', marginTop: 10, fontSize: 14 }}>API key saved.</Text>
      ) : null}
      
      <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#444', paddingTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#4F8EF7' }}>Development</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#4F8EF7',
            borderRadius: 10,
            padding: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#3a5f9f',
            marginBottom: 12,
          }}
          onPress={testPopups}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Test Popups</Text>
        </TouchableOpacity>
        <Text style={{ color: '#888', fontSize: 12, textAlign: 'center' }}>
          Test different popup types and configurations
        </Text>
      </View>
      
      <View style={{ marginTop: 20, borderTopWidth: 1, borderTopColor: '#444', paddingTop: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: '600', marginBottom: 16, color: '#ff4444' }}>Danger Zone</Text>
        <TouchableOpacity
          style={{
            backgroundColor: '#ff4444',
            borderRadius: 10,
            padding: 12,
            alignItems: 'center',
            borderWidth: 1,
            borderColor: '#cc3333',
          }}
          onPress={showDeleteConfirmation}
        >
          <Text style={{ color: '#fff', fontSize: 16, fontWeight: '600' }}>Delete All Data</Text>
        </TouchableOpacity>
        <Text style={{ color: '#888', marginTop: 8, fontSize: 12, textAlign: 'center' }}>
          This will clear all stored data including your API key
        </Text>
      </View>
    </View>
  );
}