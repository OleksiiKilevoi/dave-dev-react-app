import React, { useState } from 'react';
import styled from 'styled-components';

import Chart from './Chart';
import ChartNumbers from './ChartNumbers';
import { IData } from '@/interfaces/data';

interface Props {
  data: IData[] | null,
}

const StatusChart:React.FC<Props> = ({ data }) => {
  const [lastTime, setLastTime] = useState(0);
  const setTime = (value: number) => {
    setLastTime(value);
  };
  return (
    <Wrap>
      <Header>
        <Text>Response time</Text>
        <Text>
          {lastTime}
          ms
        </Text>
      </Header>
      <ChartWrap>
        <Chart setTime={setTime} data={data} />
        <ChartNumbers data={data} />
      </ChartWrap>
    </Wrap>
  );
};

const Wrap = styled.div`
  
`;

const Header = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  color: #939db7;
  margin-bottom: 24px;
`;

const Text = styled.div`
  color: #939db7;
`;

const ChartWrap = styled.div`
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: flex-start;
`;

export default StatusChart;
