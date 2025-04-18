import styles from './RecentMessages.module.scss';

export default function TopReactions({ reactions }) {
  return (
    <div className={styles.reactions}>
      {reactions.map((reaction) => (
        <div key={reaction.id} className={styles.reaction}>
          <span>{reaction.emoji}</span>
          <span>{reaction.count}</span>
        </div>
      ))}
    </div>
  );
}

//완료~~
// RecentMessages, TopReactions 컴포넌트 완성 - 커밋 남기기
