import { useState, useEffect, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipientList.module.scss';
import getRecipients from '../../api/getRecipients';
import Button from '../../components/common/Button';
import React from 'react';
// import Carousel from './Carousel';
const Carousel = React.lazy(() => import('../../components/Carousel/Carousel'));

////스켈레톤 구현중..
import { createContext } from 'react';
////

export default function RecipientList() {
  const [popularity, setPopularity] = useState([]);
  const [recently, setRecently] = useState([]);
  const [isFetched, setIsFetched] = useState(false); //
  const navigate = useNavigate();

  ////스켈레톤 구현중..
  // const [isLoading, setIsLoading] = useState(false);
  // const ImageLoadContext = createContext();
  ////스켈레톤 구현중..

  //데이터 받아옴, 상태 업데이트
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dateRes, likedRes] = await Promise.all([
          getRecipients(),
          getRecipients('like'),
        ]);
        setRecently(dateRes.results);
        setPopularity(likedRes.results);
        setIsFetched(true); //
      } catch (error) {
        console.error('데이터 불러오기 실패', error);
      }
    };
    fetchData();
  }, []);
  console.log(recently); //
  console.log(popularity); //

  return (
    <>
      {/* <ImageLoadContext.Provider value={{isLoading,setIsLoading}}> */}

      <div className={styles['section-group']}>
        <section>
          <h2>인기 롤링 페이퍼 🔥</h2>
          <Suspense fallback={<div className={styles.loading}></div>}>
            <Carousel recipients={popularity} />
          </Suspense>
        </section>
        <section>
          <h2>최근에 만든 롤링 페이퍼 ⭐️</h2>
          <Suspense fallback={<div className={styles.loading}></div>}>
            <Carousel recipients={recently} />
          </Suspense>
        </section>
      </div>
      <Button children="나도 만들어보기" onClick={() => navigate('/post')} />
      {/* </ImageLoadContext.Provider> */}
    </>
  );
}
