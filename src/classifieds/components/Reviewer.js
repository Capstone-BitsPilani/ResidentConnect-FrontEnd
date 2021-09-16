import React from 'react';
import { connect } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import { makeStyles } from '@material-ui/core/styles';




class Reviewer extends React.Component {
  
  render() {

    const { user } = this.props;

    if (!user) {
      return <div>{this.props.createdat}</div>;
    }

    return (
        <div>
             <Avatar alt={user.firstname} src={user.avatar} style={{  width: 100  ,height :100}}/>
    <div style={{fontSize:'16px', color:'grey'}}>{user.firstname} {user.lastname} </div>
    <div>{this.props.createdat}
    </div>
    </div>)
    ;
  }
}

const mapStateToProps = (state, ownProps) => {
  return { user: state.users.find(user => user._id === ownProps.userId) };
};

export default connect(mapStateToProps)(Reviewer);