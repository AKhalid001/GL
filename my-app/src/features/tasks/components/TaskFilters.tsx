import styles from "../css/TaskFilters.module.css";

type FilterType = "ALL" | "TODO" | "IN_PROGRESS" | "DONE";

interface Props {
  currentFilter: FilterType;
  onChange: (filter: FilterType) => void;
}

const filters: { value: FilterType; label: string }[] = [
  { value: "ALL", label: "All" },
  { value: "TODO", label: "To Do" },
  { value: "IN_PROGRESS", label: "In Progress" },
  { value: "DONE", label: "Done" },
];

function TaskFilters({ currentFilter, onChange }: Props) {
  return (
    <div className={styles.filterGroup}>
      {filters.map((f) => (
        <button
          key={f.value}
          className={`${styles.filterBtn} ${currentFilter === f.value ? styles.active : ""}`}
          onClick={() => onChange(f.value)}
        >
          {f.label}
        </button>
      ))}
    </div>
  );
}

export default TaskFilters;
