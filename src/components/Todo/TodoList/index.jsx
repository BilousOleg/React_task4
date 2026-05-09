import { useContext } from 'react';
import { TodoContext } from '../../../contexts';
import TodoListItem from './TodoListItem';

function TodoList() {
  const { tasks } = useContext(TodoContext);

  return (
    <ul>
      {tasks.map((task) => (
        <TodoListItem key={task.id} task={task} />
      ))}
    </ul>
  );
}

export default TodoList;
