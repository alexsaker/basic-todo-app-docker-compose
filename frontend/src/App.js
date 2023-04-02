import { useEffect, useState } from 'react';
import Header from './components/Header';
import TodoItems from './components/TodoItems';
import CreateTodo from './components/CreateTodo';

const SERVER_URL = 'http://todo-backend:3001';

const App = () => {
  useEffect(() => {
    fetch(`${SERVER_URL}/todos`)
      .then((res) => {
        return res.json();
      })
      .then(setTodoItems);
  }, []);

  const [todoItems, setTodoItems] = useState([]);

  const addTodoHandler = (todo) => {
    const todoItem = { description: todo };

    fetch(`${SERVER_URL}/add`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoItem),
    })
      .then((res) => res.json())
      .then((res) => {
        setTodoItems(todoItems.concat(todoItem));
      });
  };

  return (
    <div className='App'>
      <Header />
      <CreateTodo addTodo={addTodoHandler} />
      <TodoItems todoItems={todoItems} />
    </div>
  );
};

export default App;
