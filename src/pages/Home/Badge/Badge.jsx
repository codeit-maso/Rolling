import styles from './Badge.module.scss';

const relationship = {
  acquaintance: '지인',
  colleague: '동료',
  family: '가족',
  friend: '친구',
};

export default function Badge({ relation }) {
  return (
    <div className={`${styles.Badge} ${styles[relation]}`}>
      {relationship[relation]}
    </div>
  );
}
