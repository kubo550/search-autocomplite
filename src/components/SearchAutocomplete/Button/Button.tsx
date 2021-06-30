import { FC, memo } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
}

const Button: FC<ButtonProps> = memo(({ children, onClick }) => (
  <button
    className={styles.button}
    onClick={onClick}
    title='Toggle searching value'
    aria-label='Toggle searching value'
  >
    {children}
  </button>
));

export default Button;
