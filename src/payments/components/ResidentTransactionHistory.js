import React,{useEffect} from 'react'
import { connect } from 'react-redux';
import {fetchPaymentHistoryOfApartment} from '../actions';
import { useApartment } from '../../context/apartment.context';
import ResidentTransactionHistoryTable from '../components/ResidentTransactionHistoryTable';


export const ResidentTransactionHistory = ({...props}) => {
    const {apartment}=useApartment();
    const apartmentid=apartment._id;
    //const apartmentid=user.apartments[0].apartmentid;
     useEffect(() => {
         props.fetchPaymentHistoryOfApartment(apartmentid);
         
     }, [])
     return (
        
        <div>
           {props.payments.length===0 && <div> No Transactions </div>}
           {props.payments.length>0 && <ResidentTransactionHistoryTable payments={props.payments}/> }
            
        </div>
    )
}
const mapStateToProps = state => {
    return { payments: state.payments
    };
  };
  
export default connect(
    mapStateToProps,
    { fetchPaymentHistoryOfApartment }
  )(ResidentTransactionHistory);
  
