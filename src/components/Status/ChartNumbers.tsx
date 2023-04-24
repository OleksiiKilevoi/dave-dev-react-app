import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { IData } from '@/interfaces/data';

interface Props {
  data: IData[] | null,
}

const ChartNumbers:React.FC<Props> = ({ data }) => {
  const [numbers, setNumbers] = useState<number[]>([0]);
  const formatNumber = (num: number) => {
    if (num >= 1000000) {
      return `${(num / 1000000).toFixed(1)}kk`;
    } if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}k`;
    }
    return num.toString();
  };
  useEffect(() => {
    if (data) {
      const maxValue = Math.max(...data.map((o) => o.executionTime));
      const chunk = maxValue / 3;
      const nums = [];
      for (let i = 0; i < 4; i += 1) {
        nums.push(Math.round(maxValue - i * chunk));
      }
      setNumbers(nums);
    }
  }, [data]);
  return (
    <Wrap hasData={!!data}>
      {numbers.map((n, index) => <Text key={index}>{formatNumber(n)}</Text>)}
    </Wrap>
  );
};

const Wrap = styled.div<{ hasData: boolean }>`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: ${({ hasData }) => (hasData ? 'space-between' : 'end')};
  color: #939db7;
`;

const Text = styled.div`
  color: #939db7;
  font-size: 12px;
`;

export default ChartNumbers;
