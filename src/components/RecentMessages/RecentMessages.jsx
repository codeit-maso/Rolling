import styles from './RecentMessages.module.scss';

//카드 내부 요소 컴포넌트(동그라미 배열-최신메세지)
export default function RecentMessages({ messages, count }) {
  return (
    <div className={styles['card__recent-messages']}>
      {messages.map((message) => (
        <img
          src={message.profileImageURL}
          className={styles.img}
          key={message.id}
        />
      ))}
      {count > 3 ? (
        <div className={styles.count}>+{count > 102 ? 99 : count - 3}</div>
      ) : null}
    </div>
  );
}
