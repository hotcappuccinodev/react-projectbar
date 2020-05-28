import React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import * as H from 'history';

import Dashboard from 'Dashboard';
import Projects from 'Projects';
import Project from 'Projects/Project';
import Login from 'Auth';

type RoutesProps = {
  history: H.History;
};

const Routes = ({ history }: RoutesProps) => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Route exact path="/" component={Dashboard} />
    <Route exact path="/projects" component={Projects} />
    <Route path="/projects/:projectID" component={Project} />
  </Switch>
);

export default Routes;
