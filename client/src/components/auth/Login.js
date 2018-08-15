import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
//import classnames from 'classnames';
import { loginUser } from '../../actions/authActions';
import TextFieldGroup from  '../common/TextFieldGroup';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }
  
  componentWillReceiveProps(nextProps) {
    console.log('nextProps.auth.isAuthenticated',nextProps.auth.isAuthenticated);
    if (nextProps.auth.isAuthenticated) {
      console.log('History thing');
      this.props.history.push('/dashboard');
    }

    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };
  

    this.props.loginUser(userData);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    console.log('this.props is',this.props);
    console.log('this.props.auth.initialstate',this.props.auth.initialstate);

    return (
      <div className="login">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Log In</h1>
              <p className="lead text-center">
                Sign in to your DevConnector account
              </p>
              <form onSubmit={this.onSubmit}>
              <TextFieldGroup 
                type="email"
                name="email"
                placeholder="Email Address"
                value={this.state.email}
                onChange={this.onChange}
                error={errors.email}
                />
                <TextFieldGroup 
                type="password"
                name="password"
                placeholder="Email Password"
                value={this.state.password}
                onChange={this.onChange}
                error={errors.password}
                />
                <input type="submit" className="btn btn-info btn-block mt-4" />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => (
  console.log('state is',state),
  {
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { loginUser })(Login);