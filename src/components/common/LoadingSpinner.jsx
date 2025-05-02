import styles from './LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.spinnerWrapper}>
      <div className={styles.spinner}></div>
      <span className={styles.text}>로딩중...</span>
    </div>
  );
}
