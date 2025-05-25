import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Image } from 'react-native';
import { List, Divider, TextInput, Badge } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useChat } from '../src/context/ChatContext';

const mockContacts = [
  { id: '1', name: 'Maykel', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Carlos', isOnline: false, photoUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Ana', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
  { id: '4', name: 'Lucía', isOnline: false, photoUrl: 'https://randomuser.me/api/portraits/women/4.jpg' },
  { id: '5', name: 'María', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/women/5.jpg' },
  { id: '6', name: 'Juan', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/men/6.jpg' },
];

export default function ContactsScreen() {
  const router = useRouter();
  const { addMessage } = useChat();
  const [searchQuery, setSearchQuery] = useState('');

  const handleStartChat = (contact) => {
    addMessage(contact.id, 'Hola 👋', false);
    router.push({
      pathname: `/chat/${contact.id}`,
      params: { name: contact.name },
    });
  };

  const filteredContacts = mockContacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search contacts..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchInput}
        mode="outlined"
      />
      <FlatList
        data={filteredContacts}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description={item.isOnline ? 'Online' : 'Offline'}
            onPress={() => handleStartChat(item)}
            left={() => (
              <View style={styles.avatarContainer}>
                <Image source={{ uri: item.photoUrl }} style={styles.avatar} />
                <Badge style={[styles.statusBadge, item.isOnline ? styles.online : styles.offline]} />
              </View>
            )}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput: {
    margin: 10,
  },
  avatarContainer: {
    position: 'relative',
    marginRight: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  statusBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: 'white',
  },
  online: {
    backgroundColor: '#4CAF50',
  },
  offline: {
    backgroundColor: '#BDBDBD',
  },
});
// This code defines a ContactsScreen component that displays a list of contacts with their online status and allows users to search for contacts. When a contact is selected, it starts a chat with that contact.