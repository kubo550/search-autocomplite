import styles from "./Loading.module.css";

const Loading = () => (
  <div className={styles.container}>
    <div className={styles.loader}>
      <span></span>
    </div>
    <p className={styles.loading_text}>Loading...</p>
  </div>
);

export default Loading;
