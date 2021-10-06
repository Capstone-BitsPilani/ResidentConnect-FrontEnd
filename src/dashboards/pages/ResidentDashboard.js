import React from 'react'
import { useProfile } from '../../context/profile.context'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';
import PollingSection  from '../components/PollingSection';
import GridItem from "../../shared/components/Grid/GridItem.js";
import GridContainer from "../../shared/components/Grid/GridContainer.js";
import { UserInfo } from '../components/UserInfo';
import  AnnouncementSection  from '../components/AnnouncementSection';
import UserSection from '../components/UserSection';
import { useCommunity } from '../../context/community.context';
import { useApartment } from '../../context/apartment.context';
import {ResidentHelpDeskSection} from '../components/ResidentHelpDeskSection';
import ResidentPaymentSection from '../components/ResidentPaymentSection';
import MyRideRequestTab from '../components/MyRideRequestTab';
import CarPoolTabs  from "../../shared/components/Tabs/CarPoolTabs";
import RideRequestForMyRideTab from '../components/RideRequestForMyRideTab';
import { Button,Grid } from '@material-ui/core';
import DummyResidentDashboard from './DummyResidentDashboard';
import {useModelState} from '../../misc/custom-hooks';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const dashboardstore = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

const ResidentDashboard = () => {
  const {user}=useProfile();
  const {community}=useCommunity();
  const {apartment}=useApartment();
  const { isOpen, open, close } = useModelState();

  const renderData=()=>{
    if(community===null && user === null && apartment===null )
      return(null);
    
    return(
      <Provider store={dashboardstore}>
       <Grid
        container
        direction="row"
        justifyContent="flex-end"
        alignItems="center"
      >
       <Button onClick={open}> For Developers </Button>
       
      {isOpen && 
      <DummyResidentDashboard handleClose={close} open={open}/>}
      </Grid>
      <UserInfo/>

 
  <GridContainer>
  <GridItem xs={12} sm={12} md={6}>
        <UserSection/>

      </GridItem>
      <GridItem xs={12} sm={12} md={6}>
        <ResidentHelpDeskSection  />

      </GridItem>
       <GridItem xs={12} sm={12} md={6}>
            <AnnouncementSection   />
        </GridItem>
  <GridItem xs={12} sm={12} md={6}>
            <PollingSection   userid={user._id} />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
            <ResidentPaymentSection    />
        </GridItem>
  <GridItem xs={12} sm={12} md={6}>
  <CarPoolTabs
            title="Car Pooling:"
            headerColor="primary"
            tabs={[
              {
                tabName: "My Requests",
              
                tabContent: (
                    <MyRideRequestTab />
                ),
              },
              {
                tabName: "Received Requests",
               
                tabContent: (
                    <RideRequestForMyRideTab />
                ),
              }
              
            ]}
          />
        </GridItem>
  </GridContainer>
  </Provider>
    )
  }
   return (
    <>
     {renderData()}
     </>
)
}

export default ResidentDashboard
