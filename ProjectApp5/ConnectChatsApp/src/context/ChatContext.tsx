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
      isRead: !isMine, // si es mío, todavía no está leído por el otro
    };

    setMessages((prev) => [...prev, newMessage]);

    // Simula cambios de estado si es un mensaje propio
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

  const unreadCount = messages.filter((msg) => !msg.isRead && !msg.isMine).length;

  return (
    <ChatContext.Provider
      value={{
        messages,
        addMessage,
        updateMessageStatus,
        resetUnread,
        unreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

export const useChat = () => useContext(ChatContext);
