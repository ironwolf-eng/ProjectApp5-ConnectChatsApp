import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, TextInput, StyleSheet, KeyboardAvoidingView, Platform, Text } from 'react-native';
import { Button } from 'react-native-paper';
import { useLocalSearchParams } from 'expo-router';
import { useChat } from '../../src/context/ChatContext';
import moment from 'moment';

export default function ChatScreen() {
  const { id, name } = useLocalSearchParams();
  const { messages, addMessage, resetUnread } = useChat();

  const [input, setInput] = useState('');
  const flatListRef = useRef();

  const chatMessages = messages.filter((msg) => msg.from === id);

  useEffect(() => {
    resetUnread();
  }, []);

  const handleSend = () => {
    if (input.trim() !== '') {
      addMessage(id, input, true); // `true` → es mío
      setInput('');
      scrollToEnd();
    }
  };

  const scrollToEnd = () => {
    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const renderStatus = (status) => {
    switch (status) {
      case 'sent':
        return '✓';
      case 'delivered':
        return '✓✓';
      case 'read':
        return '✓✓ (blue)';
      default:
        return '';
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={100}
    >
      <FlatList
        ref={flatListRef}
        data={chatMessages}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageBubble,
              item.isMine ? styles.myMessage : styles.theirMessage,
            ]}
          >
            <Text style={styles.messageText}>{item.body}</Text>
            <View style={styles.metaRow}>
              <Text style={styles.timeText}>
                {moment(item.timestamp).format('HH:mm')}
              </Text>
              {item.isMine && (
                <Text style={styles.statusText}>{renderStatus(item.status)}</Text>
              )}
            </View>
          </View>
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.inputRow}>
        <TextInput
          style={styles.textInput}
          value={input}
          onChangeText={setInput}
          placeholder="Type a message..."
        />
        <Button mode="contained" onPress={handleSend} style={styles.sendButton}>
          Send
        </Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f0f0f0' },
  list: { padding: 10 },
  messageBubble: {
    padding: 10,
    borderRadius: 20,
    marginVertical: 4,
    maxWidth: '70%',
  },
  myMessage: {
    backgroundColor: '#CE93D8',
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#e0e0e0',
    alignSelf: 'flex-start',
  },
  messageText: {
    fontSize: 16,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginTop: 4,
  },
  timeText: {
    fontSize: 10,
    color: '#555',
    marginRight: 6,
  },
  statusText: {
    fontSize: 10,
    color: '#555',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f5f5f5',
  },
  textInput: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 12,
    marginRight: 8,
    height: 40,
  },
  sendButton: {
    borderRadius: 20,
  },
});
//   },
//   },