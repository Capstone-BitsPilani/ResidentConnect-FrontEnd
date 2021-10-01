import React, { useState } from "react";

import Dialog from "@material-ui/core/Dialog";

import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import {PrimaryButton}from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, reduxForm } from "redux-form";
import { renderRatingField, renderTextField } from "../../misc/form-fields";
import classifiedAPI from "../../misc/axios-calls/classifiedAPI";
import { Alert } from "../../shared/components/Alert";
import { useAlertState } from "../../misc/custom-hooks";
import { Progress } from "../../shared/components/Progress";
import { useProfile } from "../../context/profile.context";
import { calculateAverageStars } from "../../misc/helpers";

const validate = (formValues) => {
  const errors = {};
  const requiredFields = ["rating", "comment"];
  requiredFields.forEach((field) => {
    if (!formValues[field]) {
      errors[field] = "Required";
    }
  });

  return errors;
};

const AddReviewModel = (props) => {
  const classifiedid=props.classified._id;
  const ratings=props.classified.ratings;

  const { user } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const { isAlertOpen, openAlert, closeAlert } = useAlertState();
  const [alertMessage, setAlertMessage] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const editRatingDetails = async (rating) => {
    const reviewData = {};

    let _5star = parseInt(ratings._5star);
    let _4star = parseInt(ratings._4star);
    let _3star = parseInt(ratings._3star);
    let _2star = parseInt(ratings._2star);
    let _1star = parseInt(ratings._1star);
    let _totrating = parseInt(ratings._totrating);
    let _avgstar = parseFloat(ratings._avgstar);
    _totrating = _totrating + 1;

    // eslint-disable-next-line default-case
    switch (rating) {
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
        _4star = _4star + 1;
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
          setAlertMessage("comment is added");
          setAlertType("success");
          openAlert();
          props.setNewReview(true);
        }
      })
      .catch(function (error) {
        setIsLoading(false);
        setAlertMessage(error.message);
        setAlertType("error");
        openAlert();
      });
  };
  const addReviewComment = async (commentData) => {
    var apiBaseUrl = `/classifieds/comment/create`;

    await classifiedAPI
      .post(apiBaseUrl, commentData)
      .then(function (response) {
        if (response.status === 201) {
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
  const onSubmit = async (formValues) => {
    let data = formValues;
    data["comment"] = formValues.comment;
    data["rating"] = parseInt(formValues.rating);
    data["givenby"] = user._id;
    data["classifiedid"] = classifiedid;
    console.log(data);
    setIsLoading(true);
    await addReviewComment(data).then((response) => {
      editRatingDetails(data.rating);
    });
  };

  return (
    <Dialog  maxWidth='md' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">
        <SectionHeader> Write your review </SectionHeader>
      </DialogTitle>
      <DialogContent>
        <form onSubmit={props.handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="space-around" alignItems="center">
            <div >
              <Field name="rating" size="large"  sx={{width:'100px',height:'100px'}}  component={renderRatingField} />
            </div>

            <div>
              <Field style={{marginBottom:'20px',width:'800px'}} name="comment" id="comment" component={renderTextField} label="Comment" multiline rows={10} palceholder="enter comment" variant="outlined" />
            </div>
            <Grid container direction="row"  justifyContent="space-around" alignItems="center">
              <PrimaryButton  style={{marginTop:'20px',marginLeft:'20px'}} type="submit">Submit</PrimaryButton>
              <PrimaryButton style={{marginTop:'20px' ,marginLeft:'20px'}} onClick={props.handleClose}>
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

export default reduxForm({
  form: "inputCommentForm", // a unique identifier for this form
  validate,
})(AddReviewModel);