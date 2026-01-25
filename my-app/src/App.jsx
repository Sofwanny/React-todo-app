import { useState } from 'react';
import './App.css';

export default function Todo() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const addTodo = () => {
    if (input.trim() === '') return;
    const newTodo = { id: Date.now(), text: input.trim(), completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setInput('');
  };

  const deleteTodo = (todoId) => {
    setTodos((prev) => prev.filter((t) => t.id !== todoId));
  };

  const toggleTodo = (id) => {
    setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  return (
    <div className="container">
      <div className="header">
        <div className="logo">📝 <span>Todo</span></div>
        <div className="controls">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a new todo"
          />
          <button className="add-btn" onClick={addTodo}>Add</button>
        </div>
      </div>

      <ul>
        {todos.map((todo) => (
          <li
            key={todo.id}
            onClick={() => toggleTodo(todo.id)}
            className={todo.completed ? 'completed' : ''}
            style={{ cursor: 'pointer' }}
          >
            {todo.text}
            <button
              className="delete"
              onClick={(e) => {
                e.stopPropagation();
                deleteTodo(todo.id);
              }}
            >
              ❌
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
