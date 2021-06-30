import { FC } from "react";
import styles from "./Error.module.css";
import errorImg from "../../assets/error.svg";

interface ErrorProps {
  error: string;
}

const refresh = () => {
  document.location.reload();
};

const Error: FC<ErrorProps> = ({ error }) => (
  <div className={styles.container}>
    <h3> Sorry, We have an error. Please try again later.</h3>
    <p> {error} </p>
    <button onClick={refresh}> Refresh </button>
    <img src={errorImg} className={styles.img} alt='Error' />
  </div>
);

export default Error;
