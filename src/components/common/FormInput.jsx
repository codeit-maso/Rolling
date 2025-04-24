import styles from './FormInput.module.scss';
import { useId } from 'react';

export default function FormInput({
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  isError,
  maxLength,
}) {
  const id = useId();
  return (
    <div className={styles['form-input']}>
      <label htmlFor={id} className={styles['form-input__label']}>
        {label}
      </label>
      <input
        id={id}
        name={id}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        maxLength={maxLength}
        className={`${styles['form-input__input']} ${isError ? styles['form-input__input--error'] : ''}`}
      />
      {isError && (
        <p className={styles['form-input__error-message']}>
          값을 입력해 주세요.
        </p>
      )}
    </div>
  );
}
