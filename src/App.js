import React, { useState } from 'react';
import Home from './Home';
import Registrar from './SignUp';
import Login from './SignIn';
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import AlertContext from './modules/components/AlertContext';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export default function App() {
  const [snackOpts, setSnackState] = useState({
    open: false,
    severity: 'success',
    msg: '',
  });

  const handleClose = (event, reason) => {
    if (reason !== 'clickaway') setSnackState({ ...snackOpts, open: false });
  };

  return (
    <AlertContext.Provider value={{ alert: opts => setSnackState({ open: true, ...opts }) }}>
      <Router>
        <Switch>
          <Route path="/registrar" component={Registrar} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
      <Snackbar open={snackOpts.open} autoHideDuration={3000} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackOpts.severity}>
          {snackOpts.msg}
        </MuiAlert>
      </Snackbar>
    </AlertContext.Provider>
  );
}
