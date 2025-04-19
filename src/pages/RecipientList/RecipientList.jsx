import { useState, useEffect } from 'react';
import './RecipientList.module.scss';
import getList from './Myapi';
import Carousel from './Carousel';

// API수정하기

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

  //데이터 받아옴
  useEffect(() => {
    const fetchList = async () => {
      const { results } = await getList();
      const sortedArray = sortByPopularity(results);
      setRecently(results);
      setPopularity(sortedArray);
    };
    fetchList();
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
