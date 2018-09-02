import  axios from 'axios';
import {GET_PROFILE,GET_PROFILES,PROFILE_LOADING,GET_ERRORS,SET_CURRENT_USER, CLEAR_CURRENT_PROFILE} from './types';
// get current profile 
export const getCurrentProfile =()=>dispatch=>{
  dispatch(setProfileLoading());
  axios.get('/api/profile')
  .then (res=>
    dispatch({
        type:GET_PROFILE,
        payload:res.data
    })
    )
    .catch(err=>
      dispatch({
          type:GET_PROFILE,
          payload:{}
      })
    );
}
// create new Profile  
// we pass profileData which is actually the data and history to move from one point to another 
// if data gets submitted to database correctly we move to dashboard page 
export const createProfile=(profileData,history)=>dispatch =>{
    console.log('profileData inside action is ',profileData);
  axios.post('/api/profile',profileData)
  .then (res=>history.push('/dashboard'))
  .catch(err => dispatch({
      type:GET_ERRORS,
      payload:err.response.data
  })
);

}
//Delete Account
// Delete account & profile
export const deleteAccount = () => dispatch => {
    if (window.confirm('Are you sure? This can NOT be undone!')) {
      axios
        .delete('/api/profile')
        .then(res =>
          dispatch({
            type: SET_CURRENT_USER,
            payload: {}
          })
        )
        .catch(err =>
          dispatch({
            type: GET_ERRORS,
            payload: err.response.data
          })
        );
    }
  };
//profile loading
export const setProfileLoading =()=>{
    return {
        type:PROFILE_LOADING
    }
}
// profile clearing

export const clearCurrentProfile =()=>{
    return {
        type:CLEAR_CURRENT_PROFILE
    }
}
// Add experience
export const addExperience = (expData, history) => dispatch => {
  axios
    .post('/api/profile/experience', expData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Add education
export const addEducation = (eduData, history) => dispatch => {
  axios
    .post('/api/profile/education', eduData)
    .then(res => history.push('/dashboard'))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Delete Experience
export const deleteExperience = id => dispatch => {
  axios
    .delete(`/api/profile/experience/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
// Get all profiles
export const getProfiles = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get('/api/profile/all')
    .then(res =>
      dispatch({
        type: GET_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILES,
        payload: null
      })
    );
};
// Get profile by handle
export const getProfileByHandle = handle => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get(`/api/profile/handle/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
      })
    );
};

// Delete Education
export const deleteEducation = id => dispatch => {
  axios
    .delete(`/api/profile/education/${id}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
