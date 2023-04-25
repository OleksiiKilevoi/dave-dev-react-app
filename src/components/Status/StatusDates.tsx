import React from 'react';
import styled from 'styled-components';

interface Props {
  days?: number[];
}

const StatusDates:React.FC<Props> = ({ days }) => (
  <Wrap>{days && days.map((d) => <Text>{new Date(d).toLocaleDateString()}</Text>)}</Wrap>
);

const Wrap = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 14px;
  width: 1020px;
  justify-content: space-between;
  height: 16px;
`;

const Text = styled.div`
  color: #939db7;  
`;

export default StatusDates;
