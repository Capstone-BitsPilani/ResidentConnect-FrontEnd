import React from 'react'
import Icon from '@material-ui/core/Icon';
import {Button} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

export const PrimaryButtonWithIcon = ({children}) => {
    return (
        <Button
        variant="contained"
        color="primary"   
        startIcon={<AddCircleOutlineIcon />}>{children}</Button>
    )
}
