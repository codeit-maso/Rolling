import styles from './CarouselSkeleton.module.scss';

export default function CarouselSkeleton() {
  return (
    <>
      <div className={styles['section--sk']}>
        <div className={styles['card--sk']}></div>
        <div className={styles['card--sk']}></div>
        <div className={styles['card--sk']}></div>
        <div className={styles['card--sk']}></div>
      </div>
    </>
  );
}
