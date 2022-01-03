import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntities } from './user-account.reducer';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserAccount = (props: RouteComponentProps<{ url: string }>) => {
  const dispatch = useAppDispatch();

  const userAccountList = useAppSelector(state => state.userAccount.entities);
  const loading = useAppSelector(state => state.userAccount.loading);

  useEffect(() => {
    dispatch(getEntities({}));
  }, []);

  const handleSyncList = () => {
    dispatch(getEntities({}));
  };

  const { match } = props;

  return (
    <div>
      <h2 id="user-account-heading" data-cy="UserAccountHeading">
        <Translate contentKey="bixappApp.userAccount.home.title">User Accounts</Translate>
        <div className="d-flex justify-content-end">
          <Button className="mr-2" color="info" onClick={handleSyncList} disabled={loading}>
            <FontAwesomeIcon icon="sync" spin={loading} />{' '}
            <Translate contentKey="bixappApp.userAccount.home.refreshListLabel">Refresh List</Translate>
          </Button>
          <Link to={`${match.url}/new`} className="btn btn-primary jh-create-entity" id="jh-create-entity" data-cy="entityCreateButton">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="bixappApp.userAccount.home.createLabel">Create new User Account</Translate>
          </Link>
        </div>
      </h2>
      <div className="table-responsive">
        {userAccountList && userAccountList.length > 0 ? (
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="bixappApp.userAccount.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.firstName">First Name</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.lastName">Last Name</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.email">Email</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.phoneNumber">Phone Number</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.birthday">Birthday</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.address">Address</Translate>
                </th>
                <th>
                  <Translate contentKey="bixappApp.userAccount.password">Password</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {userAccountList.map((userAccount, i) => (
                <tr key={`entity-${i}`} data-cy="entityTable">
                  <td>
                    <Button tag={Link} to={`${match.url}/${userAccount.id}`} color="link" size="sm">
                      {userAccount.id}
                    </Button>
                  </td>
                  <td>{userAccount.firstName}</td>
                  <td>{userAccount.lastName}</td>
                  <td>{userAccount.email}</td>
                  <td>{userAccount.phoneNumber}</td>
                  <td>{userAccount.birthday ? <TextFormat type="date" value={userAccount.birthday} format={APP_DATE_FORMAT} /> : null}</td>
                  <td>{userAccount.address}</td>
                  <td>{userAccount.password}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${userAccount.id}`} color="info" size="sm" data-cy="entityDetailsButton">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userAccount.id}/edit`} color="primary" size="sm" data-cy="entityEditButton">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${userAccount.id}/delete`} color="danger" size="sm" data-cy="entityDeleteButton">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        ) : (
          !loading && (
            <div className="alert alert-warning">
              <Translate contentKey="bixappApp.userAccount.home.notFound">No User Accounts found</Translate>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default UserAccount;
