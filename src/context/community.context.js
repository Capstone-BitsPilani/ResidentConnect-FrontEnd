import React,{ useEffect,createContext,useContext,useState } from "react";
import { auth } from "../misc/firebase";
import axios from "axios";
import { useProfile } from "./profile.context";

const CommunityContext=createContext();
export const CommunityProvider=({children})=>{
    const {user,setIsLoading}=useProfile();
    const[community,setCommunity]=useState(null);
    const[communityList,setCommunityList]=useState([]);
 
    

   const getCommunityDetails=async (communityId)=>{
       console.log(communityId);
    var apiBaseUrl = `http://localhost:4000/api/community/${communityId}`;
    let communityinfo=null;

  
 
  
    const data=await axios.get(apiBaseUrl )
         .then(function (response) {
             if (response.status === 200)
            {           
              
             communityinfo=response.data;
                if(communityinfo!=null)
                {
             

                 const communitydata={
                    id:communityinfo._id,
                    name:communityinfo.name,
                    builder:communityinfo.builder,
                  
                }
                return communitydata;  
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
    const setCommunitydetail= (communityIds)=>{
       console.log(communityIds);
       if(communityIds==null)
        return;
         communityIds.map( async(communityId)=>{
        console.log(communityId);
        const communitydata=await getCommunityDetails(communityId);
        console.log(communitydata);
        if(communitydata!=null)
        setCommunityList(communityList => [...communityList, communitydata]);

        });
        console.log(communityList);
        if(communityList!=null)
               setCommunity(communityList[0]);
    }
  
    useEffect(()=>{

 
        const authUnsub=auth.onAuthStateChanged(authObj=>{
            if(authObj)
            {
                if(user!=null && user.communities!=null)
                setCommunitydetail(user.communities)              
               
            }
            else
            {
                setCommunitydetail([]);               

            }

        });
        return ()=>{
            authUnsub();
        }
    },[user])

    return (
    <CommunityContext.Provider value={{community,communityList}}> {children} </CommunityContext.Provider>);

}

export const useCommunity= ()=>useContext(CommunityContext);