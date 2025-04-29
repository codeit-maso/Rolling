import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipientCard.module.scss';
import RecentMessages from '../RecentMessages/RecentMessages';
import TopReactions from '../TopReactions/TopReactions';

export default function RecipientCard({ Recipient }) {
  const {
    id,
    name,
    recentMessages,
    messageCount,
    topReactions,
    backgroundColor,
    backgroundImageURL,
  } = Recipient;
  const navigate = useNavigate();
  const [isDragging, setIsDragging] = useState(false);

  function handleCardClick() {
    if (!isDragging) {
      navigate(`/post/${id}`);
    }
  }

  return (
    <div
      className={`${styles.card} ${backgroundImageURL ? '' : styles[backgroundColor]}`}
      style={
        backgroundImageURL
          ? {
              backgroundImage: `linear-gradient(#00000073, #00000073), url(${backgroundImageURL})`,
            }
          : {}
      }
      onClick={handleCardClick}
      onMouseDown={() => setIsDragging(false)}
      onTouchStart={() => setIsDragging(false)}
      onMouseMove={() => setIsDragging(true)}
      onTouchMove={() => setIsDragging(true)}
    >
      {backgroundColor === 'blue' && <div className={styles.triangle} />}
      <h3
        className={`${styles['card__h3']} ${backgroundImageURL ? styles.white : ''}`}
      >
        {`To. ${name}`}
      </h3>
      <RecentMessages messages={recentMessages} count={messageCount} />
      <div
        className={`${styles['card__writer-count']} ${backgroundImageURL && styles.white}`}
      >
        <span className={styles['card__count']}>{messageCount}</span>
        <span>명이 작성했어요!</span>
      </div>
      <div className={styles['card__centerline']} />
      <TopReactions reactions={topReactions} />
    </div>
  );
}
