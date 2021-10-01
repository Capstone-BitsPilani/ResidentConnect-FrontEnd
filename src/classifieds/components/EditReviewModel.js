import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";

import classifiedAPI from "../../misc/axios-calls/classifiedAPI";
import { Alert } from "../../shared/components/Alert";
import { useAlertState } from "../../misc/custom-hooks";
import { Progress } from "../../shared/components/Progress";
import { calculateAverageStars } from "../../misc/helpers";
import { TextField } from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { connect } from 'react-redux';
import { fetchCommentsAndUsers,fetchClassifiedById } from '../actions';

export const EditReviewModel = (props) => {
  const ratings=props.classified;
  const{comment,rating,classifiedid,_id}=props.givenComment;

  const [isLoading, setIsLoading] = useState(false);
  const { isAlertOpen, openAlert, closeAlert } = useAlertState();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [newComment,setNewComment]=React.useState(comment);
  const [newRating,setnewRating]=React.useState(rating);

  const editRatingDetails = async (oldrating,newrating) => {
    const reviewData = {};

    let _5star = parseInt(ratings._5star);
    let _4star = parseInt(ratings._4star);
    let _3star = parseInt(ratings._3star);
    let _2star = parseInt(ratings._2star);
    let _1star = parseInt(ratings._1star);
    let _totrating = parseInt(ratings._totrating);
    let _avgstar = parseFloat(ratings._avgstar);

    // eslint-disable-next-line default-case
    switch (oldrating) {
      case 1:
        _1star = _1star - 1;
        break;
      case 2:
        _2star = _2star - 1;
        break;
      case 3:
        _3star = _3star - 1;
        break;
      case 4:
        _4star = _4star - 1;
        break;
      case 5:
        _5star = _5star - 1;
        break;
    }
      // eslint-disable-next-line default-case
    switch (newrating) {
      case 1:
        _1star = _1star + 1;
        break;
      case 2:
        _2star = _2star + 1;
        break;
      case 3:
        _3star = _3star + 1;
        break;
      case 4:
        _4star = _4star +  1;
        break;
      case 5:
        _5star = _5star + 1;
        break;
    }
    _avgstar = calculateAverageStars(
      _1star,
      _2star,
      _3star,
      _4star,
      _5star,
      _totrating
    );
    console.log(_avgstar);
    reviewData["_1star"] = _1star;
    reviewData["_2star"] = _2star;
    reviewData["_3star"] = _3star;
    reviewData["_4star"] = _4star;
    reviewData["_5star"] = _5star;
    reviewData["_avgstar"] = _avgstar;
    reviewData["_totrating"] = _totrating;
    const data = {
      ratings: reviewData,
    };
    var apiBaseUrl = `/classifieds/${classifiedid}`;

    await classifiedAPI
      .put(apiBaseUrl, data)
      .then(function (response) {
        if (response.status === 200) {
          setIsLoading(false);
          props.handleClose();
          setAlertMessage("comment is esited");
          setAlertType("success");
          openAlert();
          props.fetchClassifiedById(classifiedid);
          props.fetchCommentsAndUsers(classifiedid);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setAlertMessage(error.message);
        setAlertType("error");
        openAlert();
      });
  };
  const editReviewComment = async (commentData) => {
    var apiBaseUrl = `/classifieds/comments/${_id}`;

    await classifiedAPI
      .put(apiBaseUrl, commentData)
      .then(function (response) {
        if (response.status === 200) {
          console.log(response.data);
          return response;
        }
      })
      .catch(function (error) {
        console.log(error);
        setIsLoading(false);
        setAlertMessage(error.message);
        setAlertType("error");
        openAlert();
      });
  };
  const onSubmit = async (event) => {
    event.preventDefault();
    let data={};
    data["comment"] = newComment;
    data["rating"] = newRating
   
    console.log(data);
    setIsLoading(true);
    await editReviewComment(data).then((response) => {
      //editRatingDetails(rating,data.rating);
      props.fetchClassifiedById(classifiedid);
          props.fetchCommentsAndUsers(classifiedid)
          setIsLoading(false);
          props.handleClose();
          setAlertType("success");
          openAlert();  
    });
  };

  return (
    <Dialog  fullWidth='true'  maxWidth='md' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <SectionHeader> Write your review </SectionHeader>
      </DialogTitle>
      <DialogContent>
        <form >
          <Grid container direction="column" justifyContent="space-around" alignItems="center">
            <div>
              <Rating name="rating"  value={newRating} onChange={(e)=>{setnewRating(e.target.value)}} />
            </div>

            <div>
              <TextField  style={{width:"800px"}} name="comment" value={newComment} id="comment" label="Comment" multiline rows={10} palceholder="enter comment"
               variant="outlined" onChange={(e)=>{setNewComment(e.target.value)}}  />
            </div>
            <Grid container direction="row" justifyContent="space-around" alignItems="center">
              <PrimaryButton onClick={onSubmit} >Submit</PrimaryButton>
              <PrimaryButton onClick={props.handleClose}>
                {" "}
                Cancel{" "}
              </PrimaryButton>
            </Grid>
          </Grid>
        </form>
      </DialogContent>
      {isLoading ? <Progress /> : null}
      {isAlertOpen ? (
        <Alert open={isAlertOpen} handleClose={closeAlert} type={alertType}>
          {alertMessage}
        </Alert>
      ) : null}
    </Dialog>
  );
};

const mapStateToProps = state => {
  console.log(state.classified) ;
     return { classified: state.classified,
      comments: state.comments };
};

export default connect(
  mapStateToProps,
  { fetchClassifiedById,fetchCommentsAndUsers }

)(EditReviewModel);
