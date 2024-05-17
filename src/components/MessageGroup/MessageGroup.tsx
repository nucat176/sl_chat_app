import React from 'react';
import clsx from 'clsx';

import { MessageGroupProps } from 'interfaces';

import styles from './MessageGroup.module.css';

const isGifUrl = (url: string) => {
  return url.match(/\.(gif)$/i) !== null;
};

const MessageGroup = ({ texts, name, timestamp, avatarUrl, mode }: MessageGroupProps) => {
  return (
    <div className={clsx(styles.message, mode === 'EVEN' ? styles.even : styles.odd)}>
      <div className={styles.messageHeader}>
        {avatarUrl && <img src={avatarUrl} alt="avatar" />}
        {name && <strong>{name}</strong>}
        {timestamp && <span>{timestamp}</span>}
      </div>
      {texts.map((text, index) =>
        isGifUrl(text) ? (
          <img key={index} src={text} alt="gif" style={{ maxWidth: '100%', marginTop: 10 }} />
        ) : (
          <p key={index}>{text}</p>
        ),
      )}
    </div>
  );
};

export default MessageGroup;
