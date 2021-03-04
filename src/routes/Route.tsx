import React from 'react';
import { RouteProps, Route as OldRoute, Redirect } from 'react-router-dom';
import { useAppSelector } from '../hooks/reduxHook';

interface RoutePropsInt extends RouteProps {
  isPrivate?: boolean;
  component: React.ComponentType;
}

const Route: React.FC<RoutePropsInt> = ({
  isPrivate = false,
  component: Component,
  ...rest
}) => {
  const user = useAppSelector(state => state.user);

  return (
    <OldRoute
      {...rest}
      render={({ location }) => {
        return isPrivate === !!user ? (
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
