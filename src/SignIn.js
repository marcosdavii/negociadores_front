import withRoot from './modules/withRoot';
// --- Post bootstrap -----
import React, { useContext } from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from 'react-router-dom';
import Typography from './modules/components/Typography';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import AppForm from './modules/views/AppForm';
import { email, required } from './modules/form/validation';
import RFTextField from './modules/form/RFTextField';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import AlertContext from './modules/components/AlertContext';

const useStyles = makeStyles(theme => ({
  form: {
    marginTop: theme.spacing(6),
  },
  button: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(2),
  },
  feedback: {
    marginTop: theme.spacing(2),
  },
}));

function SignIn() {
  const classes = useStyles();
  const { alert } = useContext(AlertContext);

  const validate = values => {
    const errors = required(['email', 'password'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async () => {
    const login = () => {
      return new Promise(resolve => setTimeout(resolve, 1000));
    };
    try {
      await login();
      alert({
        severity: 'success',
        msg: 'Logado com sucesso',
      });
    } catch (error) {
      alert({
        severity: 'error',
        msg: error.msg,
      });
    }
    // setSent(true);
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Entrar
          </Typography>
          <Typography variant="body2" align="center">
            {'Ainda não tem uma conta? '}
          </Typography>
          <Link to="/registrar/" align="center">
            <Typography align="center" color="inherit">
              Faça sua conta aqui
            </Typography>
          </Link>
        </React.Fragment>
        <Form onSubmit={onSubmit} subscription={{ submitting: true }} validate={validate}>
          {({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Field
                autoComplete="email"
                autoFocus
                component={RFTextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
                size="large"
              />
              <Field
                fullWidth
                size="large"
                component={RFTextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
                label="Senha"
                type="password"
                margin="normal"
              />
              <FormSpy subscription={{ submitError: true }}>
                {({ submitError }) =>
                  submitError ? (
                    <FormFeedback className={classes.feedback} error>
                      {submitError}
                    </FormFeedback>
                  ) : null
                }
              </FormSpy>
              <FormButton
                className={classes.button}
                disabled={submitting}
                size="large"
                color="secondary"
                fullWidth
              >
                {submitting ? 'Aguarde…' : 'Entrar'}
              </FormButton>
            </form>
          )}
        </Form>
        <Typography align="center">
          <Link to="/">Esqueceu a senha?</Link>
        </Typography>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignIn);
