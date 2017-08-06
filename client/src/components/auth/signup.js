import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';

import * as actions from '../../actions';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className='form-group'>
    <label>{label}</label>
    <div>
      <input {...input} type={type} className='form-control' />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  </fieldset>
);

class Signup extends React.Component {

  handleFormSubmit({ email, password }) {
    this.props.signupUser({ email, password });
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className='alert alert-danger'>
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={ handleSubmit(this.handleFormSubmit.bind(this)) }>
        <Field type='text' name='email' component={renderField} label='Email:' />
        <Field type='password' name='password' component={renderField} label='Password:' />
        <Field type='password' name='password_confirm' component={renderField} label='Confirm Password:' />
        {this.renderAlert()}
        <button type='submit' className='btn btn-primary'>Sign Up</button>
      </form>
    );
  }
}

function validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = 'Field is required!';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address!';
  }
  
  if (!values.password) {
    errors.password = 'Field is required!';
  } else if (values.password.length < 6) {
    errors.password = 'Password must be at least 6 symbols long!';
  } else if (values.password !== values.password_confirm) {
    errors.password_confirm = 'Passwords doesn\'t match!';
  }

  return errors;
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

export default connect(mapStateToProps, actions)(reduxForm({
  form: 'signup',
  validate
})(Signup));