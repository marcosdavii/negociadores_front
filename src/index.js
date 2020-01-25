import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Registrar from './SignUp';
import Login from './SignIn'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

ReactDOM.render(<Router>
    <Switch>
        <Route path="/registrar" component={Registrar} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
    </Switch>
</Router>, document.getElementById('root'));