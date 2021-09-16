import React,{ useEffect,createContext,useContext,useState } from "react";
import { auth } from "../misc/firebase";
import axios from "axios";
import { useProfile } from "./profile.context";
import { useCommunity } from "./community.context";

const ApartmentContext=createContext();
export const ApartmentProvider=({children})=>{
    const {user}=useProfile();
    const {community,communityList}= useCommunity();

    const[apartment,setApartment]=useState(null);
    const[apartmentList,setApartmentList]=useState([]);
 
    

   const getApartmentDetails=async (communityId,apartmentid)=>{
       console.log(apartmentid);
    var apiBaseUrl = `http://localhost:4000/api/community/${communityId}/apartment/${apartmentid}`;
    let apartmentInfo=null;

  
 
  
    const data=await axios.get(apiBaseUrl )
         .then(function (response) {
             if (response.status === 200)
            {           
              
                apartmentInfo=response.data;
                if(apartmentInfo!=null)
                {
             

                 const apartmentdata={
                    id:apartmentInfo._id,
                    communityid:apartmentInfo.communityid,
                    aptnum:apartmentInfo.aptnum,
                    block:apartmentInfo.block,
                    floor:apartmentInfo.floor,
                    issold:apartmentInfo.issold,
                    status:apartmentInfo.status,
                    enrolled:apartmentInfo.enrolled
                }
                return apartmentdata;  
                }     
               
                
                return null;
             
             }
       
         })
         .catch(function (error) {
             console.log(error);
             return(null);

         });
         return data;
        }
    const setApartmentDetail= (apartments)=>{
       console.log(apartments);
       if(apartments==null)
        return;
        apartments.map( async(apartment)=>{
        console.log(apartment.apartmentid)
        console.log(apartment.communityid)

        const apartmentdata=await getApartmentDetails(apartment.communityid,apartment.apartmentid);
        console.log(apartmentdata);
        if(apartmentdata!=null)
        setApartmentList(apartmentList => [...apartmentList, apartmentdata]);

        });
        console.log(apartmentList);
        if(apartmentList!=null)
               setApartment(apartmentList[0]);
    }
  
    useEffect(()=>{

 
        const authUnsub=auth.onAuthStateChanged(authObj=>{
            if(authObj)
            {
                if(user!=null && user.type=='resident'  && user.apartments!=null)
                setApartmentDetail(user.apartments)              
               
            }
            else
            {
                setApartmentDetail([]);               

            }

        });
        return ()=>{
            authUnsub();
        }
    },[])

    return (
    <ApartmentContext.Provider value={{apartment,setApartment,apartmentList}}> {children} </ApartmentContext.Provider>);

}

export const useApartment= ()=>useContext(ApartmentContext);