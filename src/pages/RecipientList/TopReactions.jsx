import styles from './TopReactions.module.scss';

export default function TopReactions({ reactions }) {
  return (
    <div className={styles['card__reactions']}>
      {reactions.map((reaction) => (
        <div key={reaction.id} className={styles['card__reactions__reaction']}>
          <span>{reaction.emoji}</span>
          <span>{reaction.count}</span>
        </div>
      ))}
    </div>
  );
}
