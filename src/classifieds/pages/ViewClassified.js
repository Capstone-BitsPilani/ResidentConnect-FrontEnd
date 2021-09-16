import React from 'react'
import ClassifiedOverview from '../components/ClassifiedOverview';
import Divider from '@material-ui/core/Divider';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { ClassifiedDetails } from '../components/ClassifiedDetails';
import { ClassifiedReviews } from '../components/ClassifiedReviews';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { createStore, applyMiddleware, compose } from 'redux';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      
    
      {...other}
    >
      {value === index && (
       
          <Typography>{children}</Typography>
        
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));


export const ViewClassified = ({...props}) => {
  const classes = useStyles();
  const {classified}=props.location.state
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
    return (
        <>
          <ClassifiedOverview classified={classified}/>
          <Divider />
          <div >
      <div position="static" color="default">
        <Tabs  value={value} onChange={handleChange}>
          <Tab label="Description" id="description" />
          <Tab label="Reviews"  id="reviews" />
          
        </Tabs>
      </div>
      <TabPanel  id="description"  value={value} index={0}>
        <ClassifiedDetails classified={classified}/>
      </TabPanel>
      <TabPanel id="reviews" value={value} index={1}>
      <Provider store={store}>
       <ClassifiedReviews classified={classified}/>
       </Provider>
      </TabPanel>
     
    </div>
        </>
    )
}
