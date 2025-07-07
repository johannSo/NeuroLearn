import { Colors } from '@/constants/Colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

interface ProfileData {
  name: string;
  age: string;
  country: string;
  learningHabits: string;
  adhd: 'Yes' | 'Suspected' | 'No';
}

export default function ProfileScreen() {
  const [profileData, setProfileData] = useState<ProfileData>({
    name: '',
    age: '',
    country: '',
    learningHabits: '',
    adhd: 'No'
  });
  const [isEditing, setIsEditing] = useState(false);
  const [hasData, setHasData] = useState(false);

  useEffect(() => {
    loadProfileData();
  }, []);

  const loadProfileData = async () => {
    try {
      const savedData = await AsyncStorage.getItem('PROFILE_DATA');
      if (savedData) {
        const parsedData = JSON.parse(savedData);
        setProfileData(parsedData);
        setHasData(true);
      }
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  };

  const saveProfileData = async () => {
    try {
      await AsyncStorage.setItem('PROFILE_DATA', JSON.stringify(profileData));
      setHasData(true);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving profile data:', error);
    }
  };

  const handleInputChange = (field: keyof ProfileData, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const renderForm = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <View style={styles.formContainer}>
        <Text style={styles.label}>Name</Text>
        <TextInput
          style={styles.input}
          value={profileData.name}
          onChangeText={(value) => handleInputChange('name', value)}
          placeholder="Enter your name"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Age</Text>
        <TextInput
          style={styles.input}
          value={profileData.age}
          onChangeText={(value) => handleInputChange('age', value)}
          placeholder="Enter your age"
          placeholderTextColor="#888"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Country</Text>
        <TextInput
          style={styles.input}
          value={profileData.country}
          onChangeText={(value) => handleInputChange('country', value)}
          placeholder="Enter your country"
          placeholderTextColor="#888"
        />

        <Text style={styles.label}>Learning Habits/Strategies</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={profileData.learningHabits}
          onChangeText={(value) => handleInputChange('learningHabits', value)}
          placeholder="Describe your learning habits and strategies..."
          placeholderTextColor="#888"
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />

        <Text style={styles.label}>ADHD</Text>
        <View style={styles.adhdContainer}>
          {(['Yes', 'Suspected', 'No'] as const).map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.adhdOption,
                profileData.adhd === option && styles.adhdOptionSelected
              ]}
              onPress={() => handleInputChange('adhd', option)}
            >
              <Text style={[
                styles.adhdOptionText,
                profileData.adhd === option && styles.adhdOptionTextSelected
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={styles.saveButton}
          onPress={saveProfileData}
        >
          <Text style={styles.saveButtonText}>Save Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderProfileView = () => (
    <View style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      
      <ScrollView style={styles.profileContainer} showsVerticalScrollIndicator={false}>
        <View style={styles.profileCard}>
          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Name</Text>
            <Text style={styles.fieldValue}>{profileData.name || 'Not specified'}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Age</Text>
            <Text style={styles.fieldValue}>{profileData.age || 'Not specified'}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Country</Text>
            <Text style={styles.fieldValue}>{profileData.country || 'Not specified'}</Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>Learning Habits/Strategies</Text>
            <Text style={styles.fieldValue}>
              {profileData.learningHabits || 'Not specified'}
            </Text>
          </View>

          <View style={styles.profileField}>
            <Text style={styles.fieldLabel}>ADHD</Text>
            <Text style={styles.fieldValue}>{profileData.adhd}</Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.editButton}
          onPress={() => setIsEditing(true)}
        >
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );

  return hasData && !isEditing ? renderProfileView() : renderForm();
}

const styles = StyleSheet.create({
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
  formContainer: {
    flex: 1,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.dark.text,
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.dark.text,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  adhdContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  adhdOption: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 8,
    minWidth: 80,
    alignItems: 'center',
  },
  adhdOptionSelected: {
    backgroundColor: Colors.dark.primary,
    borderColor: Colors.dark.primary,
  },
  adhdOptionText: {
    fontSize: 14,
    color: Colors.dark.text,
    fontWeight: '500',
  },
  adhdOptionTextSelected: {
    color: Colors.dark.background,
  },
  saveButton: {
    backgroundColor: Colors.dark.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 32,
  },
  saveButtonText: {
    color: Colors.dark.background,
    fontSize: 18,
    fontWeight: '700',
  },
  profileContainer: {
    flex: 1,
  },
  profileCard: {
    backgroundColor: Colors.dark.card,
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.dark.border,
  },
  profileField: {
    marginBottom: 20,
  },
  fieldLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.dark.muted,
    marginBottom: 4,
  },
  fieldValue: {
    fontSize: 16,
    color: Colors.dark.text,
    lineHeight: 22,
  },
  editButton: {
    backgroundColor: Colors.dark.card,
    borderWidth: 1,
    borderColor: Colors.dark.border,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
  },
  editButtonText: {
    color: Colors.dark.text,
    fontSize: 18,
    fontWeight: '600',
  },
}); 