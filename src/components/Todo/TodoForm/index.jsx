import { useContext, useState } from 'react';
import { TodoContext } from '../../../contexts';
import styles from './TodoForm.module.sass';

const INITIAL_VALUE = '';

function TodoForm() {
  const { addTask } = useContext(TodoContext); // Хук контексту для отримання функції додавання завдання
  const [task, setTask] = useState(INITIAL_VALUE);
  // isTaskValid

  const handleTaskChange = ({ target: { value } }) => {
    setTask(value);
    // isTaskValid
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask(task);
    setTask(INITIAL_VALUE);
  };

  return (
    <form action="" onSubmit={handleSubmit} className={styles.todoForm}>
      <input
        type="text"
        value={task}
        name="taskInput"
        className={styles.formInput}
        onChange={handleTaskChange}
        placeholder="Type here"
        autoFocus
      />
      <button type="submit" className={styles.submitBtn}>
        Add
      </button>
    </form>
  );
}

export default TodoForm;
