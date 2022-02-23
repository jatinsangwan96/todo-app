import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Button, { SelectButton } from "./Button";
import TodoModal from "./TodoModal";
import styles from "../styles/modules/app.module.scss";
import { updateFilterStatus } from "../slices/todoSlice";

const AppHeader = () => {
  const dispatch = useDispatch();
  const filterStatus = useSelector((state) => state.todo.filterStatus);
  const [modalOpen, setModalOpen] = useState(false);

  const newTaskHandler = () => setModalOpen(true);

  const filterHandler = (event) => {
    // console.log("selecting...");
    dispatch(updateFilterStatus(event.target.value));
  };

  return (
    <div className={styles.appHeader}>
      <Button type="button" variant="primary" onClick={newTaskHandler}>
        New Task
      </Button>
      <SelectButton id="status" value={filterStatus} onChange={filterHandler}>
        <option value="all">All</option>
        <option value="incomplete">Incomplete</option>
        <option value="complete">Complete</option>
      </SelectButton>
      <TodoModal type="add" modalOpen={modalOpen} setModalOpen={setModalOpen} />
    </div>
  );
};

export default AppHeader;
