import styles from './TopReactions.module.scss';

//카드 내부 요소 컴포넌트(반응 이모티콘 배열)
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
