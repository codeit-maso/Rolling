import { useState, useEffect } from 'react';
import { debounce } from 'lodash';
import styles from './Carousel.module.scss';
import RecipientCard from '../RecipientCard/RecipientCard';

export default function Carousel({ recipients }) {
  const [index, setIndex] = useState(0);
  const [offsetX, setOffsetX] = useState({}); // x좌표

  // 작동과정: button onclick --> settingIndex() --> setIndex --> useEffect( setOffsetX(),[index] ): x좌표 상태 업데이트: 캐러셀 이동
  useEffect(() => {
    setOffsetX({
      transform: `translateX(-${index * 295}px)`,
    });
  }, [index]);

  function settingIndex(direction) {
    if (direction === 'next') {
      setIndex((prev) => prev + 1);
    } else if (direction === 'back') {
      setIndex((prev) => prev - 1);
    }
  }

  //resize에 따른, 캐러셀 시작점 리셋
  // const [width, setWidth] = useState(0);
  // const [prewidth, setPreWidth] = useState(window.innerWidth);
  // const handleResize = debounce(() => {
  //   setWidth(window.innerWidth);
  // }, 200);
  // useEffect(() => {
  //   setWidth(window.innerWidth); //처음 로딩 상태 받아야, 첫 resize시 prewidth에 값을 넘길수 있음
  //   window.addEventListener('resize', handleResize);
  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);
  // useEffect(() => {
  //   setPreWidth((prev) => width);
  //   // console.log('prewidth:', prewidth);
  //   // console.log('updated width:', width);
  //   // if (width > 1023 && prewidth <= 1023 && offsetX % 295 !== 0) {
  //   if (width > 1023 && 0 < prewidth <= 1023) {
  //     console.log('prewidth:', prewidth);
  //     console.log('updated width:', width);
  //     setOffsetX({
  //       transform: `translateX(0px)`,
  //     });
  //   }
  // }, [width]);

  return (
    <div className={styles.carousel}>
      {/* <div style={{ fontSize: '50px' }}>{prewidth}</div>
      <div style={{ fontSize: '50px' }}>{width}</div> */}
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
        index !== 4 && (
          <button
            onClick={() => settingIndex('next')}
            className={`${styles['carousel__direction-button']}`}
          ></button>
        )}
    </div>
  );
}
