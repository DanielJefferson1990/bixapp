import React, { useState, useEffect } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, FormText } from 'reactstrap';
import { isNumber, Translate, translate, ValidatedField, ValidatedForm } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { getEntity, updateEntity, createEntity, reset } from './user-account.reducer';
import { IUserAccount } from 'app/shared/model/user-account.model';
import { convertDateTimeFromServer, convertDateTimeToServer, displayDefaultDateTime } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import { useAppDispatch, useAppSelector } from 'app/config/store';

export const UserAccountUpdate = (props: RouteComponentProps<{ id: string }>) => {
  const dispatch = useAppDispatch();

  const [isNew] = useState(!props.match.params || !props.match.params.id);

  const userAccountEntity = useAppSelector(state => state.userAccount.entity);
  const loading = useAppSelector(state => state.userAccount.loading);
  const updating = useAppSelector(state => state.userAccount.updating);
  const updateSuccess = useAppSelector(state => state.userAccount.updateSuccess);
  const handleClose = () => {
    props.history.push('/user-account');
  };

  useEffect(() => {
    if (isNew) {
      dispatch(reset());
    } else {
      dispatch(getEntity(props.match.params.id));
    }
  }, []);

  useEffect(() => {
    if (updateSuccess) {
      handleClose();
    }
  }, [updateSuccess]);

  const saveEntity = values => {
    values.birthday = convertDateTimeToServer(values.birthday);

    const entity = {
      ...userAccountEntity,
      ...values,
    };

    if (isNew) {
      dispatch(createEntity(entity));
    } else {
      dispatch(updateEntity(entity));
    }
  };

  const defaultValues = () =>
    isNew
      ? {
          birthday: displayDefaultDateTime(),
        }
      : {
          ...userAccountEntity,
          birthday: convertDateTimeFromServer(userAccountEntity.birthday),
        };

  return (
    <div>
      <Row className="justify-content-center">
        <Col md="8">
          <h2 id="bixappApp.userAccount.home.createOrEditLabel" data-cy="UserAccountCreateUpdateHeading">
            <Translate contentKey="bixappApp.userAccount.home.createOrEditLabel">Create or edit a UserAccount</Translate>
          </h2>
        </Col>
      </Row>
      <Row className="justify-content-center">
        <Col md="8">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ValidatedForm defaultValues={defaultValues()} onSubmit={saveEntity}>
              {!isNew ? (
                <ValidatedField
                  name="id"
                  required
                  readOnly
                  id="user-account-id"
                  label={translate('global.field.id')}
                  validate={{ required: true }}
                />
              ) : null}
              <ValidatedField
                label={translate('bixappApp.userAccount.firstName')}
                id="user-account-firstName"
                name="firstName"
                data-cy="firstName"
                type="text"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.lastName')}
                id="user-account-lastName"
                name="lastName"
                data-cy="lastName"
                type="text"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.email')}
                id="user-account-email"
                name="email"
                data-cy="email"
                type="text"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.phoneNumber')}
                id="user-account-phoneNumber"
                name="phoneNumber"
                data-cy="phoneNumber"
                type="text"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.birthday')}
                id="user-account-birthday"
                name="birthday"
                data-cy="birthday"
                type="datetime-local"
                placeholder="YYYY-MM-DD HH:mm"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.address')}
                id="user-account-address"
                name="address"
                data-cy="address"
                type="text"
              />
              <ValidatedField
                label={translate('bixappApp.userAccount.password')}
                id="user-account-password"
                name="password"
                data-cy="password"
                type="text"
              />
              <Button tag={Link} id="cancel-save" data-cy="entityCreateCancelButton" to="/user-account" replace color="info">
                <FontAwesomeIcon icon="arrow-left" />
                &nbsp;
                <span className="d-none d-md-inline">
                  <Translate contentKey="entity.action.back">Back</Translate>
                </span>
              </Button>
              &nbsp;
              <Button color="primary" id="save-entity" data-cy="entityCreateSaveButton" type="submit" disabled={updating}>
                <FontAwesomeIcon icon="save" />
                &nbsp;
                <Translate contentKey="entity.action.save">Save</Translate>
              </Button>
            </ValidatedForm>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default UserAccountUpdate;
