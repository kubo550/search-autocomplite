import { FC, useCallback, useEffect, useRef, useState } from "react";
import styles from "./Input.module.scss";

interface InputProps {
  searchingText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePopup: (isOpen: boolean) => void;
  onBlur: () => void;
  resetInput: () => void;
}

const Input: FC<InputProps> = ({
  searchingText,
  onChange,
  togglePopup,
  onBlur,
  resetInput,
}) => {
  const [hasFocus, sethasFocus] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "/") {
        input.current?.focus();
        input.current?.click();
        resetInput();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [resetInput]);

  const handleFocus = useCallback(() => {
    togglePopup(true);
    sethasFocus(true);
  }, [togglePopup]);

  const handleBlur = useCallback(() => {
    onBlur();
    togglePopup(false);
    sethasFocus(false);
  }, [onBlur, togglePopup]);

  return (
    <input
      type='search'
      placeholder={hasFocus ? "Search For Users" : 'Press "/" to focus'}
      aria-label='Search'
      className={styles.search_input}
      ref={input}
      value={searchingText}
      onChange={onChange}
      onFocus={handleFocus}
      onClick={handleFocus}
      onBlur={handleBlur}
    />
  );
};

export default Input;
