import { FC, forwardRef, LegacyRef } from "react";
import styles from "./AutocompleteList.module.scss";
import { getHighlightedHTML } from "utils";
import { UserName } from "types/UserApi";

interface AutocompleteListProps {
  searchingText: string;
  mouseLeave: () => void;
  list: UserName[];
  curIdx: number | null;
  mouseEnter: (idx: number) => void;
  dataKey: "username" | "name";
  ref: any;
}

const AutocompleteList: FC<AutocompleteListProps> = forwardRef(
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

export default AutocompleteList;
