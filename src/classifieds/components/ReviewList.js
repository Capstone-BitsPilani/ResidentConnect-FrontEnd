import React from 'react'
import { connect } from 'react-redux';
import {ReviewCard} from './ReviewCard';
import { fetchCommentsAndUsers,fetchClassifiedById } from '../actions';
import Divider from '@material-ui/core/Divider';
import { calculateAverageStars } from "../../misc/helpers";
import classifiedAPI from "../../misc/axios-calls/classifiedAPI";

export const ReviewList =({...props}) => {
  const classifiedid=props.classified._id;

  const editRatingDetails= async (rating) =>{
    const reviewData = {};
    const ratings=props.classified.ratings;
    let _5star = parseInt(ratings._5star);
    let _4star = parseInt(ratings._4star);
    let _3star = parseInt(ratings._3star);
    let _2star = parseInt(ratings._2star);
    let _1star = parseInt(ratings._1star);
    let _totrating = parseInt(ratings._totrating);
    let _avgstar = parseFloat(ratings._avgstar);

    // eslint-disable-next-line default-case
    switch (rating) {
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
    _totrating=_totrating-1
    
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
          console.log("edited the rating details")
          props.fetchClassifiedById(classifiedid);
          props.fetchCommentsAndUsers(classifiedid);
        }
      })
      .catch(function (error) {
        console.log(error)
      });
  };
  const  deleteReviewComment=async(commentid,rating) =>{
    console.log(rating);
    var apiBaseUrl = `/classifieds/comments/${commentid}`;

    await classifiedAPI
      .delete(apiBaseUrl)
      .then(function (response) {
        if (response.status === 200) {
          //editRatingDetails(rating)
          props.fetchClassifiedById(classifiedid);
          props.fetchCommentsAndUsers(classifiedid)
        }
      })
      .catch(function (error) {
        console.log(error);
     
      });
  };
   
  const renderList=()=> {
    return props.comments.map((comment) => {
      return ( <div style={{paddingBottom:'20px'}}>
          <ReviewCard deleteReviewComment={deleteReviewComment} classified={props.classified} comment={comment} />
          <Divider/>
          </div> )
        })
  }


    return (<div>
            {renderList()}
            
        </div>);
}

const mapStateToProps = state => {
     return { classified: state.classified,
      comments: state.comments };
};

export default connect(
  mapStateToProps,
  { fetchClassifiedById,fetchCommentsAndUsers }

)(ReviewList);
