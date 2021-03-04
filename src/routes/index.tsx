import React from 'react';

import { Switch } from 'react-router-dom';
import Route from './Route';

import ErrorMessage from '../components/ErrorMessage';

import Login from '../pages/Login';
import Dashboard from '../pages/Dashboard';
import NewNaver from '../pages/NewNaver';

const Routes: React.FC = () => {
  return (
    <Switch>
      <Route path="/" exact component={Login} />
      <Route path="/dashboard" component={Dashboard} isPrivate />
      <Route path="/createNaver" component={NewNaver} isPrivate />
      <Route
        path="*"
        component={() => <ErrorMessage message="Está página não existe" />}
      />
    </Switch>
  );
};

export default Routes;
