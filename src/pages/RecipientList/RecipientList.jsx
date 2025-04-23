import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipientList.module.scss';
import Carousel from './Carousel';
import getRecipients from '../../api/getRecipients';
import Button from '../../components/common/Button';

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
  const navigate = useNavigate();

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
      <div className={styles['section-group']}>
        <section>
          <h2>인기 롤링 페이퍼 🔥</h2>
          <Carousel recipients={popularity} />
        </section>
        <section>
          <h2>최근에 만든 롤링 페이퍼 ⭐️</h2>
          <Carousel recipients={recently} />
        </section>
      </div>
      <Button children="나도 만들어보기" onClick={() => navigate('/post')} />
    </>
  );
}
