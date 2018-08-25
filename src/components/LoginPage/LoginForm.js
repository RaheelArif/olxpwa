import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import green from '@material-ui/core/colors/green';

const styles = theme => ({
  button: {
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
  },
  leftIcon: {
    marginRight: theme.spacing.unit,
  },
  rightIcon: {
    marginLeft: theme.spacing.unit,
  },
  iconSmall: {
    fontSize: 20,
  },
  root: {
    color: green[600],
    '&$checked': {
      color: green[500],
    },
  },
  checked: {},
  size: {
    width: 60,
    height: 60,
  },
  sizeIcon: {
    fontSize: 20,
  },
});

const LoginForm = (props) => {
  const { handleChange, state, classes, handleSubmit } = props;
  const { user, errors } = state;
  return (
    <div className="container">
      <section className="registration-form">
        <h2>Login</h2>
        <div className="form-group"></div>
        <div className="form-group">
          <TextField
            label="Email"
            name="email"
            type="email"
            helperText={errors.email}
            fullWidth={true}
            onChange={handleChange}
            value={user.email}
            error={errors.email ? true : false}
            required={true}
            InputLabelProps={{ disableAnimation: false, focused: false, margin: 'dense' }}
          />
        </div>

        <div className="form-group">
          <TextField
            label="Password"
            name="password"
            type="password"
            helperText={errors.password}
            fullWidth={true}
            onChange={handleChange}
            value={user.password}
            error={errors.password ? true : false}
            required={true}
          />
        </div>

        <div className="form-group">
          <Button
            variant="contained" color="primary" className={classes.button}
            onClick={handleSubmit}
          >
            Login
            <Icon className={classes.rightIcon}>send</Icon>
          </Button>
        </div>

        <div className="form-group">
          <div className="text-muted">
            {`Don't have an account?`} <Link to="/register">create your account</Link>
          </div>
        </div>
      </section>
    </div>
  );
};

LoginForm.propTypes = {
  handleChange: PropTypes.func,
  state: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
}

export default withStyles(styles)(LoginForm);