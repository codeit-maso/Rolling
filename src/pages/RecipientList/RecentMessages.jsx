import styles from './RecentMessages.module.scss';

export default function RecentMessages({ messages, count }) {
  return (
    <div className={styles.messages}>
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

//RecentMessages는 알아서 3개 이하의 요소만 갖는건지 모르겠음. map 할때 요소를 3개까지로 자를 필요는 없는건지..
//Messagecount의 값으로 '00명이 작성했어요!'를 표시하는거 같은데, 롤링페이퍼니까 A가 B에게 여러개의 메세지를 작성할수는 없는 구조인건지 모르겟음
//받은 메세지가 99개 이상이면 +99로 표시하는것도 고려하면 좋을듯..(그만큼의 테스트 데이터 만들지도 못하겟지만)

//여기는 완료!
