// prettier-ignore
import React, {  useCallback, useRef, useState, useEffect, FC} from "react";
import styles from "./SearchAutocomplete.module.scss";
import { containsNotAllowedChars, scrollTo } from "utils";
import { Button, Input, AutocompleteList } from "components";
import { User } from "types/UserApi";

interface SearchProps {
  data: User[];
}

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
    } else {
      document.addEventListener("keydown", handleKeydown);
    }

    return () => document.removeEventListener("keydown", handleKeydown);
  }, [isPopupOpen, handleKeydown, curIdx, currentUsersList, key]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (containsNotAllowedChars(text)) {
      return;
    } else if (text !== "/") {
      setSearchingText(text);
    }

    setCurIdx(null);
    setisPopupOpen(true);
  };

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
        togglePopup={(isOpen: boolean) => setisPopupOpen(isOpen)}
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
