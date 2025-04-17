import styles from './FormInput.module.scss';

export default function FormInput({
  id,
  label,
  placeholder,
  value,
  onChange,
  onBlur,
  isError,
}) {
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
