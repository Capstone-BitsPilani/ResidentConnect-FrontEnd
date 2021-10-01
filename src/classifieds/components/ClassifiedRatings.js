import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Rating from '@material-ui/lab/Rating';
import ProgressBar from '../../shared/components/ProgressBar';


export const ClassifiedRatings = ({...props}) => {
  
    const renderAverageRatingCard=()=>
{
    if(props.comments==null)
        return null
    const ratings=props.classified.ratings;
    let avgRatings = props.comments.reduce(function (sum, comment) {
      return sum + parseInt(comment.rating);
    }, 0.0) / props.comments.length;
    console.log(avgRatings);
    avgRatings=Math.round(avgRatings,1).toFixed(1);
    console.log(avgRatings);
return(
<Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
  <div style={{marginTop:'50px', fontSize:"48px",color:'blue'}}> {avgRatings}/5</div>
  <Rating name="avgrating" precision={0.5} value={avgRatings} readOnly style={{marginTop:'50px' ,marginBottom:'50px',fontSize:"48px"}} />
</Grid>
)

}
const renderRatingCard=()=>
{
    if(props.comments==null)
    return null
    const comments=props.comments;

    let _totrating,_5star_percent=0,_4star_percent=0,_3star_percent=0,_2star_percent=0,_1star_percent=0;
    
    _totrating=comments.length;
    let _5star=comments.filter(comment=>comment.rating===5).length;
    let _4star=comments.filter(comment=>comment.rating===4).length;
    let _3star=comments.filter(comment=>comment.rating===3).length;
    let _2star=comments.filter(comment=>comment.rating===2).length;
    let _1star=comments.filter(comment=>comment.rating===1).length;

    
    if(_totrating!==0)
    {
   _5star_percent=Math.round(((_5star/_totrating)*100),1);
   _4star_percent=Math.round(((_4star/_totrating)*100),1);
   _3star_percent=Math.round(((_3star/_totrating)*100),1);
   _2star_percent=Math.round(((_2star/_totrating)*100),1);
   _1star_percent=Math.round(((_1star/_totrating)*100),1);
    }
    
return(
    <Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
    <Grid  container direction="row" style={{  marginTop:'50px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>5 stars</span>
   <ProgressBar bgcolor="orange" progress={_5star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({_5star})</span>
    </Grid>
    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>4 stars</span>
   <ProgressBar bgcolor="orange" progress={_4star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({_4star})</span>
    </Grid>
    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>3 stars</span>
   <ProgressBar bgcolor="orange" progress={_3star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({_3star})</span>
    </Grid>

    <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>2 stars</span>
   <ProgressBar bgcolor="orange" progress={_2star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({_2star})</span>
    </Grid>

    <Grid  container direction="row" style={{  marginTop:'5px', marginBottom:'60px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
    <span style={{fontSize:"14px", color:"gray"}}>1 stars</span>
   <ProgressBar bgcolor="orange" progress={_1star_percent} height={8} /> 
    <span style={{fontSize:"14px", color:"gray"}}> ({_1star})</span>
    </Grid>
     </Grid>
)
}

// const renderRatingCard=()=>
// {
//     if(props.classified==null)
//     return null
//     const ratings=props.classified.ratings;
//     let _5star_percent=0,_4star_percent=0,_3star_percent=0,_2star_percent=0,_1star_percent=0;
//     if(ratings._totrating!==0)
//     {
//    _5star_percent=Math.round(((ratings._5star/ratings._totrating)*100),1);
//    _4star_percent=Math.round(((ratings._4star/ratings._totrating)*100),1);
//    _3star_percent=Math.round(((ratings._3star/ratings._totrating)*100),1);
//    _2star_percent=Math.round(((ratings._2star/ratings._totrating)*100),1);
//    _1star_percent=Math.round(((ratings._1star/ratings._totrating)*100),1);
//     }
    
// return(
//     <Grid style={{marginTop:'50px'}} container direction="column" justifyContent="space-evenly" alignItems="center">
//     <Grid  container direction="row" style={{  marginTop:'50px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
//     <span style={{fontSize:"14px", color:"gray"}}>5 stars</span>
//    <ProgressBar bgcolor="orange" progress={_5star_percent} height={8} /> 
//     <span style={{fontSize:"14px", color:"gray"}}> ({ratings._5star})</span>
//     </Grid>
//     <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
//     <span style={{fontSize:"14px", color:"gray"}}>4 stars</span>
//    <ProgressBar bgcolor="orange" progress={_4star_percent} height={8} /> 
//     <span style={{fontSize:"14px", color:"gray"}}> ({ratings._4star})</span>
//     </Grid>
//     <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
//     <span style={{fontSize:"14px", color:"gray"}}>3 stars</span>
//    <ProgressBar bgcolor="orange" progress={_3star_percent} height={8} /> 
//     <span style={{fontSize:"14px", color:"gray"}}> ({ratings._3star})</span>
//     </Grid>

//     <Grid  container direction="row" style={{  marginTop:'5px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
//     <span style={{fontSize:"14px", color:"gray"}}>2 stars</span>
//    <ProgressBar bgcolor="orange" progress={_2star_percent} height={8} /> 
//     <span style={{fontSize:"14px", color:"gray"}}> ({ratings._2star})</span>
//     </Grid>

//     <Grid  container direction="row" style={{  marginTop:'5px', marginBottom:'60px', marginLeft:'50px'}} justifyContent="flex-start" alignItems="flex-start">
//     <span style={{fontSize:"14px", color:"gray"}}>1 stars</span>
//    <ProgressBar bgcolor="orange" progress={_1star_percent} height={8} /> 
//     <span style={{fontSize:"14px", color:"gray"}}> ({ratings._1star})</span>
//     </Grid>
//      </Grid>
// )
// }
    return (

       <div> 
           <Grid container spacing={3}>
        <Grid item xs={6}>
          <Paper>    {renderAverageRatingCard()}  </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper>{renderRatingCard()}</Paper>
        </Grid>
      </Grid>
      </div>
    )
}
