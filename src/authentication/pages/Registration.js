import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Button, OutlinedInput, Grid, TextField, Paper } from '@material-ui/core'
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from "axios";

import IconButton from "@material-ui/core/IconButton";
import InputLabel from "@material-ui/core/InputLabel";
import InputAdornment from "@material-ui/core/InputAdornment";
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import FormControl from '@material-ui/core/FormControl';
import firebase from 'firebase/app';
import { auth,database } from '../../misc/firebase';
import Link from '@material-ui/core/Link';
import {Redirect} from 'react-router-dom';
import { PageHeader } from '../../shared/components/PageHeader';
import { CenterFocusStrong, ControlCameraOutlined } from '@material-ui/icons';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import { Box } from '@material-ui/core';
import PrimaryButton from '../../shared/components/PrimaryButton';
import logo from '../../images/home/houselogo.png';
import userAPI from '../../misc/axios-calls/userAPI';
import communityAPI from '../../misc/axios-calls/communityAPI';

import lock from '../../images/authentication/lock.png';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',

width:"80ch",
height: "60ch",
padding: '1ch',

    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: '25ch',
    },
  }));

const Registration = () => {
    const classes = useStyles();
    const history = useHistory();
    const[token,setToken]=useState(null);
    
    let apartment=null;

    let community=null
    let uid=null;
    const[userInfo,setUserInfo]=useState(
        {
            type:'',
         
            email:''
        }
    );
    const [password, setPassword] = useState({
        password: "",
        showPassword: false,
      });
      
      const handleClickShowPassword = () => {
        setPassword({ ...password, showPassword: !password.showPassword });
      };
      
      const handleMouseDownPassword = (event) => {
        event.preventDefault();
      };
      
      const validateToken=async ()=>{
        var apiBaseUrl = null;
        if(userInfo.type==='admin')
             apiBaseUrl=`/community/validatetoken/${token}`;
        else
            apiBaseUrl=`/community/apartments/validatetoken/${token}`;
       await communityAPI.get(apiBaseUrl )
            .then(function (response) {
                if (response.status === 200) {           
                    if(userInfo.type==='admin')                    
                    { 
                      console.log("save community details");
                      console.log(response.data);
                      community=response.data; 
                        console.log(community);
                        
                        return true;
                    }
                    else if(userInfo.type==='resident') 
                    {
                        console.log("save apartment details");
                      console.log(response.data);
                      apartment=response.data; 
                        console.log(apartment);
                        return true;
                    }
                }
                else if (response.status === 404) {
                    console.log("Token invalid");
                    return false;
                }
            })
            .catch(function (error) {
                console.log(error);
                return false;
            });
            return false;
          
      }
      const handlePasswordChange = (prop) => (event) => {
        setPassword({ ...password, [prop]: event.target.value });
      };
      const onSignUpWithProvider =  async provider => {
        
         try {
             const result= await auth.signInWithPopup(provider);
             console.log(result);           
         }
         catch (err) {
            console.log(err);
        }
     }
     const registerUserwithEmailAndPassword=()=>{
         console.log('Register email in Firebase....');
        auth.createUserWithEmailAndPassword(userInfo.email,password.password)
        .then((userCredential) => {
         
        const user = userCredential.user;
        console.log(user);
        console.log(uid);

        uid=user.uid;
            createUser();  
             }
        )
             
        .catch((error) => {
            console.log(error)
        
        });
     }
     const createUser=async ()=>{
        console.log('create userInfo Record...');
        console.log(community);
        var apiBaseUrl = `/users/create`;
        let userData=null;
        if(userInfo.type==='admin')
        {
            userData={
            type:userInfo.type,
            uid:uid,
            email:userInfo.email,
            communities:[community.id],
            }
        }
        else
        {
            userData={
                type:userInfo.type,
                uid:uid,
                email:userInfo.email,
                communities:[apartment.communityid],
                apartments:[{
                  communityid:apartment.communityid,
                  apartmentid:apartment._id}],
            }
        }
        console.log(userData);
        await userAPI.post(apiBaseUrl,userData )
             .then(function (response) {
                 if (response.status === 201) {           
                  
                  console.log('user is created');
                  console.log(response.data);
                  
                  signOut();
                  history.push('/signin');
                  
                 }
           
             })
             .catch(function (error) {
                 console.log(error);
                 
             });
             
           
       }
     const onSignup=(event)=>{     
       const tokencheck=validateToken();
       console.log(tokencheck);
       if(tokencheck)
       {

             registerUserwithEmailAndPassword();
           
        
        }

      event.preventDefault() 
     }
     const signOut=()=>{
        auth.signOut().then(() => {
          history.push('/signin');
      }).catch((error) => {
        console.log(error);
      });
        }
     const onFacebookSignUp = () => {
        onSignUpWithProvider(new firebase.auth.FacebookAuthProvider());

     }
     const onGoogleSignUp = (event) => {
        onSignUpWithProvider(new firebase.auth.GoogleAuthProvider());
        event.preventDefault() ;
 
     }
     const onChangeUserType=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,type:event.target.value}});
     }
     const onChangeEmail=(event)=>{
        setUserInfo((prevState)=>{
            return{...prevState,email:event.target.value}});
     }
     const goToSignIn=(event)=>{
      history.push('/signin');
     }
     return (

      <Grid  container direction="column" justifyContent="space-evenly"  style={{marginLeft:"5px", marginTop:"50px"}} alignItems="center">
      <img src={logo}/>
      <Paper elevation={10} className={classes.root}>

    
        <Grid  container direction="column" justifyContent="space-evenly" alignItems="center">
        <PageHeader>Sign Up</PageHeader>
        <img src={lock}/>
        <RadioGroup row aria-label="position" name="usertype" defaultValue="resident" onChange={onChangeUserType}>        
        <FormControlLabel id="radio_admin"   value="admin"  control={<Radio color="primary" />} label="Admin" />        
        <FormControlLabel id="radio_resident"    value="resident"  control={<Radio color="primary" />} label="Resident" />        
         </RadioGroup>

         
     
        <TextField id="token" style={{ margin: 8, width: '30ch'}}    margin="normal" label="Token" value={token} onChange={(e)=>setToken(e.target.value)}  variant="outlined"/>

       
        <TextField id="email" style={{ margin: 8, width: '30ch'}}    margin="normal" label="Email" value={userInfo.email} onChange={onChangeEmail}  variant="outlined"/>
        
        

        <FormControl variant="outlined">
        <InputLabel htmlFor="password">Password</InputLabel>
  
          <OutlinedInput   id="password" type={password.showPassword ? "text" : "password"} onChange={handlePasswordChange("password")}
              value={password.password}         
              endAdornment={
            <InputAdornment position="end">
              <IconButton   aria-label="toggle password visibility" onClick={handleClickShowPassword}
               onMouseDown={handleMouseDownPassword} edge="end">
                {password.showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
              }
          />
        </FormControl>
       
      
      <PrimaryButton onClick={onSignup}>Sign Up </PrimaryButton>

      <Link component="button" variant="body2" onClick={goToSignIn}> Existing User? Sign In </Link>

      </Grid>
      </Paper>
      </Grid>
    )
}

export default Registration
