import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { Paragraph } from '../ui/ui';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { GET_CONTACT_LIST } from '../../Apollo/Queries/contactListQueries';

import { SCREEN_INDEXES } from '../constants';

const StyledContactForm = styled.div``;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 30px 0;
  label {
    margin-bottom: 20px;
  }
  input {
    margin-left: 10px;
  }
  p {
    margin: 0;
    padding: 0;
  }
`;

const StyledCloseButton = styled.div`
  cursor: pointer;
  width: 20px;
  height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 10px;
  right: 10px;
`;

const ADD_CONTACT = gql`
  mutation AddContact(
    $firstName: String!
    $lastName: String!
    $email: String!
    $phone: String!
  ) {
    addContact(
      firstName: $firstName
      lastName: $lastName
      phone: $phone
      email: $email
    ) {
      id
      firstName
      lastName
      phone
      email
    }
  }
`;

const INITIAL_FORM_VALUES = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const ContactForm = ({ setCurrentScreenIndex }) => {
  const [formState, setFormState] = useState(INITIAL_FORM_VALUES);

  const [addContact, { loading: mutationLoading }] = useMutation(ADD_CONTACT, {
    update(cache, { data: { addContact } }) {
      const { contactList } = cache.readQuery({ query: GET_CONTACT_LIST });
      cache.writeQuery({
        query: GET_CONTACT_LIST,
        data: { contactList: contactList.concat([addContact]) },
      });
    },
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      try {
        addContact({ variables: formState });
        setCurrentScreenIndex(SCREEN_INDEXES.mainScreen);
        setFormState(INITIAL_FORM_VALUES);
      } catch (e) {
        console.error('it`s not your day');
      }
    },
    [addContact, formState, setCurrentScreenIndex]
  );

  const handleInputChange = useCallback((e) => {
    const itemName = e.target.name;
    const value = e.target.value;
    setFormState((prev) => ({ ...prev, [itemName]: value }));
  }, []);

  const handleCrossButton = useCallback(() => {
    setFormState(INITIAL_FORM_VALUES);
    setCurrentScreenIndex(SCREEN_INDEXES.mainScreen);
  }, [setCurrentScreenIndex]);

  const { firstName, lastName, phone, email } = formState;
  return (
    <StyledContactForm>
      {mutationLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <StyledCloseButton onClick={handleCrossButton}>
            &#10005;
          </StyledCloseButton>
          <Paragraph padding="40px 0 20px" fontSize="30px">
            New contact
          </Paragraph>
          <StyledForm onSubmit={handleSubmit}>
            <label>
              <p>First Name:</p>
              <input
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Last Name:</p>
              <input
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Phone:</p>
              <input
                type="text"
                name="phone"
                value={phone}
                onChange={handleInputChange}
              />
            </label>
            <label>
              <p>Email:</p>
              <input
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange}
              />
            </label>
            <input type="submit" value="Submit" />
          </StyledForm>
        </>
      )}
    </StyledContactForm>
  );
};

export default ContactForm;
