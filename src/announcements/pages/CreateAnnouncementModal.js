import React, { useState } from "react";
import PrimaryButton from "../../shared/components/PrimaryButton";
import Grid from "@material-ui/core/Grid";
import { Field, FieldArray,reduxForm } from "redux-form";
import { renderRatingField, renderTextField, renderDateField,required } from "../../misc/form-fields";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { SectionHeader } from "../../shared/components/SectionHeader";
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import AnnouncementForm from "../components/AnnouncementForm";
import {useProfile} from "../../context/profile.context";
import {useCommunity} from "../../context/community.context";
import announcementAPI from '../../misc/axios-calls/announcementAPI';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const announcementStore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

export const CreateAnnouncementModal = ({...props}) => {
    const {user}=useProfile();
    const {community}=useCommunity();

    const createAnnouncement = async (data) => {
        var apiBaseUrl = `/announcements/create`
    
        await announcementAPI.post(apiBaseUrl, data)
          .then(function (response) {
            if (response.status === 201) {
    
              console.log(response.data);
              props.handleClose();
            }
    
          })
          .catch(function (error) {
            console.log(error);
        
    
    
          });
      }
       const onSubmit=(formValues)=>{
        
        const data={...formValues};
        data['createdby']=user._id;
        data['communityid']=community._id;
        console.log(data);
        createAnnouncement(data);
    }
    
    return (
        <Dialog  maxWidth='lg' fullWidth='true' open={props.open} onClose={props.handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <SectionHeader> Create Announcement </SectionHeader>
          <Provider store={announcementStore}>
                <AnnouncementForm handleClose={props.handleClose} onSubmit={onSubmit} />
          </Provider>
        </DialogTitle>
        <DialogContent>
        
        </DialogContent>
        </Dialog>
             
            
    )
}
