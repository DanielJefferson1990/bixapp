import React, { useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
import { Translate, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity } from './user-account.reducer';
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserAccountDetail = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getEntity(props.match.params.id));
  }, []);

  const userAccountEntity = useAppSelector(state => state.userAccount.entity);
  return (
    <Row>
      <Col md="8">
        <h2 data-cy="userAccountDetailsHeading">
          <Translate contentKey="bixappApp.userAccount.detail.title">UserAccount</Translate>
        </h2>
        <dl className="jh-entity-details">
          <dt>
            <span id="id">
              <Translate contentKey="global.field.id">ID</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.id}</dd>
          <dt>
            <span id="firstName">
              <Translate contentKey="bixappApp.userAccount.firstName">First Name</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.firstName}</dd>
          <dt>
            <span id="lastName">
              <Translate contentKey="bixappApp.userAccount.lastName">Last Name</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.lastName}</dd>
          <dt>
            <span id="email">
              <Translate contentKey="bixappApp.userAccount.email">Email</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.email}</dd>
          <dt>
            <span id="phoneNumber">
              <Translate contentKey="bixappApp.userAccount.phoneNumber">Phone Number</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.phoneNumber}</dd>
          <dt>
            <span id="birthday">
              <Translate contentKey="bixappApp.userAccount.birthday">Birthday</Translate>
            </span>
          </dt>
          <dd>
            {userAccountEntity.birthday ? <TextFormat value={userAccountEntity.birthday} type="date" format={APP_DATE_FORMAT} /> : null}
          </dd>
          <dt>
            <span id="address">
              <Translate contentKey="bixappApp.userAccount.address">Address</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.address}</dd>
          <dt>
            <span id="password">
              <Translate contentKey="bixappApp.userAccount.password">Password</Translate>
            </span>
          </dt>
          <dd>{userAccountEntity.password}</dd>
        </dl>
        <Button tag={Link} to="/user-account" replace color="info" data-cy="entityDetailsBackButton">
          <FontAwesomeIcon icon="arrow-left" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.back">Back</Translate>
          </span>
        </Button>
        &nbsp;
        <Button tag={Link} to={`/user-account/${userAccountEntity.id}/edit`} replace color="primary">
          <FontAwesomeIcon icon="pencil-alt" />{' '}
          <span className="d-none d-md-inline">
            <Translate contentKey="entity.action.edit">Edit</Translate>
          </span>
        </Button>
      </Col>
    </Row>
  );
};

export default UserAccountDetail;
