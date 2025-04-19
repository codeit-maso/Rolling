import styles from './RecentMessages.module.scss';

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
      {count > 3 ? <div className={styles.count}>+{count - 3}</div> : null}
    </div>
  );
}
