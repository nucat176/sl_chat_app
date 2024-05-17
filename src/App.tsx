import React, { useState, useEffect, useRef } from 'react';
import { Layout } from 'antd';

import MessageGroup from 'components/MessageGroup/MessageGroup';
import MessageInputBar from 'components/MessageInputBar';
import { Message, MessageGroupProps } from './interfaces';
import { CURRENT_USER, OTHER_USERS } from 'users';
import logo from './assets/sleeper-logo-w.png';

import styles from './App.module.css';

const { Header, Content, Footer } = Layout;

const App = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const messagesEndRef = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomUserIndex = Math.floor(Math.random() * OTHER_USERS.length);
      const randomUser = OTHER_USERS[randomUserIndex];
      const randomMessageIndex = Math.floor(Math.random() * randomUser.possibleMessages.length);
      const randomMessage = randomUser.possibleMessages[randomMessageIndex];

      handleSendMessage(randomMessage, randomUser.name, randomUser.avatarImgUrl);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSendMessage = (text: string, name = CURRENT_USER.name, avatarUrl = CURRENT_USER.avatarImgUrl) => {
    const newMessage = {
      text,
      name,
      timestamp: new Date().toLocaleTimeString(),
      avatarUrl,
    };
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const groupedMessages = messages.reduce((acc: MessageGroupProps[], message: Message) => {
    const lastGroup: MessageGroupProps = acc[acc.length - 1];
    if (lastGroup && lastGroup.name === message.name) {
      lastGroup.texts.push(message.text);
    } else {
      acc.push({ ...message, texts: [message.text] });
    }
    return acc;
  }, []);

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <img src={logo} alt="logo" className={styles.logo} />
      </Header>
      <Content className={styles.content}>
        {groupedMessages.map((group, index) => (
          <MessageGroup
            key={index}
            texts={group.texts}
            name={group.name}
            timestamp={group.timestamp}
            avatarUrl={group.avatarUrl}
            mode={index % 2 === 0 ? 'EVEN' : 'ODD'}
          />
        ))}
        <div ref={messagesEndRef} />
      </Content>
      <Footer className={styles.footer}>
        <MessageInputBar onSendMessage={(text) => handleSendMessage(text)} />
      </Footer>
    </Layout>
  );
};

export default App;
