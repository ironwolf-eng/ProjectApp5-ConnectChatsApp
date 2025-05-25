import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Text, Button, Avatar, TextInput } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../src/context/AuthContext';
import { useRouter } from 'expo-router';
import WhatsAppLayout from '../components/WhatsAppLayout'; // ✅ usa layout común

export default function ProfileScreen() {
  const { user, logout, updateUser } = useAuth();
  const router = useRouter();

  const [coverImage, setCoverImage] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [username, setUsername] = useState(user?.username || '');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    loadStoredData();
  }, []);

  const loadStoredData = async () => {
    try {
      const storedCover = await AsyncStorage.getItem('@cover_image');
      const storedProfile = await AsyncStorage.getItem('@profile_image');
      const storedUsername = await AsyncStorage.getItem('@username');
      const storedEmail = await AsyncStorage.getItem('@email');

      if (storedCover) setCoverImage(storedCover);
      if (storedProfile) setProfileImage(storedProfile);
      if (storedUsername) setUsername(storedUsername);
      if (storedEmail) setEmail(storedEmail);

      updateUser({
        username: storedUsername || user.username,
        email: storedEmail || user.email,
      });
    } catch (error) {
      console.error('❌ Failed to load data', error);
    }
  };

  const saveImage = async (key, uri) => {
    try {
      await AsyncStorage.setItem(key, uri);
    } catch (error) {
      console.error(`❌ Failed to save ${key}`, error);
    }
  };

  const clearImages = async () => {
    try {
      await AsyncStorage.multiRemove(['@cover_image', '@profile_image']);
      setCoverImage(null);
      setProfileImage(null);
      Alert.alert('✅ Images cleared', 'Cover photo and profile picture have been reset.');
    } catch (error) {
      console.error('❌ Failed to clear images', error);
      Alert.alert('❌ Error', 'Failed to clear images.');
    }
  };

  const pickImage = async (key, setImage) => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled && result.assets?.[0]?.uri) {
      const uri = result.assets[0].uri;
      setImage(uri);
      saveImage(key, uri);
    }
  };

  const handleSave = async () => {
    try {
      await AsyncStorage.setItem('@username', username);
      await AsyncStorage.setItem('@email', email);
      updateUser({ username, email });
      Alert.alert('✅ Profile updated', 'Your details have been saved.');
    } catch (error) {
      console.error('❌ Failed to save user data', error);
      Alert.alert('❌ Error', 'Failed to save user data.');
    }
  };

  const handleLogout = () => {
    logout();
    router.replace('/login');
  };

  return (
    <WhatsAppLayout>
      <ScrollView contentContainerStyle={styles.container}>
        <TouchableOpacity onPress={() => pickImage('@cover_image', setCoverImage)}>
          {coverImage ? (
            <Image source={{ uri: coverImage }} style={styles.coverPhoto} />
          ) : (
            <View style={[styles.coverPhoto, styles.coverPlaceholder]}>
              <Text style={{ color: '#888' }}>Tap to select cover photo</Text>
            </View>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.profilePicContainer}
          onPress={() => pickImage('@profile_image', setProfileImage)}
        >
          <Avatar.Image
            size={100}
            source={{
              uri: profileImage || user?.photoUrl || 'https://via.placeholder.com/150',
            }}
          />
        </TouchableOpacity>

        <TextInput
          label="Username"
          value={username}
          onChangeText={setUsername}
          style={styles.input}
          mode="outlined"
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          mode="outlined"
        />

        <Button mode="contained" onPress={handleSave} style={styles.saveButton}>
          Save Changes
        </Button>
        <Button mode="outlined" onPress={clearImages} style={styles.clearButton}>
          Clear Images
        </Button>
        <Button mode="outlined" onPress={() => router.push('/settings')} style={styles.settingsButton}>
          Go to Settings
        </Button>
        <Button mode="contained" onPress={handleLogout} style={styles.logoutButton}>
          Logout
        </Button>
      </ScrollView>
    </WhatsAppLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingBottom: 40,
  },
  coverPhoto: {
    width: '100%',
    height: 200,
  },
  coverPlaceholder: {
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilePicContainer: {
    marginTop: -50,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: 'white',
    overflow: 'hidden',
  },
  input: {
    width: '80%',
    marginTop: 10,
  },
  saveButton: {
    marginTop: 20,
    width: '60%',
    borderRadius: 30,
  },
  clearButton: {
    marginTop: 10,
    width: '60%',
    borderRadius: 30,
  },
  settingsButton: {
    marginTop: 10,
    width: '60%',
    borderRadius: 30,
  },
  logoutButton: {
    marginTop: 10,
    width: '60%',
    borderRadius: 30,
  },
});
//     textAlign: 'center',
//     color: '#555',