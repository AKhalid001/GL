import styles from "./Pagination.module.css";

interface Props {
  size: number;
  onSizeChange: (size: number) => void;
}

function PageSizeSelector({ size, onSizeChange }: Props) {
  return (
    <div className={styles.sizeSelector}>
      <span className={styles.sizeLabel}>Show</span>
      <select
        className={styles.sizeSelect}
        value={size}
        onChange={(e) => onSizeChange(Number(e.target.value))}
      >
        <option value={5}>5</option>
        <option value={10}>10</option>
        <option value={20}>20</option>
        <option value={50}>50</option>
      </select>
      <span className={styles.sizeLabel}>entries</span>
    </div>
  );
}

export default PageSizeSelector;
