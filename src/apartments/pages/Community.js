import React, {useEffect} from 'react';
import {TextField,Button} from '@material-ui/core';
import { useState } from 'react';
import axios from "axios";
import { PageHeader } from '../../shared/components/PageHeader'
import { makeStyles } from '@material-ui/core/styles';
import { useCommunity } from '../../context/community.context';
import PrimaryButton from '../../shared/components/PrimaryButton';
import { useProfile } from '../../context/profile.context';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import communityAPI from '../../misc/axios-calls/communityAPI';


const useStyles = makeStyles((theme) => ({
root: {
display: 'flex',
flexWrap: 'wrap',
},
textField: {
marginLeft: theme.spacing(1),
marginRight: theme.spacing(1),
width: '25ch',
},
}));


export const Community = ({children,...props}) => {
const classes = useStyles();
const {communityList}=useCommunity();
const communityid=communityList[0].id
const {isLoading}=useProfile();
const [communityDetails,setCommunityDetails]=useState({
name:'',
builder:'',
address:{
addressline:'',
area:'',
city:'',
state:'',
pincode:''
}
});
const updateCommunityDetails=async()=>{

var apiBaseUrl = `/community/${communityid}`
console.log(communityDetails);
await communityAPI.put(apiBaseUrl,communityDetails )
.then(function (response) {
if (response.status === 200)
{
console.log( response.data);



}
})
.catch(function (error) {
console.log(error);

});
}
const getCommunityDetails=async()=>{

var apiBaseUrl = `/community/${communityid}`
await communityAPI.get(apiBaseUrl )
.then(function (response) {
if (response.status === 200)
{
console.log(response.data);
const communitydata= response.data;
setCommunityDetails((prevState)=>{
return{...prevState,name:communitydata.name}});
setCommunityDetails((prevState)=>{
return{...prevState,builder:communitydata.builder}});
if(communitydata.address!=null)
setCommunityDetails((prevState)=>{
return{...prevState,address:communitydata.address}});


}
})
.catch(function (error) {
console.log(error);

});
}
useEffect(() => {
getCommunityDetails();

}, [])
const setCommunityName = (event) => {
setCommunityDetails((prevState)=>{
return{...prevState,name:event.target.value}});
};
const setBuilderName = (event) => {
setCommunityDetails((prevState)=>{
return{...prevState,builder:event.target.value}});
};
const setAddressLine = (event) => {
if(communityDetails.address==null)
setCommunityDetails((prevState)=>{
return{...prevState,address:{
addressline:'',
area:'',
city:'',
state:'',
pincode:''
}}});
const tempAddress=communityDetails.address;
tempAddress.addressline=event.target.value;
setCommunityDetails((prevState)=>{
return{...prevState,address:tempAddress}});
};
const setArea = (event) => {
const tempAddress=communityDetails.address;
tempAddress.area=event.target.value;
setCommunityDetails((prevState)=>{
return{...prevState,address:tempAddress}});
};
const setCity = (event) => {
const tempAddress=communityDetails.address;
tempAddress.city=event.target.value;
setCommunityDetails((prevState)=>{

return{...prevState,address:tempAddress}});
};
const setState = (event) => {
const tempAddress=communityDetails.address;
tempAddress.state=event.target.value;
setCommunityDetails((prevState)=>{
return{...prevState,address:tempAddress}});
};
const setPincode = (event) => {
const tempAddress=communityDetails.address;
tempAddress.pincode=event.target.value;
setCommunityDetails((prevState)=>{
return{...prevState,address:tempAddress}});
};


const handleSubmit=(event)=>{
updateCommunityDetails();
props.handleNext()
}
return (

<>
  <PageHeader>{children}</PageHeader>

  <form>
  <Paper style={{margin:'50px', width:'1000px'}} elevation={10}>
      <Grid container style={{marginTop:'50px'}} direction="column" justifyContent="space-evenly" alignItems="center">
     
          <TextField id="communityname" style={{ marginTop:30, margin: 16, width: '100ch'}} margin="normal" label="Community Name" value={communityDetails.name} onChange={setCommunityName} variant="outlined" />
        <TextField id="communitybuilder" style={{  marginTop:30,  margin: 16 , width: '100ch'}} margin="normal" label="Builder Name" value={communityDetails.builder} onChange={setBuilderName} variant="outlined" />
        <TextField id="addressline" style={{  marginTop:30,  margin: 16,  width: '100ch' }} margin="normal" label="Address" value={communityDetails.address!=null?communityDetails.address.addressline:''} onChange={setAddressLine} variant="outlined" />
        <TextField id="area" style={{  marginTop:30,  margin: 16 ,  width: '100ch' }} margin="normal" label="Area" value={communityDetails.address!=null?communityDetails.address.area:''} onChange={setArea} variant="outlined" />
        <div style={{  marginTop:30, margin: 16 }} className={classes.root}>
          <TextField id="city" className={classes.textField} label="City" value={communityDetails.address!=null?communityDetails.address.city:''} onChange={setCity} variant="outlined" />
          <TextField id="state" className={classes.textField} label="State" value={communityDetails.address!=null?communityDetails.address.state:''} onChange={setState} variant="outlined" />
          <TextField id="pincode" className={classes.textField} label="Pincode" value={communityDetails.address!=null?communityDetails.address.pincode:''} onChange={setPincode} variant="outlined" />
        </div>
      

      </Grid>
      </Paper>
    <PrimaryButton onClick={handleSubmit}> Next </PrimaryButton>
  </form>

</>
)
}

export default Community