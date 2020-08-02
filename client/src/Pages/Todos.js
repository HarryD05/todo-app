import React, { useState, useContext, useEffect } from 'react';

//Component
import TodoItem from '../Components/TodoItem';
import Message from '../Components/Message';

import TodoService from '../Services/TodoService';
import { AuthContext } from '../Context/AuthContext';

const Todos = props => {
  const [todo, setTodo] = useState({ name: "" });
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState(null);
  const [type, setType] = useState('all');
  const [placeholder, setPH] = useState(false);
  const authContext = useContext(AuthContext);

  //Equivalent to ComponentDidMount with class
  useEffect(() => {
    TodoService.getTodos().then(data => {
      setTodos(data.todos.all);
    });
  }, [placeholder]);

  const onSubmit = e => {
    e.preventDefault();

    TodoService.postTodo(todo).then(data => {
      const { message } = data;

      resetForm();

      if (!message.msgError) {
        TodoService.getTodos().then(data => {
          setTodos(data.todos.all);
          setMessage(message);
        });
      } else if (message.msgBody === 'Unauthorised') {
        setMessage(message);

        authContext.setUser({ username: "", role: "" });
        authContext.setIsAuthenticated(false);
      } else {
        setMessage(message);
      }
    });
  }

  const onChange = e => {
    setTodo({ name: e.target.value });
  }

  const resetForm = () => {
    setTodo({ name: "" });
  }

  const canRenderTodos = (todos.length === 0) ? false : true;

  const test = () => {
    setPH(!placeholder);
  }

  const renderTodo = todo => {
    return <TodoItem key={todo._id} todo={todo} onModify={test} />
  }

  const renderTodos = () => {
    switch (type) {
      case 'all':
        return todos.map(todo => {
          return renderTodo(todo);
        });

      case 'current':
        return todos.map(todo => {
          if (todo.archived === false) return renderTodo(todo);
          else return null;
        });

      case 'archived':
        return todos.map(todo => {
          if (todo.archived === true) return renderTodo(todo);
          else return null;
        });

      default:
        return null;
    }
  }

  return (
    <div>
      <div className="todo-content">
        <div className="todo-list">
          {canRenderTodos ? renderTodos() : null}
        </div>
        <br />
        <div className="todo-form">
          <h1>Todo List</h1>

          <div className="option-buttons">
            <button type="button" onClick={() => setType('all')}>All</button>
            <button type="button" onClick={() => setType('current')}>Current</button>
            <button type="button" onClick={() => setType('archived')}>Archived</button>
          </div>
          <div className="todo-type">Showing: {type}</div>

          <form onSubmit={onSubmit}>
            <label htmlFor="todo">New Todo</label><br />
            <input type="text" name="todo" value={todo.name} onChange={onChange} className="" placeholder="Enter todo..."></input><br />

            <button className="" type="submit">Add todo</button>
          </form>

          {message ? <Message className="message" message={message} /> : null}
        </div>
      </div>
    </div>
  )
}

export default Todos;