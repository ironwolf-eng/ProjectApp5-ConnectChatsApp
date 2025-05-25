import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { List, Divider } from 'react-native-paper';
import { useRouter } from 'expo-router';

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
      params: { name: chatName }, // ✅ pasamos también el nombre
    });
  };

  return (
    <View style={styles.container}>
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
});
//     flexDirection: 'row',
//     alignItems: 'center',