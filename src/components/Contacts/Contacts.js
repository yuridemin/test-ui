import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import gql from 'graphql-tag';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { useEffect } from 'react';

import MainScreen from '../MainScreen/MainScreen';
import ContactForm from '../ContactForm/ContactForm';

import { SCREEN_HEIGHT, SCREENS_NUMBER, SCREEN_INDEXES } from '../constants';

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
      id
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

  useEffect(() => {
    const contactList = data?.contacts?.map(contact => ({
      ...contact,
      __typename: 'Contact',
    }));
    console.log(contactList);
    client.writeData({ data: { contactList } });
  }, [client, data]);

  const handlePlusClick = () => {
    setCurrentScreenIndex(SCREEN_INDEXES.contactForm);
  };

  return (
    <StyledContacts>
      <StyledScreensWrapper bottom={currentScreenIndex * SCREEN_HEIGHT}>
        <StyledScreen>
          <ContactForm setCurrentScreenIndex={setCurrentScreenIndex}/>
        </StyledScreen>
        <StyledScreen>
          {loading ?
            <div>Loading..</div> :
            <MainScreen
            handlePlusClick={handlePlusClick} />}
        </StyledScreen>
        <StyledScreen />
      </StyledScreensWrapper>
    </StyledContacts>
  );
};

export default Contacts;
