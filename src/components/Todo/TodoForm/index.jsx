import { useContext, useState } from 'react';
import * as yup from 'yup';
import classNames from 'classnames';
import { TodoContext } from '../../../contexts';
import CONSTANTS from '../../../constants';
import styles from './TodoForm.module.sass';

const [MAX_LENGTH, MIN_LENGTH, INITIAL_VALUE] = CONSTANTS;

// yup-схема для подальшої валідації
const TASK_SCHEMA = yup.object({
  task: yup
    .string()
    .trim()
    .required('Task is required')
    .min(MIN_LENGTH, `Minimum ${MIN_LENGTH} characters required`)
    // Резервна перевірка на максимальну кількість слів, рівну 150 (оскільки ліміт встановлений через maxLength атрибут)
    .max(MAX_LENGTH, `Maximum ${MAX_LENGTH} characters`),
});

function TodoForm() {
  const { addTask } = useContext(TodoContext); // Хук контексту для отримання функції додавання завдання
  const [task, setTask] = useState(INITIAL_VALUE);
  const [error, setError] = useState(null);

  const handleTaskChange = ({ target: { value } }) => {
    setTask(value);

    // Асинхронна валідація схеми (якби полів було більше, доречно було б використати validateAt)
    // не знаю, наскільки це безпечно та ефективно (асинхронно), але зробив так
    TASK_SCHEMA.validate({
      task: value,
    })
      .then(() => {
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    TASK_SCHEMA.validate({
      task,
    })
      .then(() => {
        addTask(task);
        setTask(INITIAL_VALUE);
        setError(null);
      })
      .catch((e) => {
        setError(e.message);
      });
  };

  const inputClassNames = classNames(styles.formInput, {
    [styles.invalidInput]: error,
  });

  return (
    <form action="" onSubmit={handleSubmit} className={styles.todoForm}>
      <input
        type="text"
        value={task}
        name="taskInput"
        className={inputClassNames}
        maxLength={MAX_LENGTH}
        onChange={handleTaskChange}
        placeholder="Type here"
        autoFocus
      />
      <button type="submit" className={styles.submitBtn}>
        Add
      </button>
      <div className={styles.invalidMsg}>{error}</div>
    </form>
  );
}

export default TodoForm;
