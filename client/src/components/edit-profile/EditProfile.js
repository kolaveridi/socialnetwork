import React ,{Component} from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import {createProfile,getCurrentProfile} from '../../actions/profileAction';
import {withRouter} from 'react-router-dom';
import isEmpty from '../../validation/is-empty';
// componentDidMount -->MapstatetoProps --->Componentwillreceiveprops -->updated
class CreateProfiles extends Component{
    constructor(props){
        
        super(props);
        this.state={
          displaySocialInputs:false,
          handle:'',
          company:'',
          website:'',
          location:'',
          status:'',
          skills:'',
          githubusername:'',
          bio:'',
          twitter:'',
          facebook:'',
          linkedin:'',
          youtube:'',
          instagram:'',
          errors:{}
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
    }
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextProps) {
    
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
        if(nextProps.profile.profile){
            const  profile=nextProps.profile.profile;
           console.log('Profile inside componentwillreceiveprops is',profile);
        
        // bRING skills array back to seperated values
        const skillsCSV=profile.skills.join('');
        // if profile field does not exist make eempty string
        
      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.linkedin = !isEmpty(profile.social.linkedin)
        ? profile.social.linkedin
        : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        linkedin: profile.linkedin,
        youtube: profile.youtube
      });
    }
      }
    onSubmit(e){
        e.preventDefault();
        console.log('Submit');
        const profileData = {
            handle: this.state.handle,
            company: this.state.company,
            website: this.state.website,
            location: this.state.location,
            status: this.state.status,
            skills: this.state.skills,
            githubusername: this.state.githubusername,
            bio: this.state.bio,
            twitter: this.state.twitter,
            facebook: this.state.facebook,
            linkedin: this.state.linkedin,
            youtube: this.state.youtube,
            instagram: this.state.instagram
          };
          console.log('profileData is',profileData);
          // note how this.props.history is used to move from one place to another
          this.props.createProfile(profileData, this.props.history);
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value})
    }
    render(){
        console.log('this.props is',this.props);
       let socialInputs;
        const {errors,displaySocialInputs}=this.state;
        if (displaySocialInputs) {
            socialInputs = (
              <div>
                <InputGroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fab fa-twitter"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  error={errors.twitter}
                />
      
                <InputGroup
                  placeholder="Facebook Page URL"
                  name="facebook"
                  icon="fab fa-facebook"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  error={errors.facebook}
                />
      
                <InputGroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fab fa-linkedin"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  error={errors.linkedin}
                />
      
                <InputGroup
                  placeholder="YouTube Channel URL"
                  name="youtube"
                  icon="fab fa-youtube"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  error={errors.youtube}
                />
      
                <InputGroup
                  placeholder="Instagram Page URL"
                  name="instagram"
                  icon="fab fa-instagram"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  error={errors.instagram}
                />
              </div>
            );
          }
      

         // Select options for status
    const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'Developer', value: 'Developer' },
        { label: 'Junior Developer', value: 'Junior Developer' },
        { label: 'Senior Developer', value: 'Senior Developer' },
        { label: 'Manager', value: 'Manager' },
        { label: 'Student or Learning', value: 'Student or Learning' },
        { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
        { label: 'Intern', value: 'Intern' },
        { label: 'Other', value: 'Other' }
      ];
        return(
           <div className="create-profile">
           <div className="container">
           <div className="row">
           <div className="col-md-8 m-auto">

           <h1 className="display-4 text-center">Edit Profile </h1>
            
             <small className="d-block pb-3">*=required fields</small>
             <form onSubmit={this.onSubmit}>
             <TextFieldGroup 
             placeholder="* Profile Hnadle"
             name="handle"
             value={this.state.handle}
             onChange={this.onChange}
             error={errors.handle}
             info=" A unique handle for your profile url.Your full name,Company name,nick name"
             />
             <SelectListGroup 
             placeholder="Status"
             name="status"
             value={this.state.status}
             onChange={this.onChange}
             error={errors.status}
             options={options}
             info=" Your current position"
             />
              <TextFieldGroup 
             placeholder="Company"
             name="compnay"
             value={this.state.compnay }
             onChange={this.onChange}
             error={errors.handle}
             info=" Company's name"
             />
             <TextFieldGroup 
             placeholder="webiste"
             name="website"
             value={this.state.website }
             onChange={this.onChange}
             error={errors.website}
             info=" Website name"
             />
              <TextFieldGroup 
             placeholder="location"
             name="Location"
             value={this.state.location }
             onChange={this.onChange}
             error={errors.location}
             info=" Location"
             />
              <TextFieldGroup 
             placeholder="skills"
             name="skills"
             value={this.state.skills }
             onChange={this.onChange}
             error={errors.skills}
             info="Add skills and seperate them with commmas"
             />
              <TextFieldGroup 
             placeholder="Github Username"
             name="githubusername"
             value={this.state.githubusername }
             onChange={this.onChange}
             error={errors.githubusername}
             info=" Your Github username"
             />
              <TextAreaFieldGroup 
             placeholder="Short bio"
             name="bio"
             value={this.state.bio }
             onChange={this.onChange}
             error={errors.bio}
             info=" Tell us a little about yourself"
             />
             <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                  {socialInputs}
                  <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
                </div>



             </form>
             </div>  
               </div>
            </div>
            </div>
        );
    }
}

const mapStateToProps = state =>({
  profile:state.profile,
  errors:state.errors
});
// always wrap the action in {}
export default connect(mapStateToProps,{createProfile,getCurrentProfile})(withRouter(CreateProfiles));