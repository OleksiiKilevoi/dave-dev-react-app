import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

import StatusName from '@/components/Status/StatusName';
import StatusBlocks from '@/components/Status/StatusBlocks';
import StatusChart from '@/components/Status/StatusChart';
import { IData, IStats } from '@/interfaces/Data';

const Status = () => {
  const [uptime, setUptime] = useState(0);
  const [stats, setStats] = useState<IStats[]>([]);
  const [state, setState] = useState({
    status: 'success',
    data: [],
  });
  const [chartData, setChartData] = useState<IData[] | null>(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}?limit=720`, {
    }).then(({ data }) => {
      setState({
        title: 'API',
        ...data,
      });
    });
  }, []);

  const getStatus = (arr: {
    statusCode: number | null;
    executionTime: number;
    executionTimeTag: string;
    createdAt: number;
  }[]) => {
    let successNum = 0;
    let errorsNum = 0;
    arr.forEach((a) => {
      if (a.statusCode === 200) {
        successNum += 1;
      }
      if (a.statusCode !== 200 && a.statusCode !== null) {
        errorsNum += 1;
      }
    });
    if (successNum === 0 && errorsNum === 0) {
      return 0;
    }
    if (successNum === successNum + errorsNum) {
      return 3;
    }
    if (successNum >= errorsNum && successNum !== 0) {
      return 2;
    }
    if (successNum < errorsNum) {
      return 1;
    }
    return 0;
  };

  useEffect(() => {
    if (!state.data.length) {
      return;
    }
    const arrSize = 720 - state.data.length;
    const array: {
      statusCode: number | null;
      executionTime: number;
      executionTimeTag: string;
      createdAt: number;
    }[] = new Array(arrSize).fill({
      statusCode: null,
      executionTime: 0,
      executionTimeTag: 'ms',
      createdAt: 0,
    });
    state.data.forEach((d) => {
      array.push(d);
    });
    setChartData([...array]);
    const arrayWithChunks: {
      statusCode: number | null;
      executionTime: number;
      executionTimeTag: string;
      createdAt: number;
    }[][] = [];
    const chunkSize = 8;
    for (let i = 0; i < array.length; i += chunkSize) {
      const chunk = array.slice(i, i + chunkSize);
      arrayWithChunks.push(chunk);
    }
    const chartItems: {
      data: {
        statusCode: number | null;
        executionTime: number;
        executionTimeTag: string;
        createdAt: number;
      }[]
      status: number
    }[] = [];
    arrayWithChunks.forEach((item) => {
      const status = getStatus(item);
      chartItems.push({
        data: [...item],
        status,
      });
    });
    setStats(chartItems);
  }, [state]);

  useEffect(() => {
    if (chartData) {
      const successes = chartData.filter((obj) => obj.statusCode === 200).length;
      const successRate = (successes / state.data.length) * 100;
      setUptime(Math.round(successRate));
    }
  }, [chartData]);

  return (
    <Wrap>
      <StatusName title="API" status={state.status} uptime={uptime} />
      <StatusBlocks data={stats} />
      <StatusChart data={chartData} />
    </Wrap>
  );
};

const Wrap = styled.div`
  background-color: #222939;
  border: 1px solid #333c4c;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border-radius: 15px;
`;

export default Status;
