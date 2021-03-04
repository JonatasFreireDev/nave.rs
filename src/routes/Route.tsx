import React from 'react';
import { RouteProps, Route as OldRoute, Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';
import NavBar from '../components/NavBar';

interface RoutePropsInt extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RoutePropsInt> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const isSignIn = useAppSelector(state => state.user.isSignIn);

  return (
    <OldRoute
      {...rest}
      render={({ location }) => {
        // eslint-disable-next-line no-nested-ternary
        return isPrivate && isSignIn ? (
          <NavBar>
            <Component />
          </NavBar>
        ) : !isPrivate === !isSignIn ? (
          <Component />
        ) : (
          <Redirect
            to={{
              pathname: isPrivate ? '/' : '/dashboard',
              state: { from: location },
            }}
          />
        );
      }}
    />
  );
};

export default Route;
