import styles from './UploadProgressBar.module.scss';

export default function UploadProgressBar({ progress = 0 }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.bar}>
        <div className={styles.fill} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
}
