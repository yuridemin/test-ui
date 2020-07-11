import React, {useCallback, useState} from 'react';

import ContactList from './ContactList/ContactList';
import Search from './Search/Search';
import MainScreenHeader from './MainScreenHeader/MainScreenHeader';
import styled from 'styled-components';

const StyledMainScreen = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`;

const MainScreen = ({ handlePlusClick }) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = useCallback((e) => {
    setSearchValue(e.target.value);
  },[])

  return (
    <StyledMainScreen>
      <MainScreenHeader handlePlusClick={handlePlusClick}/>
      <Search searchValue={searchValue} handleSearchChange={handleSearchChange}/>
      <ContactList searchValue={searchValue}/>
    </StyledMainScreen>
  );
};

export default MainScreen;