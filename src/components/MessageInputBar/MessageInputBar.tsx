import React, { useState } from 'react';
import { Button, Input, Spin } from 'antd';
import { GifOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';

import { MessageInputBarProps, Gif } from 'interfaces';

import styles from './MessageInputBar.module.css';

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

  const handleSend = () => {
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.footer}>
      {showGifBar &&
        (gifsLoading ? (
          <div className={styles.loadingContainer}>
            <Spin size="large" tip="Loading" />
          </div>
        ) : (
          <div className={styles.gifContainer}>
            {gifs.map((gif: Gif) => (
              <img
                key={gif.id}
                src={gif.images.fixed_height.url}
                alt="gif"
                onClick={() => handleGifClick(gif.images.fixed_height.url)}
              />
            ))}
          </div>
        ))}
      <div className={styles.inputBar}>
        <Button
          onClick={() => {
            if (showGifBar) {
              setShowGifBar(false);
            } else {
              setShowGifBar(true);

              if (!gifs.length) {
                fetchGifs();
              }
            }
          }}
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
          onPressEnter={handleSend}
        />
        <Button onClick={handleSend} icon={<SendOutlined />} size="large" className={styles.chatBarButton} />
      </div>
    </div>
  );
};

export default MessageInputBar;
