import React from 'react';
import { View, FlatList, StyleSheet, ImageBackground } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';
// Si necesitas formatear fecha:
// import { formatTime } from '../src/utils/formatDate';

const mockChats = [
  { id: '1', name: 'Maykel' },
  { id: '2', name: 'Carlos' },
  { id: '3', name: 'Ana' },
];

export default function ChatListScreen() {
  const router = useRouter();

  const handleChatPress = (chatId, chatName) => {
    router.push({
      pathname: `/chat/${chatId}`,
      params: { name: chatName },
    });
  };

  return (
    <ImageBackground
      source={require('../assets/chat-background.png')} // ✅ pon tu imagen aquí (asegúrate que existe en assets)
      style={styles.background}
    >
      <FlatList
        data={mockChats}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={Divider}
        renderItem={({ item }) => (
          <List.Item
            title={item.name}
            description="Last message preview"
            onPress={() => handleChatPress(item.id, item.name)}
            left={(props) => <List.Icon {...props} icon="account-circle" />}
            style={styles.listItem}
          />
        )}
        contentContainerStyle={styles.listContainer}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  listContainer: {
    padding: 10,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 10,
    margin: 10,
  },
  listItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 8,
    marginVertical: 4,
  },
});
//     padding: 10,
//     borderRadius: 10,