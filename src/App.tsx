import { fetchUsers } from "./api";
import { useQuery } from "./hooks/useQuery";
import { Error, Loading, SearchAutocomplete } from "./components";

const getUsersNames = (data: any[]) =>
  data.map(({ id, name, username }) => ({ id, name, username }));

const App = () => {
  const { data, error, isLoading } = useQuery(fetchUsers);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <Error error={error} />;
  }

  const userNames = getUsersNames(data);

  return (
    <div className='app'>
      <div className='search-container'>
        <SearchAutocomplete data={userNames} />
        <button className='submit-btn'>
          <i className='fas fa-search'></i>
        </button>
      </div>
    </div>
  );
};

export default App;
