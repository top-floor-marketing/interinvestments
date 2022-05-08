import styles from "./grid_developments_styles.module.scss";

const EmptyGrid = () => {
  return (
    <div className={styles.container}>
      <label className={styles.label}>NO DATA</label>
    </div>
  );
};

export default EmptyGrid;
