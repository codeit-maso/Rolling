import styles from './Badge.module.scss';

const relationship = {
  지인: 'acquaintance',
  동료: 'colleague',
  가족: 'family',
  친구: 'friend',
};

export default function Badge({ relation }) {
  return (
    <div className={`${styles.badge} ${styles[relationship[relation]]}`}>
      {relation}
    </div>
  );
}
