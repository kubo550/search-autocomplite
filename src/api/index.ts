import axios from "axios";

export const fetchUsers = async () => {
  const endpoint = "https://jsonplaceholder.typicode.com/users";
  try {
    const { data } = await axios.get(endpoint);
    return data;
  } catch (err) {
    throw Error(err);
  }
};
