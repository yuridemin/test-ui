import React, { useCallback } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';

import { Paragraph } from '../../ui/ui';
import Icon from '../../Icon/Icon';
import { useMemo } from 'react';

const DEFAULT_URL =
  'https://api.adorable.io/avatars/face/eyes4/nose3/mouth7/8e8895';

const ADORABLE_URL = 'https://api.adorable.io/avatars/120/';

const StyledContactList = styled.div`
  width: 400px;
  overflow: scroll;
  height: 90%;
  border-top: 1px solid #dcdcdc;
}






`;

const StyledItem = styled.div`
  cursor: pointer;
  height: 60px;
  margin: 5px 0;
  display: flex;
  align-items: center;
  position: relative;
  margin: 5px 0;
  &:hover {
    background: #eee;
  }
`;

const StyledAvatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 20px;
`;

const StyledIconContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  position: absolute;
  width: 100px;
  height: 20px;
  right: 20px;
  a {
    width: 50%;
  }
`;

const GET_CONTACT_LIST = gql`
  {
    contactList @client {
      id
      firstName
      lastName
      phone
      email
    }
  }
`;

const filterList = (data, searchValue) => {
  const value = searchValue.trim().toLowerCase();
  return data?.contactList?.filter((contact) => {
    return (
      contact.firstName.toLowerCase().indexOf(value) !== -1 ||
      contact.lastName.toLowerCase().indexOf(value) !== -1
    );
  });
};

const ContactList = ({ searchValue }) => {
  const { data, client } = useQuery(GET_CONTACT_LIST);
  const filteredContactList = useMemo(() => filterList(data, searchValue), [
    data,
    searchValue,
  ]);
  const handleItemClick = useCallback((e) => {
    console.log(e.target.dataset.id);
  }, []);

  return (
    <StyledContactList>
      {filteredContactList?.map((contact, index) => {
        const { firstName, lastName, phone, email } = contact;
        return (
          <StyledItem
            key={index + firstName}
            data-id={index}
            onClick={handleItemClick}
          >
            <StyledAvatar src={email ? ADORABLE_URL + email : DEFAULT_URL} />
            <Paragraph>{`${firstName} ${lastName}`}</Paragraph>
            <StyledIconContainer>
              {phone && (
                <a href={`tel:${phone}`}>
                  <Icon name="phone" />
                </a>
              )}
              {email && (
                <a href={`mailto:${email}?subject=testes..`}>
                  <Icon name="mail" />
                </a>
              )}
            </StyledIconContainer>
          </StyledItem>
        );
      })}
    </StyledContactList>
  );
};

export default ContactList;
