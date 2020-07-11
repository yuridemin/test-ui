import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import MainScreen from '../MainScreen/MainScreen';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useEffect } from 'react';

const SCREEN_HEIGHT = 500;
const SCREENS_NUMBER = 3;
const SCREEN_INDEXES = {
  contactForm: 0,
  mainScreen: 1,
  contactProfile: 2,
};

const SCREENS_WRAPPER_HEIGHT = SCREEN_HEIGHT * SCREENS_NUMBER;

const StyledContacts = styled.div`
  width: 400px;
  height: ${SCREEN_HEIGHT + 'px'};
  overflow: hidden;
  box-shadow: 0 0 15px -2px #444444;
  margin: 30px;
`;

const StyledScreensWrapper = styled.div`
  height: ${SCREENS_WRAPPER_HEIGHT + 'px'};
  bottom: ${({ bottom }) => bottom + 'px'};
  position: relative;
  transition: bottom 0.3s ease-in-out;
`;

const StyledScreen = styled.div`
  height: ${SCREEN_HEIGHT + 'px'};
`;

const GET_CONTACT_LIST = gql`
  {
    contacts {
      firstName
      lastName
      phone
      email
    }
  }
`;

const Contacts = () => {
  const client = useApolloClient();
  const [currentScreenIndex, setCurrentScreenIndex] = useState(
    SCREEN_INDEXES.mainScreen
  );
  const { loading, error, data } = useQuery(GET_CONTACT_LIST);

  const handlePlusClick = () => {
    setCurrentScreenIndex(SCREEN_INDEXES.contactForm);
  };

  useEffect(() => {
    const contactList = data?.contacts?.map((contact, id) => ({
      ...contact,
      id,
      __typename: 'Contact',
    }));
    console.log(contactList);
    client.writeData({ data: { contactList } });
  }, [client, data]);

  return (
    <StyledContacts>
      <StyledScreensWrapper bottom={currentScreenIndex * SCREEN_HEIGHT}>
        <StyledScreen />
        <StyledScreen>
          <MainScreen
            handlePlusClick={handlePlusClick} />
        </StyledScreen>
        <StyledScreen />
      </StyledScreensWrapper>
    </StyledContacts>
  );
};

export default Contacts;
