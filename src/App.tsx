import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./redux";
import { Error, Loading, SearchAutocomplete } from "./components";

const getUsersNames = (data: any[]) =>
  data.map(({ id, name, username }) => ({ id, name, username }));

const App = () => {
  const dispatch = useDispatch();
  const { fetchUsers } = bindActionCreators(actionCreators, dispatch);
  const { error, users, loading } = useSelector((state: State) => state.user);

  useEffect(() => {
    fetchUsers();
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
        <button className='submit-btn' title='Search' aria-label='Search'>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  );
};

export default App;
