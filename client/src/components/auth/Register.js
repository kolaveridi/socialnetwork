import React, { Component } from 'react';
import {withRouter} from 'react-router-dom';
//import PropTypes from 'prop-types';
//import classnames from 'classnames';
import {connect} from 'react-redux';
import  {registerUser} from '../../actions/authActions';
import TextFieldGroup from  '../common/TextFieldGroup';
class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
      email: '',
      password: '',
      password2: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();

    const newUser = {
      name: this.state.name,
      email: this.state.email,
      password: this.state.password,
      password2: this.state.password2
    };
     this.props.registerUser(newUser,this.props.history);
     
  }
   componentDidMount() {
     if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
     }
   }
  componentWillReceiveProps(nextProps){
      if(nextProps.errors){
        this.setState({errors:nextProps.errors})
      }
  }

  render() {
    const { errors } = this.state;
    const {user}=this.props.auth;
    //console.log('this.props.auth is',this.props.auth);
   // console.log('this.props.errrors is',this.props.errors);
    console.log('this.props.auth is',this.props.auth);
   // console.log('this.props.auth.isAuthenticated is',this.props.auth.isAuthenticated);

    return (
      <div className="register">
      {user ?user.name:null}
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Sign Up</h1>
              <p className="lead text-center">
                Create your DevConnector account
              </p>
              <form noValidate onSubmit={this.onSubmit}>
              <TextFieldGroup
                     placeholder="Name"
                     name="name"
                     onChange={this.onChange}
                     value={this.state.name}
                     error ={errors.name}
                     />
                <TextFieldGroup
                     placeholder="Email "
                     name="email"
                     onChange={this.onChange}
                     value={this.state.email}
                     error ={errors.email}
                     type="email"
                     info="This site uses Gravatar"
                     />
                     <TextFieldGroup
                     placeholder="Password"
                     name="password"
                     onChange={this.onChange}
                     value={this.state.password}
                     error ={errors.password}
                     type="password"
                     />
                     <TextFieldGroup
                     placeholder=" confirm Password"
                     name="password2"
                     onChange={this.onChange}
                     value={this.state.password2}
                     error ={errors.password2}
                     type="password"
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
const mapStateToProps =(state)=>(
  {
  auth:state.auth,
  errors:state.errors
}
);


export default connect (mapStateToProps,{registerUser}) (withRouter(Register));