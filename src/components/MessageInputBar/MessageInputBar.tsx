import React, { useState } from 'react';
import { Button, Input } from 'antd';
import { GifOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';

import GifBar from 'components/GifBar';

import styles from './MessageInputBar.module.css';

interface MessageInputBarProps {
  onSendMessage: (text: string) => void;
}

const MessageInputBar = ({ onSendMessage }: MessageInputBarProps) => {
  const [message, setMessage] = useState('');
  const [showGifBar, setShowGifBar] = useState(false);
  const [gifs, setGifs] = useState([]);
  const [gifsLoading, setGifsLoading] = useState(false);

  const fetchGifs = async () => {
    try {
      setGifsLoading(true);
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/trending?api_key=Awq5410QQl0416nJogqlsinldM2s9PCA&limit=50`,
      );
      const data = await response.json();
      setGifs(data.data);
    } catch (error) {
      console.error('Failed to fetch GIFs:', error);
    } finally {
      setGifsLoading(false);
    }
  };

  const handleGifClick = (gifUrl: string) => {
    onSendMessage(gifUrl);
    setShowGifBar(false);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const onGifButtonClick = () => {
    if (showGifBar) {
      setShowGifBar(false);
    } else {
      setShowGifBar(true);

      if (!gifs.length) {
        fetchGifs();
      }
    }
  };

  return (
    <div className={styles.footer}>
      {showGifBar && <GifBar loading={gifsLoading} gifs={gifs} handleGifClick={handleGifClick} />}
      <div className={styles.inputBar}>
        <Button
          onClick={onGifButtonClick}
          icon={showGifBar ? <CloseOutlined /> : <GifOutlined />}
          size="large"
          className={styles.chatBarButton}
        />
        <Input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          size="large"
          className={styles.input}
          onPressEnter={handleSendMessage}
        />
        <Button onClick={handleSendMessage} icon={<SendOutlined />} size="large" className={styles.chatBarButton} />
      </div>
    </div>
  );
};

export default MessageInputBar;
