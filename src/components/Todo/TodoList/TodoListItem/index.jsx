import { useContext } from 'react';
import { TodoContext } from '../../../../contexts';
import classNames from 'classnames';
import ActionButton from '../../../ActionButton';
import { FaCheck, FaTrashAlt, FaTimes } from 'react-icons/fa';
import styles from './TodoListItem.module.sass';

function TodoListItem({ task }) {
  const { deleteTask, checkTask } = useContext(TodoContext);

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleCheck = () => {
    checkTask(task.id);
  };

  const taskCardStyles = classNames(styles.taskCard, {
    [styles.isChecked]: task.isChecked,
  });

  const checkBtnStyles = classNames({
    [styles.checkBtn]: !task.isChecked,
    [styles.crossBtn]: task.isChecked,
  });

  return (
    <li>
      <article className={taskCardStyles}>
        <p>{task.taskText}</p>
        <div>
          <ActionButton
            onClickAction={handleCheck}
            icon={task.isChecked ? <FaTimes /> : <FaCheck />}
            className={checkBtnStyles}
          />
          <ActionButton
            onClickAction={handleDelete}
            icon={<FaTrashAlt />}
            className={styles.deleteBtn}
          />
        </div>
      </article>
    </li>
  );
}

export default TodoListItem;
