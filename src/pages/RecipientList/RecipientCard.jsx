import styles from './RecipientCard.module.scss';
import RecentMessages from './RecentMessages';
import TopReactions from './TopReactions';
import { useNavigate } from 'react-router-dom';

//캐러셀 내부 요소 - 카드 컴포넌트
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
      onClick={() => navigate(`/post/${id}`)}
    >
      {backgroundColor === 'blue' && <div className={styles.triangle} />}
      <h3 className={backgroundImageURL && styles.white}>{`To. ${name}`}</h3>
      <RecentMessages
        messages={recentMessages}
        count={messageCount}
      ></RecentMessages>
      <div
        className={`${styles['writer-count']} ${backgroundImageURL && styles.white}`}
      >
        <span className={styles.count}>{messageCount}</span>
        <span>명이 작성했어요!</span>
      </div>
      <div className={styles['card__centerline']}></div>
      <TopReactions reactions={topReactions}></TopReactions>
    </div>
  );
}
