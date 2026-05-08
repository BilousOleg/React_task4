import { useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import { TodoContext } from '../../contexts';
import styles from './Todo.module.sass';

function Todo() {
  const [tasks, setTasks] = useState([]);
  const [nextId, setNextId] = useState(1); // Id для кожного з завдань, щоб можна було нормально виводити на сторінку через map з вказуванням key={id}

  const addTask = (taskText) => {
    const newTask = {
      id: nextId,
      isChecked: false,
      taskText,
    };

    setTasks((tasks) => [...tasks, newTask]);
    setNextId((id) => id + 1);
  };

  const deleteTask = (taskId) => {
    setTasks((tasks) => tasks.filter((task) => task.id !== taskId));
  };

  const checkTask = (taskId) => {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              isChecked: !task.isChecked,
            }
          : task
      )
    );
  };

  return (
    <article className={styles.todo}>
      <TodoContext.Provider value={{ tasks, addTask, deleteTask, checkTask }}>
        <section>
          <TodoForm />
        </section>
        <section className={styles.listSection}>
          <TodoList />
        </section>
      </TodoContext.Provider>
    </article>
  );
}

export default Todo;
