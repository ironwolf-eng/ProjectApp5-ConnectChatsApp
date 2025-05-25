import React, { useState } from 'react';
import { FlatList, StyleSheet, Image, View } from 'react-native';
import { List, Divider, TextInput, Badge } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { useChat } from '../src/context/ChatContext';
import WhatsAppLayout from '../components/WhatsAppLayout';

const mockContacts = [
  { id: '1', name: 'Maykel', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/men/1.jpg' },
  { id: '2', name: 'Carlos', isOnline: false, photoUrl: 'https://randomuser.me/api/portraits/men/2.jpg' },
  { id: '3', name: 'Ana', isOnline: true, photoUrl: 'https://randomuser.me/api/portraits/women/3.jpg' },
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
    <WhatsAppLayout>
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
        contentContainerStyle={{ paddingBottom: 80 }}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
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
          </View>
        )}
      />
    </WhatsAppLayout>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    margin: 10,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // menor opacidad
    borderRadius: 12,
    marginHorizontal: 10,
    marginVertical: 5,
    overflow: 'hidden',
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
//     padding: 10,