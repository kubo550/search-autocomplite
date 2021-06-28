// prettier-ignore
import React, { forwardRef, useCallback, useRef, memo, useState, useEffect, LegacyRef, FC} from "react";
import styles from "./SearchAutocomplete.module.css";
// import SearchIcon from "../../assets/search.svg";

interface SearchProps {
  data: {
    id: any;
    name: any;
    username: any;
  }[];
}

const scrollTo = (list: React.RefObject<HTMLDivElement>, idx: number) => {
  if (!list.current) {
    return;
  }
  const currEl = list.current.childNodes[idx];
  // @ts-ignore
  list.current.scrollTo(0, currEl.offsetTop);
};

const SearchAutocomplete: FC<SearchProps> = ({ data }) => {
  const [searchingText, setSearchingText] = useState("");
  const [isPopupOpen, setisPopupOpen] = useState(false);
  const [searchByName, setSearchByName] = useState(true);
  const [curIdx, setCurIdx] = useState<null | number>(null);
  const userList = useRef<HTMLDivElement>(null);

  const key = searchByName ? "name" : "username";

  const regex = new RegExp(searchingText, "gi");

  const currentUsersList = data.filter(el => regex.test(el[key]));

  const toogleSearchingKey = useCallback(() => {
    setSearchByName(prev => !prev);
    setSearchingText("");
  }, []);

  const handleKeydown = useCallback(
    (e: KeyboardEvent) => {
      const len = currentUsersList.length;
      if (!len) {
        return;
      }

      switch (e.key) {
        case "ArrowUp":
          if (!curIdx) {
            setCurIdx(len - 1);
            scrollTo(userList, len - 1);
          } else {
            scrollTo(userList, curIdx - 1);
            setCurIdx(prev => prev! - 1);
          }
          break;
        case "ArrowDown":
          if (curIdx === null || curIdx === len - 1) {
            setCurIdx(0);
            scrollTo(userList, 0);
          } else {
            scrollTo(userList, curIdx + 1);
            setCurIdx(prev => (prev !== null ? prev + 1 : 0));
          }
          break;
        case "Enter":
          curIdx !== null && setSearchingText(currentUsersList[curIdx][key]);
          setisPopupOpen(false);
          // @ts-ignore
          document.activeElement.blur();
          break;
        default:
          return;
      }
    },

    [curIdx, currentUsersList, key]
  );

  useEffect(() => {
    if (!isPopupOpen) {
      setCurIdx(null);
    } else if (isPopupOpen) {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isPopupOpen, handleKeydown, curIdx, currentUsersList, key]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // TODO  validation

    if (e.target.value !== "/") {
      setSearchingText(e.target.value);
    }
    setisPopupOpen(true);
  };

  const togglePopup = (isOpen: boolean) => setisPopupOpen(isOpen);

  const handleInputBlur = () =>
    curIdx !== null && setSearchingText(currentUsersList[curIdx][key]);

  return (
    <div className={styles.search_container}>
      {/* todo */}
      <Button onClick={toogleSearchingKey}></Button>

      <Input
        searchingText={searchingText}
        onChange={handleInputChange}
        togglePopup={togglePopup}
        onBlur={handleInputBlur}
        resetInput={() => setSearchingText("")}
      />

      {isPopupOpen && (
        <AutocompleteList
          list={currentUsersList}
          ref={userList}
          curIdx={curIdx}
          dataKey={key}
          mouseEnter={(idx: number) => setCurIdx(idx)}
        />
      )}
    </div>
  );
};

export default SearchAutocomplete;

interface ButtonProps {
  onClick: () => void;
}

export const Button: FC<ButtonProps> = memo(({ onClick }) => (
  <button className={styles.button} onClick={onClick}>
    change
  </button>
));

interface InputProps {
  searchingText: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  togglePopup: (isOpen: boolean) => void;
  onBlur: () => void;
  resetInput: () => void;
}

export const Input: FC<InputProps> = ({
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
  }, [onBlur, togglePopup]);

  return (
    <input
      type='search'
      placeholder={hasFocus ? "Search For Users" : "Press '/' To Focus"}
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

interface AutocompleteListProps {
  list: { id: any; name: any; username: any }[];
  curIdx: number | null;
  mouseEnter: (idx: number) => void;
  dataKey: "username" | "name";
  ref: any;
}

export const AutocompleteList: FC<AutocompleteListProps> = forwardRef(
  (
    { list, curIdx, mouseEnter, dataKey },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => (
    <div ref={ref} className={styles.search_list}>
      {list.map((data, idx) => (
        <div
          key={data.id}
          style={{ backgroundColor: idx === curIdx ? "pink" : "red" }}
          className={styles.list_element}
          onMouseEnter={() => mouseEnter(idx)}
        >
          {data[dataKey]}
        </div>
      ))}
      {list.length === 0 && <div> Brak wyników </div>}
    </div>
  )
);
