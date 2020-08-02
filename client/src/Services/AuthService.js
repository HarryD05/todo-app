export default {
  login: user => {
    return fetch('/user/login', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status !== 401) {
        return response.json().then(data => data);
      } else {
        return {
          message: { msgBody: "Login failed", msgError: true },
          isAuthenticated: false,
          user: {
            username: "",
            role: ""
          }
        }
      }
    })
  },
  register: user => {
    return fetch('/user/register', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
      .then(data => data);
  },
  logout: () => {
    return fetch('/user/logout')
      .then(response => response.json())
      .then(data => data);
  },
  isAuthenticated: () => {
    return fetch('/user/authenticated')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return {
            isAuthenticated: false,
            user: {
              username: "",
              role: ""
            }
          }
        }
      });
  },
  userCount: () => {
    return fetch('/user/count')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  users: () => {
    return fetch('/user/users')
      .then(response => {
        if (response.status !== 401) {
          return response.json().then(data => data);
        } else {
          return { message: { msgBody: "Unauthorised", msgError: true } };
        }
      });
  },
  changeRole: user => {
    return fetch('/user/change-role', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status !== 401) {
        return response.json().then(data => data);
      } else {
        return { message: { msgBody: "Unauthorised", msgError: true } };
      }
    });
  },
  resetUser: user => {
    return fetch('/user/reset', {
      method: 'post',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => {
      if (response.status !== 401) {
        return response.json().then(data => data);
      } else {
        return { message: { msgBody: "Unauthorised", msgError: true } };
      }
    });
  }
}