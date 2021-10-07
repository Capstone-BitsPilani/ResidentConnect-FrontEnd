import React, {useEffect, useState} from "react";
import { useHistory } from 'react-router-dom';
import EventCard from "./EventCard.js"
import eventAPI from '../../misc/axios-calls/eventAPI';
const FilteredEventsList= (props) =>{
  const [events,setEvents]=useState([]);
  const history = useHistory();
  const getEventDetails=async(City,Type,Category)=>{ 
   
 
    // eslint-disable-next-line no-use-before-define
    var apiBaseUrl = "/events/allevents/search";
      
      let eventslist=[];
      await eventAPI.get(apiBaseUrl)
          .then(function (response) {
              if (response.status === 200) {
                  eventslist=response.data.events;
                  console.log(eventslist);
                  const filteredEvents=eventslist.filter(eventslist =>{
                    return ((eventslist.city===(City) || eventslist.mode===(Type)) || eventslist.category===(Category) );
                  })
                  setEvents(filteredEvents);

              }
             
              else {
                console.log("Error on Events retrieval");
            
            }

        })
       
        .catch(function (error) {
         
            console.log(error);
        });
      }

      useEffect(() => {
        getEventDetails(props.City,props.Type,props.Category);   
        
      }, [props.City,props.Type,props.Category])
  
return( 

        <section className="localEvents">
          <h2 style={{ color:"#3f51b5" }} >{props.heading} </h2>
          <div className="eventList" style={{ display: "flex", flexDirection: "row",   }}>
          { events.map(event=>(
                   <div>
                         <EventCard eventDetails={event} Category={props.Category} Type={props.Type} City={props.City} />
                   </div>
            ))}
          </div>
        </section>
    );
  }

export default FilteredEventsList;