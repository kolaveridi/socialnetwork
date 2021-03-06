import React, { Component } from 'react';
import {BrowserRouter as Router,Route,Switch} from 'react-router-dom'; 
import './App.css';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import {setCurrentUser} from './actions/authActions';
import {Provider} from 'react-redux';
import {createStore ,applyMiddleware} from 'redux';
import store from './store';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfiles from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import {logoutUser} from './actions/authActions';
import { clearCurrentProfile } from './actions/profileAction';
import PrivateRoute from './components/common/PrivateRoute';
// copied part
// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

   //Check for expired token
   const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
  // Logout user
     store.dispatch(logoutUser());
    //  Clear current Profile
      store.dispatch(clearCurrentProfile());
     // Redirect to login
     window.location.href = '/login';
   }
}
// wrap your private route in switch 
class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <Router>
      <div className="App">
      <Navbar/> 
      <Route  exact path="/" component={Landing}/>
      <div className ="container">
      <Route exact path="/register" component={Register}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/profiles" component={Profiles}/>
      <Route exact path="/profile/:handle" component={Profile}/>
      <Switch>
      <PrivateRoute exact path="/dashboard" component={Dashboard}/>
      </Switch>
      <Switch>
      <PrivateRoute exact path="/create-profile" component={CreateProfiles}/>
      </Switch>
      <Switch>
      <PrivateRoute exact path="/edit-profile" component={EditProfile}/>
      </Switch>
      <Switch>
      <PrivateRoute exact path="/add-experience" component={AddExperience}/>
      </Switch>
      <Switch>
      <PrivateRoute exact path="/add-education" component={AddEducation}/>
      </Switch>
      </div>
       <Footer/>
      </div>
      </Router>
      </Provider>
    ); 
  }
}

export default App;
