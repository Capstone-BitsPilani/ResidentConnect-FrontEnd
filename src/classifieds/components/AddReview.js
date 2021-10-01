import React from "react";
import { PrimaryButton } from "../../shared/components/PrimaryButton";
import { useModelState } from "../../misc/custom-hooks";
import { connect } from 'react-redux';
import AddReviewModel from "./AddReviewModel";
import { fetchCommentsAndUsers, fetchClassifieds, fetchClassifiedById } from '../actions';
import { useCommunity } from "../../context/community.context";
import Grid from '@material-ui/core/Grid';

export const AddReview = ({ ...props }) => {
  const { isOpen, open, close } = useModelState();
  const { community } = useCommunity();
  const createReview = () => {
    open();
  }
  const setNewReview = (data) => {
    props.fetchClassifieds(community._id);
    props.fetchClassifiedById(props.classified._id);
    props.fetchCommentsAndUsers(props.classified._id);
  }
  return (
    <div>
      <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
        <PrimaryButton style={{ marginTop: '25px', marginBottom: '25px', marginLeft: '1100px' }} onClick={createReview}> Write An Review</PrimaryButton>
      </Grid>
      {isOpen &&
        <AddReviewModel classified={props.classified} setNewReview={setNewReview} handleClose={close} open={open} />}
    </div>
  )
};
const mapStateToProps = state => {
  return { comments: state.comments };
};

export default connect(
  mapStateToProps,
  { fetchCommentsAndUsers, fetchClassifieds, fetchClassifiedById }
)(AddReview);