import styles from './Button.module.scss';

export default function Button({
  children,
  type = 'primary',
  onClick,
  disabled,
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${styles.button} ${styles[`button--${type}`]}`}
    >
      {children}
    </button>
  );
}
