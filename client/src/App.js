import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'

//Components
import Navbar from './Components/Navbar';
import Home from './Pages/Home';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Todos from './Pages/Todos';
import Admin from './Pages/Admin';

//High order Components
import PrivateRoute from './HOCs/PrivateRoute';
import UnprivateRoute from './HOCs/UnprivateRoute';

function App() {
  return (
    <div>
      <Router>
        <Navbar />

        <div className="content">
          <Route exact path='/' component={Home} />
          <UnprivateRoute exact path='/login' component={Login} />
          <UnprivateRoute exact path='/register' component={Register} />
          <PrivateRoute exact path='/todos' roles={['user', 'admin']} component={Todos} />
          <PrivateRoute exact path='/admin' roles={['admin']} component={Admin} />
        </div>
      </Router>
    </div>
  );
}

export default App;
