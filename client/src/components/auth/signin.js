import React from 'react';
import { reduxForm, Field } from 'redux-form';
import * as actions from '../../actions';
import { connect } from 'react-redux';

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <fieldset className='form-group'>
    <label>{label}</label>
    <div>
      <input {...input} type={type} className='form-control' />
      {touched && error && <span className='text-danger'>{error}</span>}
    </div>
  </fieldset>
);

class Signin extends React.Component {
  handleFormSubmit({ email, password }) {
    this.props.signinUser({ email, password });
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
        <Field type='text' name='email' label='Email:' component={renderField} />
        <Field type='password' name='password' label='Password:' component={renderField} />
        {this.renderAlert()}
        <button action='submit' className='btn btn-primary'>Sign In</button>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.error };
}

const signinForm = reduxForm({
  form: 'signin',
})(Signin);

export default connect(mapStateToProps, actions)(signinForm);