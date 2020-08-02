import React, { useState } from 'react';
import TodoService from '../Services/TodoService';

const TodoItem = props => {
  const { todo } = props;

  // eslint-disable-next-line
  const [todoID, setTodoID] = useState(todo._id);
  // eslint-disable-next-line
  const [isCompleted, setIsCompleted] = useState(todo.completed);
  // eslint-disable-next-line
  const [isArchived, setIsArchived] = useState(todo.archived);

  const toggle = () => {
    TodoService.toggleTodo({ id: todoID }).then(data => {
      setIsCompleted(data.completed);
    });
    props.onModify();
  }

  const archive = () => {
    TodoService.setArchivedTodo({ id: todoID, setArchived: true }).then(data => {
      setIsArchived(data.archived);
    });

    props.onModify();
  }

  const unarchive = () => {
    TodoService.setArchivedTodo({ id: todoID, setArchived: false }).then(data => {
      setIsArchived(data.archived);
    });
    props.onModify();
  }

  const renderArchiveButtons = () => {
    if (isArchived) {
      return <button type="button" className="todo-btn hidden-btn" onClick={unarchive}>Unarchive</button>
    } else {
      return <>
        <button type="button" className="todo-btn delete-btn" onClick={archive}>Archive</button>
        <button type="button" className="todo-btn complete-btn" onClick={toggle}>Toggle</button>
      </>
    }
  }

  let classes = "info ";
  if (isArchived) {
    classes += "archived ";
  }

  if (isCompleted) {
    classes += "completed";
  }



  return (
    <div className="todo-item">
      <div className={classes}>{todo.name}</div>

      <div className="buttons">
        {renderArchiveButtons()}

      </div>
    </div>
  )
}

export default TodoItem;