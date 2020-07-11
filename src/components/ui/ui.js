
import styled from 'styled-components';

export const Paragraph = styled.p`
  font-size: ${({fontSize}) => fontSize || '16px'};
  color: ${({color}) => '#313131' || ''};
  margin: ${({margin}) => margin || '0'};
  padding: ${({padding}) => padding || '0'};
`;