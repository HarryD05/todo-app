export default {
  getTodos: () => {
    return fetch('/todo/todos')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  postTodo: todo => {
    return fetch('/todo/create', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  setArchivedTodo: todo => {
    return fetch('/todo/archive/', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  toggleTodo: todo => {
    return fetch('/todo/toggle/', {
      method: 'post',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  separatedTodos: () => {
    return fetch('/todo/todos')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  todoCount: () => {
    return fetch('/todo/count')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
}