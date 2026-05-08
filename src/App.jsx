import Todo from './components/Todo';
import styles from './App.module.sass';

function App() {
  return (
    <main className={styles.todoApp}>
      <Todo />
    </main>
  );
}

export default App;

