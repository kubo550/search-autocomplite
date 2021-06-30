import { memo } from "react";
import styles from "./SubmitSearchBtn.module.scss";

const SubmitSearchBtn = memo(() => (
  <button className={styles.submit_btn} title='Search' aria-label='Search'>
    <i className='fas fa-search'></i>
  </button>
));

export default SubmitSearchBtn;
