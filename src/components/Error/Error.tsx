import { FC } from "react";
import styles from "./Error.module.scss";
import errorImg from "assets/error.svg";

interface ErrorProps {
  error: string;
}

const refresh = () => {
  document.location.reload();
};

const Error: FC<ErrorProps> = ({ error }) => (
  <div className={styles.container}>
    <img src={errorImg} className={styles.img} alt='Error' />
    <h3> Sorry, We have an error. Please try again later.</h3>
    <p> {error} </p>
    <button onClick={refresh}> Refresh </button>
  </div>
);

export default Error;
