import React from 'react';
import styled from 'styled-components';

interface Props {
  data: {
    data: {
      statusCode: number | null;
      executionTime: number;
      executionTimeTag: string;
      createdAt: number;
    }[],
    status: number,
  }[]
}

const StatusBlocks:React.FC<Props> = ({
  data,
}) => (
  <Wrap>
    {data.map((d, index) => (
      d.status ? <Bar key={index} statusNum={d.status} /> : <EmptyBar key={index} />))}
  </Wrap>
);

const Wrap = styled.div`
  display: flex;
  height: 56px;
  width: 1080px;
  flex-direction: row;
  align-items: center;
  gap: 4px;
  margin-bottom: 40px;
`;

const Bar = styled.div<{ statusNum: number }>`
  height: 56px;
  width: 8px;
  border-radius: 4px;
  background-color: ${({ statusNum }) => {
    switch (statusNum) {
      case 3:
        return '#29b062';
        break;
      case 2:
        return '#fa9c34';
        break;
      case 1:
        return '#fc684e';
        break;
      default:
        break;
    }
    return 0;
  }};
`;

const EmptyBar = styled.div`
  height: 28px;
  width: 8px;
  border-radius: 4px;
  background-color: #939db7;
`;

export default StatusBlocks;
