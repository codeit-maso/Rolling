import styles from './FormInput.module.scss';
import { useId } from 'react';

export default function FormInput({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  isError,
}) {
  const id = useId();
  return (
    <div className={styles.formGroup}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        className={`${styles.input} ${isError ? styles.error : ''}`}
      />
      {isError && <p className={styles.errorMessage}>값을 입력해 주세요.</p>}
    </div>
  );
}
