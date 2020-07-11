import React from 'react';
import styled from 'styled-components';

import { Paragraph } from '../../ui/ui'
import Icon from '../../Icon/Icon';


const StyledMainScreenHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

const MainScreenHeader = ({handlePlusClick}) => {
  return (
    <StyledMainScreenHeader> 
      <Paragraph fontSize='30px' margin='0 20px'>Contacts</Paragraph>
      <Icon onClick={handlePlusClick} name='plus' margin='0 20px' width='35px' height='35px'/>
    </StyledMainScreenHeader>
  );
};

export default MainScreenHeader;