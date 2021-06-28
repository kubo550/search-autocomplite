import { FC, memo } from "react";

interface ErrorProps {
  error: any;
}

const refresh = () => {
  document.location.reload();
};

const Error: FC<ErrorProps> = memo(({ error }) => (
  <div>
    <h3> Sorry We have an error. Please try again later.</h3>
    <p> {error.message} </p>
    <button onClick={refresh}> Refresh </button>
  </div>
));

export default Error;
