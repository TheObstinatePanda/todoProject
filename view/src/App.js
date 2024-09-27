/* eslint-disable */
import React, { useState, useEffect } from 'react';
import './App.css';
import { getTodos, createTodo, removeTodo } from './utils';

const App = () => {
  const [todoList, setTodoList] = useState([]);
  const [todo, setTodo] = useState({ description: '' });
  const [error, setError] = useState();  

// Create a fetchTodos() function to update the View from Model using getTodos() function from Controller
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const todos = await getTodos();
        console.log('Fetched todos:', todos); // Log the fetched todos
        if (!Array.isArray(todos)) {
          throw new Error('Fetched data is not an array');
        } 

        if (todos.length <= 0) {
          throw new Error('Fetched Array does not hold data')
        } else {
          setTodoList(todos);
        }  
      } catch (err) {
        console.error('Error fetching todos:', err);
        setError('Failed to fetch todos');
      }
    };
    fetchTodos();
  }, []);

// Create a handleSubmit() function to add new to-do list
const handleSubmit = async (e) => {
  e.preventDefault();
  setError(null);
  const data = {
    description: todo.description,
    };
  //const data = todo.description.trim();
  if (!data) {
    setError('Description is required');
    return;
  }

  try {
    const newTodo = await createTodo(data);
    if (newTodo.error) {
      setError(newTodo.error)
      throw new Error(newTodo.error);
    } else {
      setTodoList([ ...todoList, newTodo.data ]);
      setError('');
      setTodo({ description: '' }); // clears the input
    }
  } catch (err) {
    setError(err.message);
  }
};

// handleDelete() function to remove to-do list with matching id
const handleDelete = async (id) => {
  try {
    await removeTodo(id);
    setTodoList(todoList.filter(todo => todo.todo_id !== id));
    // fetchTodos();
  } catch (err) {
    setError(err);
  }
};

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          type="text"
          value={todo.description}
          onChange={(e) =>
            setTodo({ ...todo, description: e.target.value })
          }
        />
        <button type="submit">Add Todo</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ol>
        {/* {console.log(todoList)} */}
        {todoList.forEach((todoItem) => {
          console.log('Mapping todoItem:', todoItem); // Log each todoItem
          if (!todoItem || !todoItem.description) {
            console.error('Invalid todoItem:', todoItem);
            return null; // Skip rendering if todoItem is invalid
          }
          return (
            <li
              key={todoItem.todo_id}
              onClick={() => {
                handleDelete(todoItem.todo_id);
              }}
            >
              {todoItem.description}
            </li>
          );
        })}
      </ol>
    </div>
  );
};

export default App;
