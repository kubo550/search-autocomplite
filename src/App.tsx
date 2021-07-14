import { useEffect } from "react";
import { Dispatch } from "redux";
import { useDispatch, useSelector } from "react-redux";
// prettier-ignore
import { Error, Loading, SearchAutocomplete, SubmitBtn, UsersList} from "components";
import { Action, State } from "state";
import { UserName, User } from "types/UserApi";
import { fetchUsers } from "api";

const getUsersNames = (data: User[]): UserName[] =>
  data.map(({ id, name, username }) => ({ id, name, username }));

const App = () => {
  const dispatch = useDispatch<Dispatch<Action>>();
  const { error, users, loading } = useSelector((state: State) => state.user);

  useEffect(() => {
    fetchUsers(dispatch);
  }, [dispatch]);

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const userNames = getUsersNames(users);

  return (
    <div className='app'>
      <div className='search-container'>
        <SearchAutocomplete data={userNames} />
        <SubmitBtn />
      </div>

      <UsersList users={users} />
    </div>
  );
};

export default App;
