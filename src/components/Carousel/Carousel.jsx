import { useState, useEffect } from 'react';
import styles from './Carousel.module.scss';
import RecipientCard from '../RecipientCard/RecipientCard';

export default function Carousel({ recipients }) {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState({}); // x좌표
  const [startX, setstartX] = useState(0); // 클릭 시작 좌표 - 터치 스크롤
  const [isBouncing, setBouncing] = useState(false); // 캐러셀 끝이면 bouncing 모션
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const isDesktop = windowWidth > 1200;

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 캐러셀 버튼 작동과정: button onclick --> settingIndex(), setIndex --> useEffect( setOffsetX(),[index] ): x좌표 상태 업데이트: 캐러셀 이동
  useEffect(() => {
    setOffsetX({
      transform: `translateX(-${index * 295}px)`,
    });
  }, [index]);

  function settingIndex(direction) {
    setIndex((prev) => (direction === 'next' ? prev + 1 : prev - 1)); // next? next index :  back index
  }

  // 터치, 마우스 드래그 감지 --> 캐러셀 한 칸 이동
  function handleStart(e) {
    if (isDesktop) return;
    const touchStart =
      e.type === 'touchstart' ? e.touches[0].clientX : e.clientX;
    setstartX(touchStart);
  }

  function handleEnd(e) {
    const touchEnd =
      e.type === 'touchend' ? e.changedTouches[0].clientX : e.clientX;
    const distance = Math.abs(touchEnd - startX); //드래그 거리
    const isNext = startX > touchEnd; // direction(next,back) 결정
    if (isDesktop || distance < 10) return;

    if (!isNext) {
      if (index === 0) {
        setBouncing(true); //캐러셀 끝 -> setBounce(띠용)
        return;
      } else if (index > 0) {
        settingIndex('back');
        return;
      }
    } else if (isNext) {
      if (index === 5) {
        setBouncing(true);
        return;
      } else if (index < 5) {
        settingIndex('next');
        return;
      }
    }
  }
  useEffect(() => {
    if (isBouncing) {
      const timer = setTimeout(() => {
        setBouncing(false); // Bouncing 모션 끝나고 바로 리셋
      }, 500);
    }
  }, [isBouncing]);

  return (
    <div
      className={`${styles.carousel} ${isBouncing && styles['end-of-carousel']}`}
      onMouseDown={handleStart}
      onMouseUp={handleEnd}
      onTouchStart={handleStart}
      onTouchEnd={handleEnd}
    >
      <div className={styles['carousel__cardset-wrapper']}>
        <div className={styles['carousel__cardset']} style={offsetX}>
          {recipients.map((it) => (
            <RecipientCard Recipient={it} key={it.id}></RecipientCard>
          ))}
        </div>
      </div>
      {index > 0 && ( //시작점 이후부터
        <button
          onClick={() => settingIndex('back')}
          className={`${styles['carousel__direction-button']} ${styles.back}`}
        ></button>
      )}
      {recipients.length > 4 && // 캐러셀 끝에 도달하기 전까지
        index < 4 && (
          <button
            onClick={() => settingIndex('next')}
            className={`${styles['carousel__direction-button']}`}
          ></button>
        )}
    </div>
  );
}
