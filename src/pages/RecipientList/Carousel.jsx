import { useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import RecipientCard from './RecipientCard';

export default function Carousel({ prop }) {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState({}); // x좌표

  // 작동과정: button onclick --> settingIndex() --> setIndex --> useEffect( setOffsetX(),[index] ): x좌표 상태 업데이트: 캐러셀 이동
  useEffect(() => {
    setOffsetX({
      transform: `translateX(-${index * 295}px)`,
      transition: 'transform 0.5s ease-in-out',
    });
  }, [index]);

  function settingIndex(direction) {
    if (direction === 'next') {
      setIndex((prev) => (prev + 1) % 8);
    } else if (direction === 'back') {
      setIndex((prev) => prev - 1);
    }
  }

  return (
    <div className={styles.carousel}>
      <div className={styles['carousel__cardset-wrapper']}>
        <div className={styles['carousel__cardset']} style={offsetX}>
          {prop.map((it) => (
            <RecipientCard Recipient={it} key={it.id}></RecipientCard>
          ))}
        </div>
      </div>
      {index > 0 && ( // 시작점 이후부터
        <button
          onClick={() => settingIndex('back')}
          className={`${styles['carousel__direction-button']} ${styles.back}`}
        ></button>
      )}
      {index !== 4 && ( // 캐러셀 끝에 도달하기 전까지
        <button
          onClick={() => settingIndex('next')}
          className={`${styles['carousel__direction-button']}`}
        ></button>
      )}
    </div>
  );
}
