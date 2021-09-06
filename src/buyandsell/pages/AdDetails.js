import { Divider } from '@material-ui/core'
import React from 'react'
import { PageHeader } from '../../shared/components/PageHeader'
import { SectionHeader } from '../../shared/components/SectionHeader'
import { Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core'
import { Paper } from '@material-ui/core'
import SingleLineImageList from '../components/SingleLineImageList'
import { ImageList } from '@material-ui/core'
import { ImageListItem } from '@material-ui/core'
import PrimaryButton from '../../shared/components/PrimaryButton'
import { useProfile } from '../../context/profile.context'
import axios from 'axios';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { useModelState } from '../../misc/custom-hooks'
import { DeleteAdvertModal } from '../components/DeleteAdvertModal'
import { useHistory } from 'react-router'

const useStyles = makeStyles((theme) => ({
root:{
flexGrow: 1,

},
divImage:{




},
ThumbImageView:
{
height:'50ch',
border :'1px solid #ccc',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
textAlign: 'center',


},
imageView:
{
width:'10ch',
height:'5ch',
border :'1px solid #ccc',
display: 'flex',
justifyContent: 'center',
alignItems: 'center',
textAlign: 'center',

},
imageList: {
marginLeft: theme.spacing(2),
flexWrap: 'nowrap',
height:'10ch',

// Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
transform: 'translateZ(0)',

},
adPrice:{
width:"40ch",
padding: '1ch',
borderRadius:'0.5ch',
border: '2px solid orange'
},
adImages:{
width:"120ch",
display: 'flex',
flexWrap: 'wrap',
marginLeft:'5ch',
padding: '1ch',
borderRadius:'2ch',
border: '2px solid orange'
},
addetails:{
display: 'flex',
flexWrap: 'wrap',
marginLeft:'5ch',
width:"120ch",

padding: '1ch',
borderRadius:'2ch',
border: '2px solid orange'
},
thumbnail:{
marginLeft:'25ch',
width: '100ch',
height: '40ch'
}

}));
export const AdDetails = ({...props}) => {
const classes=useStyles();
const history=useHistory();
const {advert}=props.location.state
const {user}=useProfile();
const [sellerDetails,setSellerDetails]=React.useState({firstname:'', lastname:'',phone:[{number:''}]});
const { isOpen, open, close } = useModelState();
const getSellerDetails=async()=>{
const apiBaseUrl = `http://localhost:4002/api/users/${advert.creator}`
console.log(apiBaseUrl);
await axios.get(apiBaseUrl)
.then(function (response) {
if (response.status === 200)
{
console.log(response.data);
setSellerDetails(response.data);
console.log(sellerDetails);
}
})
.catch(function (error) {
console.log(error);

});
}
React.useEffect(() => {
getSellerDetails();

}, [])

const updateAd=async (event)=>
{

}
const deleteAd=async()=>{
    console.log(`delete ${advert._id}`);
    var apiBaseUrl = `http://localhost:4004/api/adverts/${advert._id}`  
      await axios.delete(apiBaseUrl )
          .then(function (response) {
            if (response.status === 200)            
           {
               console.log(response.data);
               close();
               history.push('/myads');
           }
        })
        .catch(function (error) {
            console.log(error);
             
        });
}
return (
<div>
  <PageHeader> {advert.title} </PageHeader>
  <Grid container direction="column" justifyContent="center" alignItems="center">
    <Grid container direction="row" justifyContent="space-around" alignItems="flex-start">
      <Grid xs={9}>
        <Grid container spacing={5} direction="column" justifyContent="space-around" alignItems="flex-start">
          <Grid items>

            <Box className={classes.adImages}>
              <Grid container style={{width:300}} direction="column" justifyContent="space-evenly" alignItems="flex-start">
                <ImageList rowHeight={300} cols={1} style={{alignSelf:"center"}}>

                  <ImageListItem>
                    <div className={classes.ThumbImageView}>
                      <img src={advert.images[0]} alt="Preview" />
                    </div>

                  </ImageListItem>

                </ImageList>
                <br />
                <br />
                <ImageList rowHeight={100} cols={advert.images.length}>
                  {[...Array(advert.images.length)].map((item, i) => (

                  <ImageListItem>
                    <div className={classes.imageView}>
                      <img style={{  width:'10ch', height: '10ch'}} src={advert.images[i]} alt="Preview" />

                    </div>

                  </ImageListItem>


                  ))}
                </ImageList>

              </Grid>
            </Box>
          </Grid>
          <br />
          <br />
          <Grid items>
            <Box className={classes.addetails}>
              <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
                <SectionHeader>Details</SectionHeader>

                <p>{advert.title}</p>
                <Divider />
                <SectionHeader>Description</SectionHeader>
                <p>{advert.description}</p>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Grid>
      <Grid xs={3}>
        <Grid items>
          <Box className={classes.adPrice}>

            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <SectionHeader>{advert.price.value}</SectionHeader>

              <p>{advert.title}</p>

            </Grid>
          </Box>
          <br /> <br /> <br />
          <Box className={classes.adPrice}>

            <Grid container direction="column" justifyContent="flex-start" alignItems="flex-start">
              <SectionHeader>Seller Details</SectionHeader>
              <p> {sellerDetails.firstname} {sellerDetails.lastname}</p>
              <p>{sellerDetails.phone[0].number}</p>

            </Grid>
          </Box>
        </Grid>
      </Grid>
      <br /> <br />
    </Grid>
    <br />
    <br />
    {user._id===advert.creator ?
    <Grid container direction="row" justifyContent="space-evenly" alignItems="center">

      <PrimaryButton onClick={updateAd}>Update</PrimaryButton>
      
      <PrimaryButton onClick={open}>Remove</PrimaryButton>
      {isOpen &&
      <DeleteAdvertModal handleDelete={deleteAd} handleClose={close} open={open} />

      }
    </Grid>
    :null}
  </Grid>

</div>
)
}