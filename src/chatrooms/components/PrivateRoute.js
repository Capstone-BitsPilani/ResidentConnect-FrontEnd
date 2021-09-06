import React from 'react';
import { Redirect, Route } from 'react-router';
import { Container, Loader } from 'rsuite';
import { useProfile } from '../../context/profile.context';

const PriivateRoute = ({ children, ...routeProps }) => {
    const { profile, isLoading } = useProfile();
    if (isLoading && !profile) {
        return <Container>
            <Loader center vertical size="md" content="Loading" speed="slow" />
        </Container>
    }
    if (!isLoading && !profile) 
        return <Redirect to='/signin' />;
    
    return (
        <Route {...routeProps}> {children} </Route>
        );

}
export default PriivateRoute;