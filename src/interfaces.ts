export interface Message {
  text: string;
  name: string;
  timestamp: string;
  avatarUrl: string;
}

export interface MessageGroupProps {
  texts: string[];
  name?: string;
  timestamp?: string;
  avatarUrl?: string;
  mode?: 'EVEN' | 'ODD';
}

export interface MessageInputBarProps {
  onSendMessage: (text: string) => void;
}

export interface Gif {
  id: string;
  images: {
    fixed_height: {
      url: string;
    };
  };
}
