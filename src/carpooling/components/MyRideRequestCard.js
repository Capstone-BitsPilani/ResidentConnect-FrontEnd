import * as React from 'react';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import IconButton from '@mui/material/IconButton';

import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

import Badge from '@mui/material/Badge';
import Divider from '@mui/material/Divider';
import { connect } from 'react-redux';
import Typography from '@mui/material/Typography';

import Avatar from '@mui/material/Avatar';
import {PrimaryButton}from '../../shared/components/PrimaryButton';
import {convertDate,convertTime} from '../../misc/helpers';
import Popper from '@mui/material/Popper';
import PopupState, { bindToggle, bindPopper } from 'material-ui-popup-state';
import Fade from '@mui/material/Fade';
import {formatPhone} from '../../misc/helpers';

export const  MyRideRequestCard=({...props})=> {
     // eslint-disable-next-line no-extend-native
  String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}
    const renderData=()=>{
      if( typeof props.ridereq === "undefined")
    
        return null;
        if(  props.ridereq === null)
          return null;
      return(
        <Paper key ={props.ridereq._id} elevation={1} style={{  marginLeft: '100px', padding:'10px', marginTop:'50px', width: '800px'}}>
  <Grid container column justifyContent="space-between" alignItems="center">

  <Grid container row  alignItems="center">
    {typeof props.owner !== "undefined" &&
      <Avatar style={{height:'100px',width:'100px'}} alt="complex" src={props.owner.avatar} />  
    }

      {typeof props.owner !== "undefined" &&
        <Typography style={{marginLeft:'10px', fontWeight:'bold'}}  gutterBottom variant="h5" component="div">{props.owner.firstname} {props.owner.lastname}</Typography>
      }
    
      
      <Grid item style={{marginLeft:'350px'}}>
        <Typography style={{fontSize:'20px',fontWeight:'bold'}} gutterBottom variant="body1" component="div">{props.ridereq.seats} Seats</Typography>
        <Typography gutterBottom variant="body1" component="div"> &#8377; {props.ridereq.ride!=null? props.ridereq.ride.amt.toLocaleString('en-IN'):0} per seat</Typography>
      </Grid>
    </Grid>
    
    <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">


      <div style={{paddingLeft:'30px',paddingTop:'15px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="primary" variant="dot">
          
        </Badge>
        <Typography style={{marginTop:'-15px',paddingLeft:'30px',fontSize:'20px'}} variant="body2" gutterBottom>
        {props.ridereq.ride.source.addressline}, {props.ridereq.ride.source.area}, {props.ridereq.ride.source.city},{props.ridereq.ride.source.state},{props.ridereq.ride.source.pincode}
          </Typography>
      </div>

      <Divider style={{marginLeft:'30px', height:'30px',width:'2px', background:'black'}}  orientation="vertical" />

      <div style={{paddingLeft:'30px',paddingTop:'10px'}}>
        <Badge anchorOrigin={{
    vertical: 'top',
    horizontal: 'left',
  }} color="secondary" variant="dot">

          <Typography style={{marginTop:'-15px',fontSize:'20px',paddingLeft:'30px'}} variant="body2"  gutterBottom>
          {props.ridereq.ride.destination.addressline}, {props.ridereq.ride.destination.area}, {props.ridereq.ride.destination.city},{props.ridereq.ride.destination.state},{props.ridereq.ride.destination.pincode}

      </Typography>
        </Badge>
      </div>
    </Grid>
    <Grid style={{paddingLeft:'30px',paddingTop:'10px'}} container row justifyContent="space-between" alignItems="center">
      <Typography variant="body2" style={{fontSize:'20px'}} color="orange">
        {convertDate(props.ridereq.ride.ridedatetime)}, {convertTime(props.ridereq.ride.ridedatetime)}
      </Typography>
      <PopupState  style={{paddingLeft:'30px'}} variant="popper" >
      {(popupState) => (
        <div>
      <IconButton  {...bindToggle(popupState)}  size="large">
        <ContactPhoneIcon style={{height:'40px',width:'40px',color:'green'}} />
      </IconButton>
      <Popper {...bindPopper(popupState)} transition>
            {({ TransitionProps }) => (
              <Fade {...TransitionProps} timeout={350}>
                <Paper>
                  <Typography sx={{ p: 2 }}>{formatPhone(props.owner  .phone[0].number)}</Typography>
                </Paper>
              </Fade>
            )}
          </Popper>
        </div>
      )}
    </PopupState>
      <div>
     
          <PrimaryButton disabled>{props.ridereq.status.capitalize()} </PrimaryButton>
          {props.ridereq.status==='pending' &&
          <PrimaryButton style={{marginLeft:'10px'}}  >Cancel Request </PrimaryButton>}
            {props.ridereq.status==='rejected' &&  props.ridereq !=null &&
          <Typography variant="body2" color="text.secondary"> {props.ridereq.rejectionreason.capitalize()} </Typography>}
    {props.ridereq.status==='rejected' &&  props.ridereq ==null &&
          <Typography variant="body2" color="text.secondary"> No Reason for rejection </Typography>}
       
      </div>
    </Grid>


  </Grid>
</Paper>
      )
    }
return (
  <div>
  {renderData()}
  </div>
);
}


const mapStateToProps = (state, ownProps) => {
  console.log(ownProps.ridereq.owner);
  console.log(state.users);
  return { 
   
    

    owner:state.users.find(user => user._id === ownProps.ridereq.owner) 
};
};

export default connect(mapStateToProps)(MyRideRequestCard);