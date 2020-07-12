import gql from 'graphql-tag';

export const GET_CONTACT_LIST = gql`
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
