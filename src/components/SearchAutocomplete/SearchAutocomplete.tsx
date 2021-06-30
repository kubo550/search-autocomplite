// prettier-ignore
import React, { forwardRef, useCallback, useRef, memo, useState, useEffect, LegacyRef, FC} from "react";
import styles from "./SearchAutocomplete.module.css";

interface SearchProps {
  data: {
    id: any;
    name: any;
    username: any;
  }[];
}

const containsNotAllowedChars = (text: string) => {
  const letters = [...text];
  const invalidChars = ["\\", "[", "]", "*"];
  return letters.some(letter => invalidChars.includes(letter));
};

const scrollTo = (list: React.RefObject<HTMLDivElement>, idx: number) => {
  if (!list.current) {
    return;
  }
  const currEl = list.current.childNodes[idx] as HTMLElement;
  list.current.scrollTo(0, currEl.offsetTop);
};

const getHighlightedHTML = (wholeText: string, searchingText: string) => {
  const toInnerHTML = (text: string) => ({ __html: text });

  if (!searchingText) {
    return toInnerHTML(wholeText);
  }

  const regex = new RegExp(searchingText, "i");
  const hightlighted = wholeText.replace(regex, e => `<b>${e}</b>`);

  return toInnerHTML(hightlighted);
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
          if (curIdx === null || curIdx >= len) {
            return;
          }
          setSearchingText(currentUsersList[curIdx][key]);
          setisPopupOpen(false);

          (document.activeElement as HTMLElement).blur();
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
    const text = e.target.value;

    if (containsNotAllowedChars(text)) {
      return;
    }

    if (text !== "/") {
      setSearchingText(text);
    }

    setCurIdx(null);
    setisPopupOpen(true);
  };

  const togglePopup = (isOpen: boolean) => setisPopupOpen(isOpen);

  const handleInputBlur = () =>
    curIdx !== null && setSearchingText(currentUsersList[curIdx][key]);

  const handleMouseLeave = () => {
    setCurIdx(null);
    scrollTo(userList, 0);
  };

  return (
    <div className={styles.search_container}>
      <Button onClick={toogleSearchingKey}>By {key}</Button>

      <Input
        searchingText={searchingText}
        onChange={handleInputChange}
        togglePopup={togglePopup}
        onBlur={handleInputBlur}
        resetInput={() => setSearchingText("")}
      />

      {isPopupOpen && (
        <AutocompleteList
          searchingText={searchingText}
          mouseLeave={handleMouseLeave}
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

export const Button: FC<ButtonProps> = memo(({ children, onClick }) => (
  <button
    className={styles.button}
    onClick={onClick}
    title='Toggle searching value'
    aria-label='Toggle searching value'
  >
    {children}
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

interface AutocompleteListProps {
  searchingText: string;
  mouseLeave: () => void;
  list: { id: string | number; name: string; username: string }[];
  curIdx: number | null;
  mouseEnter: (idx: number) => void;
  dataKey: "username" | "name";
  ref: any;
}

export const AutocompleteList: FC<AutocompleteListProps> = forwardRef(
  (
    { list, curIdx, mouseEnter, dataKey, searchingText, mouseLeave },
    ref: LegacyRef<HTMLDivElement> | undefined
  ) => (
    <div
      ref={ref}
      className={styles.search_list}
      style={{ overflowY: list.length > 3 ? "scroll" : "auto" }}
      onMouseLeave={mouseLeave}
    >
      {list.map((data, idx) => {
        const isCurrent = idx === curIdx;
        const backgroundColor = isCurrent ? "#cc98c7" : "#BC7DB6";
        const color = isCurrent ? "#000" : "#424242";

        return (
          <div
            key={data.id}
            style={{ backgroundColor, color }}
            className={styles.list_element}
            onMouseEnter={() => mouseEnter(idx)}
          >
            <div
              dangerouslySetInnerHTML={getHighlightedHTML(
                data[dataKey],
                searchingText
              )}
            />
          </div>
        );
      })}
      {list.length === 0 && (
        <div className={styles.no_result}> No Results </div>
      )}
    </div>
  )
);
