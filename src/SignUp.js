import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
// --- Post bootstrap -----
import React from 'react';
import { Field, Form, FormSpy } from 'react-final-form';
import { Link } from 'react-router-dom';
import { Radio } from 'final-form-material-ui';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Typography from './modules/components/Typography';
import FormButton from './modules/form/FormButton';
import FormFeedback from './modules/form/FormFeedback';
import RFTextField from './modules/form/RFTextField';
import { email, required } from './modules/form/validation';
import AppAppBar from './modules/views/AppAppBar';
import AppFooter from './modules/views/AppFooter';
import AppForm from './modules/views/AppForm';
import withRoot from './modules/withRoot';
import { Divider } from '@material-ui/core';

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
  const [sent, setSent] = React.useState(false);

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

  const onSubmit = value => {
    console.log(value);
    // setSent(true);
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
                disabled={submitting || sent}
                fullWidth
                label="Email"
                margin="normal"
                name="email"
                required
              />
              <Field
                fullWidth
                component={RFTextField}
                disabled={submitting || sent}
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
                disabled={submitting || sent}
                color="secondary"
                fullWidth
              >
                {submitting || sent ? 'Aguarde…' : 'Registrar'}
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
