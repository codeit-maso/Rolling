import styles from './Button.module.scss';

export default function Button({ text, type = 'primary', onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[`button--${type}`]}`}
    >
      {text}
    </button>
  );
}
