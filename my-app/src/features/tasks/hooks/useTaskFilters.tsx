import { useState } from "react";
import { useTaskContext } from "../../../contexts/TaskContext";

function useTaskFilters() {
  const { tasks } = useTaskContext();
  const [search, setSearch] = useState("");

  const [filter, setFilter] = useState("ALL");

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesFilter = filter === "ALL" ? true : task.status === filter;

    return matchesSearch && matchesFilter;
  });
  return {search,filter,setSearch,setFilter,filteredTasks}
}

export default useTaskFilters;
