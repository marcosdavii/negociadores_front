import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/core/styles';
import { Radio } from 'final-form-material-ui';
// --- Post bootstrap -----
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Field, Form, FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import Typography from './modules/components/Typography';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import RFTextField from './modules/form/RFTextField';
import { email, required } from './modules/form/validation';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import AppForm from './modules/views/AppForm';
import withRoot from './modules/withRoot';
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

function SignUp() {
  const classes = useStyles();
  const { alert } = React.useContext(AlertContext);
  const history = useHistory();

  const validate = values => {
    const errors = required(['firstName', 'lastName', 'email', 'password', 'tipo'], values);

    if (!errors.email) {
      const emailError = email(values.email, values);
      if (emailError) {
        errors.email = email(values.email, values);
      }
    }

    return errors;
  };

  const onSubmit = async value => {
    const persist = () => {
      return new Promise(
        resolve => setTimeout(resolve, 1000),
        reject => reject({ msg: 'teste' }),
      );
    };
    try {
      await persist();
      alert({
        severity: 'success',
        msg: 'Cadastrado com sucesso',
      });
      history.push('/');
    } catch (error) {
      alert({
        severity: 'error',
        msg: error.msg,
      });
    }
  };

  return (
    <React.Fragment>
      <AppAppBar />
      <AppForm>
        <React.Fragment>
          <Typography variant="h3" gutterBottom marked="center" align="center">
            Registrar
          </Typography>
          <Link to="/login/">
            <Typography variant="body2" align="center" color="inherit">
              Já tem uma conta?
            </Typography>
          </Link>
        </React.Fragment>
        <Form
          onSubmit={onSubmit}
          subscription={{ submitting: true }}
          validate={validate}
          initialValues={{ tipo: 'comprador' }}
          render={({ handleSubmit, submitting }) => (
            <form onSubmit={handleSubmit} className={classes.form} noValidate>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Field
                    autoFocus
                    component={RFTextField}
                    disabled={submitting}
                    autoComplete="fname"
                    fullWidth
                    label="Nome"
                    name="firstName"
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Field
                    component={RFTextField}
                    disabled={submitting}
                    autoComplete="lname"
                    fullWidth
                    label="Sobrenome"
                    name="lastName"
                    required
                  />
                </Grid>
              </Grid>
              <Field
                autoComplete="email"
                component={RFTextField}
                disabled={submitting}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting}
                required
                name="password"
                autoComplete="current-password"
                label="Senha"
                type="password"
                margin="normal"
              />
              <FormControl component="fieldset">
                <RadioGroup row>
                  <FormControlLabel
                    label="Comprador"
                    control={<Field name="tipo" type="radio" component={Radio} value="comprador" />}
                  />
                  <FormControlLabel
                    label="Fornecedor"
                    control={
                      <Field name="tipo" type="radio" component={Radio} value="fornecedor" />
                    }
                  />
                </RadioGroup>
              </FormControl>
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
                color="secondary"
                fullWidth
              >
                {submitting ? 'Aguarde…' : 'Registrar'}
              </FormButton>
            </form>
          )}
        ></Form>
      </AppForm>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(SignUp);
