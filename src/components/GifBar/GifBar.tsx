import React from 'react';
import { Spin } from 'antd';

import styles from './GifBar.module.css';

interface GifBarProps {
  loading: boolean;
  gifs: Gif[];
  handleGifClick: (gifUrl: string) => void;
}

interface Gif {
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}

const GifBar = ({ loading, gifs, handleGifClick }: GifBarProps) => {
  return loading ? (
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
  );
};

export default GifBar;
