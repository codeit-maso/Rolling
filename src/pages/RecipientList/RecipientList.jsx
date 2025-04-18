import styles from './RecipientList.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import getList from './Myapi';
import RecipientCard from './RecipientCard';
import nextImg from '../../assets/images/next.svg';

//(의문 & 고민) 𓆉✩°｡ ⋆
//1. {messageCount}명이 작성했어요! - 메세지 개수인데, 사람수로 판단한 멘트..가 과연 맞는지 모르겠다.
//2. 3초마다 캐러셀 옆으로 이동하는 기능 추가해도 좋을듯..

export default function RecipientList() {
  const [data, setData] = useState([]);
  const [popularity, setPopularity] = useState([]);
  const [recently, setRecently] = useState([]);

  //데이터 받아옴
  useEffect(() => {
    const fetchList = async () => {
      const { results } = await getList();
      setData(results);
    };
    fetchList();
  }, []);

  //1. 인기순 정렬 2.인기순,최신순 상태 업데이트
  useEffect(() => {
    const sortedByPopularity = [...data].sort(
      (a, b) =>
        b.messageCount + b.reactionCount - (a.messageCount + a.reactionCount),
    );
    setPopularity(sortedByPopularity);
    setRecently(data);
  }, [data]);

  console.log('###############');
  console.log(data);
  console.log('###############');
  console.log(popularity);
  console.log(recently);

  function next() {
    return console.log(nextImg);
  }

  //section이 가장 적합할지 고민해보기
  return (
    <>
      <h2>인기 롤링 페이퍼 </h2>
      <section>
        <div className={styles.cardset}>
          {popularity.map((it) => (
            <RecipientCard Recipient={it}></RecipientCard>
          ))}
        </div>
        <button onClick={next} className={styles.button}></button>
        <button
          onClick={next}
          className={`${styles.button} ${styles.mirrored}`}
        ></button>
      </section>

      <h2>최근에 만든 롤링 페이퍼 </h2>
      <section className={styles.cardset}>
        {recently.map((it) => (
          <RecipientCard Recipient={it}></RecipientCard>
        ))}
      </section>
    </>
  );
}
