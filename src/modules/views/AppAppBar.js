import React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { withStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom'
import Typography from '../components/Typography'
import AppBar from '../components/AppBar';
import Toolbar, { styles as toolbarStyles } from '../components/Toolbar';

const styles = theme => ({
  title: {
    fontSize: 24,
    textDecoration: 'none',
    color: theme.palette.common.white,
    outline: 'none'
  },
  placeholder: toolbarStyles(theme).root,
  toolbar: {
    justifyContent: 'space-between',
  },
  left: {
    flex: 1,
  },
  leftLinkActive: {
    color: theme.palette.common.white,
  },
  right: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
  },
  rightLink: {
    fontSize: 16,
    color: theme.palette.common.white,
    marginLeft: theme.spacing(3),
    textDecoration: 'none',
    outline: 'none'
  },
  linkSecondary: {
    color: theme.palette.secondary.main,
  },
});

function AppAppBar(props) {
  const { classes } = props;

  return (
    <div>
      <AppBar position="fixed">
        <Toolbar className={classes.toolbar}>
          <div className={classes.left} />
          <Link to="/" className={classes.title}>
            <Typography variant="h6" underline="none" color="inherit" className={classes.title}>
            negociadores manaus
            </Typography>
          </Link>
          {/* <Link
            variant="h6"
            underline="none"
            color="inherit"
            className={classes.title}
            href="/"
          >
            {'negociadores manaus'}
          </Link> */}
          <div className={classes.right}>
            <Link
              className={classes.rightLink}
              to="/login/"
            >
              <Typography variant="h6" color="inherit" className={classes.rightLink}>
                Entrar
              </Typography>
            </Link>
            <Link
              className={clsx(classes.rightLink, classes.linkSecondary)}
              to="/registrar/"
            >
              <Typography variant="h6" color="inherit" className={clsx(classes.rightLink, classes.linkSecondary)}>
                Registrar
              </Typography>
            </Link>
          </div>
        </Toolbar>
      </AppBar>
      <div className={classes.placeholder} />
    </div>
  );
}

AppAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppAppBar);
