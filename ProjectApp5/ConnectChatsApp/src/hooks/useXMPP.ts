import { client, xml } from '@xmpp/client';
import { useRef } from 'react';

export const useXMPP = () => {
  const xmppRef = useRef(null);

  const connect = async (username, password) => {
    xmppRef.current = client({
      service: 'xmpp://connectchats.org:5222', // STARTTLS (recomendado)
      domain: 'connectchats.org',
      username,
      password,
    });

    xmppRef.current.on('error', (err) => {
      console.error('❌ XMPP error:', err);
    });

    xmppRef.current.on('online', (address) => {
      console.log('✅ Connected as', address.toString());
      xmppRef.current.send(xml('presence'));
    });

    xmppRef.current.on('stanza', (stanza) => {
      if (stanza.is('message')) {
        console.log('📩 Received message:', stanza.toString());
      }
    });

    try {
      await xmppRef.current.start();
      console.log('🚀 XMPP client started');
      return true;
    } catch (error) {
      console.error('❌ Failed to connect:', error);
      return false;
    }
  };

  const disconnect = async () => {
    if (xmppRef.current) {
      await xmppRef.current.stop();
      console.log('🔌 Disconnected');
    }
  };

  const sendMessage = (to, body) => {
    const message = xml('message', { type: 'chat', to }, xml('body', {}, body));
    xmppRef.current.send(message);
  };

  return { connect, disconnect, sendMessage };
};
// This custom hook provides a simple interface for connecting to an XMPP server, sending messages, and handling incoming messages.