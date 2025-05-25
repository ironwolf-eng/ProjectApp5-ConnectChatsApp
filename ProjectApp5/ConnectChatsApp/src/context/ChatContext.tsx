import React, { createContext, useContext, useState } from 'react';

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);

  const addMessage = (from, body, isMine = false) => {
    const newMessage = {
      id: Date.now().toString(),
      from,
      body,
      isMine,
      timestamp: new Date(),
      status: isMine ? 'sent' : 'delivered',
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simulación automática de cambio de estado
    if (isMine) {
      setTimeout(() => updateMessageStatus(newMessage.id, 'delivered'), 2000);
      setTimeout(() => updateMessageStatus(newMessage.id, 'read'), 4000);
    }
  };

  const updateMessageStatus = (messageId, newStatus) => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, status: newStatus } : msg
      )
    );
  };

  const resetUnread = () => {
    setMessages((prev) =>
      prev.map((msg) => ({ ...msg, isRead: true }))
    );
  };

  return (
    <ChatContext.Provider
      value={{ messages, addMessage, updateMessageStatus, resetUnread }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
//               styles.message,
//               { backgroundColor: item.isMine ? '#dcf8c6' : '#fff' },