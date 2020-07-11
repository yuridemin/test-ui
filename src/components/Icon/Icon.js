import React from 'react';
import styled from 'styled-components';

const StyledIcon = styled.span`
  width: ${({width}) => width || '20px'};
  height: ${({ height }) => height || '20px'};
  margin: ${({ margin }) => margin || '0'};
`;

const Icon = ({ width, height, name, margin, onClick}) => {
  const svg = require(`!raw-loader!./icons/${name}.svg`);
  
  return (
    <StyledIcon
      onClick={onClick}
      width={width}
      height={height}
      margin={margin}
      dangerouslySetInnerHTML={ { __html: svg.default } }
    />);
};



export default Icon;