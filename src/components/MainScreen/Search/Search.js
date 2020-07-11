import React from 'react';
import styled from 'styled-components';

const StyledSearch = styled.div`
   
    
`;

const StyledInput = styled.input`
  border: 1px solid;
    border-radius: 5px;
    height: 40px;
    margin: 10px 20px 15px;
    border-bottom: 1px solid;
    width: 90%;
  
`;

const Search = ({handleSearchChange, searchValue}) => {
  return (
    <StyledSearch>
      <StyledInput onChange={handleSearchChange} value={searchValue} type="text"/>
    </StyledSearch>
  );
};

export default Search;