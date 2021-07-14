import { usePagination } from "hooks";
import type { FC } from "react";
import type { User } from "types/UserApi";
import styles from "./UsersList.module.scss";
import cn from "classnames";

interface UsersListProps {
  users: User[];
}

const tHeaders = ["#", "Name", "Email", "Adress", "Company"] as const;

const maxUsersPerPage = 3;

const UsersList: FC<UsersListProps> = ({ users }) => {
  const { currentPage, changePage, numOfPages, curIdx } = usePagination(
    users,
    maxUsersPerPage
  );

  return (
    <div className={styles.container}>
      <table className={styles.table} cellPadding='0' cellSpacing='0'>
        <thead className={styles.thead}>
          <tr>
            {tHeaders.map(td => (
              <td key={td} className={styles.th}>
                {td}
              </td>
            ))}
          </tr>
        </thead>

        <tbody>
          {currentPage.map((user, idx) => (
            <tr key={user.id} className={styles.tr}>
              <td style={{ textAlign: "center" }}> {idx + 1}. </td>
              <td> {user.name} </td>
              <td> {user.email} </td>
              <td> {user.address.city} </td>
              <td> {user.company.name} </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className={styles.pagination}>
        <button className={styles.button} onClick={() => changePage("first")}>
          &lt;&lt;
        </button>
        <button className={styles.button} onClick={() => changePage("prev")}>
          &lt;
        </button>

        {Array(numOfPages)
          .fill(null)
          .map((_, idx) => (
            <button
              onClick={() => changePage(idx)}
              className={cn(styles.button, idx === curIdx && styles.active)}
              key={idx}
            >
              {idx + 1}
            </button>
          ))}
        <button className={styles.button} onClick={() => changePage("next")}>
          &gt;
        </button>
        <button className={styles.button} onClick={() => changePage("last")}>
          &gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default UsersList;
