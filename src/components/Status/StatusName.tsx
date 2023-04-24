import React from 'react';
import styled from 'styled-components';
import Badge from './Badge';

interface Props {
  title: string;
  status: string;
  uptime: number;
}

const StatusName:React.FC<Props> = ({
  title,
  status,
  uptime,
}) => (
  <Header>
    <Title>
      <Badge status={status} />
      {title}
    </Title>
    <Uptime>
      {uptime}
      % uptime
    </Uptime>
  </Header>
);

const Header = styled.div`
  display: flex;
  flex-direction: row;
  font-size: 16px;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 12px;
`;

const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 8px;
`;

const Uptime = styled.div`
  color: #939db7;
`;

export default StatusName;
