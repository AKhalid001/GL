import styles from "./Input.module.css";

interface InputProps {
  value: string;

  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;

  placeholder?: string;
}

const Input = ({ value, onChange, placeholder }: InputProps) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default Input;
