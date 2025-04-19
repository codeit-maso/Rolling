import { useState, useEffect } from 'react';
import './RecipientList.module.scss';
import Carousel from './Carousel';
import getRecipients from '../../api/getRecipients';

//인기순 정렬
function sortByPopularity(array) {
  return [...array].sort(
    (a, b) =>
      b.messageCount + b.reactionCount - (a.messageCount + a.reactionCount),
  );
}
export default function RecipientList() {
  const [popularity, setPopularity] = useState([]);
  const [recently, setRecently] = useState([]);

  //데이터 받아옴, 상태 업데이트
  useEffect(() => {
    const getAndSet = async () => {
      try {
        const { results } = await getRecipients();
        const sortedArray = sortByPopularity(results);
        setRecently(results);
        setPopularity(sortedArray);
      } catch (error) {
        console.error(`in '/list' page:: 데이터 불러오기 실패:`, error);
      }
    };
    getAndSet();
  }, []);

  return (
    <>
      <section>
        <h2>인기 롤링 페이퍼 🔥</h2>
        <Carousel prop={popularity} />
      </section>
      <section>
        <h2>최근에 만든 롤링 페이퍼 ⭐️</h2>
        <Carousel prop={recently} />
      </section>
    </>
  );
}
