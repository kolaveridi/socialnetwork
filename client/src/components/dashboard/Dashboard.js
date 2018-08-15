import React ,{Component} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentProfile} from '../../actions/profileAction';
import Spinner from '../common/Spinner';
import {Link } from 'react-router-dom';
 class Dashboard extends Component{
    
  componentDidMount(){
      this.props.getCurrentProfile();
  }


    render(){
        const {user}=this.props.auth;
        const {profile,loading}=this.props.profile;
         let dashboardContent;
         if(profile===null || loading){
            dashboardContent=<Spinner/>
         }
         else{
             // check if logged in user has profile data
             if(Object.keys(profile).length>0){
                 dashboardContent=<h4>Display Profile </h4>
             }
             else{
                 // user is logged in but has no profile
                 dashboardContent=(
                  <div>
                        <p className="lead text-muted" >WELCOME {user.name}</p>
                        <p>You have not yet setup a profile </p>
                        <Link to="/create-profile" className="btn btn-lg btn-info">
                          Create Profile
                        </Link>
                      </div>

                 );
             }
          //  dashboardContent= <h1>Hello </h1>
         }

        return(
         <div className="dashboard">
            <div className="container">
            <div className="row">
            <div className ="col-md 12">
                   <h1 className ="dispaly-4">
                     Dashboard
                   </h1>
                   {dashboardContent}
               </div>
            </div>
            </div>
             </div>

        );
    }
}
const mapStateToProps =state =>(
    console.log('state inside Dashboard.js is ',state),
    {
     profile:state.profile,
     auth:state.auth
     }
);
export default connect (mapStateToProps,{getCurrentProfile})(Dashboard);
