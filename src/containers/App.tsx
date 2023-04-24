import React from 'react';
import styled from 'styled-components';
import Status from './Status';

const App = () => (
  <Wrap>
    <Status />
  </Wrap>
);

const Wrap = styled.div`
  background-color: #121826;
  height: 100vh;
`;

export default App;
