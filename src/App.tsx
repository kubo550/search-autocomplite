import { useEffect } from "react";
import { bindActionCreators } from "redux";
import { useDispatch, useSelector } from "react-redux";
import { actionCreators, State } from "state";
import { Error, Loading, SearchAutocomplete, SubmitBtn } from "components";
import { User, UserApi } from "types/UserApi";

const getUsersNames = (data: UserApi[]): User[] =>
  data.map(({ id, name, username }) => ({ id, name, username }));

const App = () => {
  const dispatch = useDispatch();
  const { fetchUsers } = bindActionCreators(actionCreators, dispatch);
  const { error, users, loading } = useSelector((state: State) => state.user);

  useEffect(() => {
    fetchUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
    </div>
  );
};

export default App;
