import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import UserAccount from './user-account';
import UserAccountDetail from './user-account-detail';
import UserAccountUpdate from './user-account-update';
import UserAccountDeleteDialog from './user-account-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={UserAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={UserAccountUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={UserAccountDetail} />
      <ErrorBoundaryRoute path={match.url} component={UserAccount} />
    </Switch>
    <ErrorBoundaryRoute exact path={`${match.url}/:id/delete`} component={UserAccountDeleteDialog} />
  </>
);

export default Routes;
