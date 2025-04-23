import styles from './RecipientCard.module.scss';
import RecentMessages from './RecentMessages';
import TopReactions from './TopReactions';

//캐러셀 내부 요소 - 카드 컴포넌트
export default function RecipientCard({ Recipient }) {
  const {
    name,
    recentMessages,
    messageCount,
    topReactions,
    backgroundColor,
    backgroundImageURL,
    createdAt,
  } = Recipient;

  return (
    <div
      className={`${styles.card} ${backgroundImageURL ? '' : styles[backgroundColor]}`}
      style={
        backgroundImageURL
          ? {
              backgroundImage: `linear-gradient(#00000073, #00000073), url(${backgroundImageURL})`,
              color: 'white',
            }
          : {}
      }
    >
      <h3>{`To. ${name}`}</h3>
      <RecentMessages
        messages={recentMessages}
        count={messageCount}
      ></RecentMessages>
      <div className={styles['writer-count']}>
        <span className={styles.count}>{messageCount}</span>
        <span>명이 작성했어요!</span>
      </div>
      <div className={styles['card__centerline']}></div>
      <TopReactions reactions={topReactions}></TopReactions>
    </div>
  );
}
