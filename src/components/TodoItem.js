import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteTodo, updateTodo } from "../slices/todoSlice";
import { getClasses } from "../utilities/getClasses";
import CheckButton from "./CheckButton";
import { MdDelete, MdEdit } from "react-icons/md";
import TodoModal from "./TodoModal";
import styles from "../styles/modules/todoItem.module.scss";
import toast from "react-hot-toast";
// import { format } from "date-fns";

const child = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 },
};

const TodoItem = ({ todo }) => {
  const dispatch = useDispatch();

  const [updateModal, setUpdateModal] = useState(false);

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (todo.status === "complete") {
      setChecked(true);
    } else {
      setChecked(false);
    }
  }, [todo.status]);

  const deleteHandler = () => {
    // console.log("Deleting...");
    dispatch(deleteTodo(todo.id));
    toast.success("Task Deleted Successfully");
  };

  const updateHandler = () => {
    // console.log("Updating...");
    setUpdateModal(true);
  };

  const checkHandler = () => {
    // console.log("Update todo...");
    setChecked(!checked);
    dispatch(
      updateTodo({
        ...todo,
        status: checked ? "incomplete" : "complete",
      })
    );
  };

  return (
    <>
      <motion.div className={styles.item} variants={child}>
        <div className={styles.todoDetails}>
          <CheckButton checked={checked} checkHandler={checkHandler} />
          <div className={styles.texts}>
            <p
              className={getClasses([
                styles.todoText,
                todo.status === "complete" && styles["todoText--completed"],
              ])}
            >
              {todo.title}
            </p>
            <p className={styles.time}>{todo.time}</p>
          </div>
        </div>
        <div className={styles.todoActions}>
          <div
            className={styles.icon}
            onClick={deleteHandler}
            role="button"
            onKeyDown={deleteHandler}
            tabIndex={0}
          >
            <MdDelete />
          </div>
          <div
            className={styles.icon}
            onClick={updateHandler}
            onKeyDown={updateHandler}
            role="button"
            tabIndex={0}
          >
            <MdEdit />
          </div>
        </div>
      </motion.div>
      <TodoModal
        todo={todo}
        type="update"
        modalOpen={updateModal}
        setModalOpen={setUpdateModal}
      />
    </>
  );
};

export default TodoItem;
