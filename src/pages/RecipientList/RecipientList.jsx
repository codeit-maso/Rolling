import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './RecipientList.module.scss';
import getRecipients from '../../api/getRecipients';
import Button from '../../components/common/Button';
import Carousel from '../../components/Carousel/Carousel';
import { useImagePreloader } from '../../hooks/useImagePreloader';
import CarouselSkeleton from '../../components/CarouselSkeleton/CarouselSkeleton';

export default function RecipientList() {
  const [popularity, setPopularity] = useState([]);
  const [recently, setRecently] = useState([]);
  const [isFetched, setIsFetched] = useState(false);
  const navigate = useNavigate();

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
        setIsFetched(true);
      } catch (error) {
        console.error('데이터 불러오기 실패', error);
      }
    };
    fetchData();
  }, []);

  const isLoadingImages = useImagePreloader(isFetched ? recently : []);

  return (
    <>
      <div className={styles['section-group']}>
        <section className={styles['section-listpage']}>
          <h2 className={styles['section__h2']}>인기 롤링 페이퍼 🔥</h2>
          {isLoadingImages ? (
            <CarouselSkeleton className={styles['skeleton-liked']} />
          ) : (
            <Carousel recipients={popularity} />
          )}
        </section>
        <section className={styles['section-listpage']}>
          <h2 className={styles['section__h2']}>최근에 만든 롤링 페이퍼 ⭐️</h2>
          {isLoadingImages ? (
            <CarouselSkeleton className={styles['skeleton-recently']} />
          ) : (
            <Carousel recipients={recently} />
          )}
        </section>
      </div>
      <Button children="나도 만들어보기" onClick={() => navigate('/post')} />
    </>
  );
}
