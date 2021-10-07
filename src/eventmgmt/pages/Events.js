import React from 'react'
import EventFilter from '../components/eventFilter'
import EventsList from "../components/EventsList"
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom'
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useCommunity } from '../../context/community.context';
import { useProfile } from '../../context/profile.context';
const Events = () => {
    const {user}=useProfile();
    const {communityList}=useCommunity();
    const userId=user._id;
    const history=useHistory();
    const addEvent=()=>
    {
        history.push('/addEvent');
    }
    return (
        <div ClassName="eventManagement" >
        <h1 style={{ color:"#3f51b5" }}>Events<Button
        variant="contained"
        style ={{backgroundColor:"#303f9f", color:"white",  position:"relative", left:"780px", }}
        startIcon={<AddCircleOutlineIcon />} onClick={addEvent}>Add Events</Button></h1>
        <EventFilter />
        <EventsList link="myevents" hostid={userId} heading="Hosted Events"/>
        { communityList.map((community)=>           
                    <>
                <EventsList link="city" cname={community.address.city} heading="Local Events"/>
                <EventsList link="community" cid= {community.id} cname={community.name} heading="Community Events" />
                    </>)        
        }
        </div>
    )
}

export default Events;
