import React from 'react'
import { SectionHeader } from '../../shared/components/SectionHeader'
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Paper from  '@material-ui/core/Paper';
export const BillDetailsCard = ({...props}) => {
    return (
        <div>
            <Paper style={{width:'1000px'}}>
            <SectionHeader> Bill Details</SectionHeader>

     <Grid container alignItems="center" >
        <Grid style={{paddingLeft:"150px" , paddingTop:"50px"}} item xs={6} >
        <Typography  variant="body2" component="span">
         <span style={{fontWeight:'bold'}}> Community: </span> {props.bill.communityname}         
        </Typography>
        <br/>    <br/>    <br/>
        <Typography  variant="body2" component="span">
        <span style={{fontWeight:'bold'}}> Type:  </span> {props.bill.category} 
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}> Amount: </span>{props.bill.amt}
        <br/>    <br/>    <br/>
            
            </Typography>
                
           </Grid>
           <Grid  style={{ paddingTop:"50px"}} item xs={6}>
           <Typography   variant="body2" component="span">
           <span style={{fontWeight:'bold'}}> Apartment: </span> {props.bill.aptnum}         
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}>  Period:   </span> {props.bill.period} 
        </Typography>
        <br/>    <br/>    <br/>
        <Typography variant="body2" component="span">
        <span style={{fontWeight:'bold'}}>  Due Date: </span>{props.bill.dueat}
        <br/>    <br/>    <br/>
            
            </Typography>
                
               
           </Grid>
           
           </Grid>
    </Paper>
        </div>
    )
}