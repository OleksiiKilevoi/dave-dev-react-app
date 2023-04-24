import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { IData } from '@/interfaces/data';

interface Props {
  data: IData[] | null,
  setTime: (value: number) => void
}

const Chart: React.FC<Props> = ({ data, setTime }) => {
  const polyRef = useRef<SVGPolylineElement>(null!);
  const svgRef = useRef<SVGSVGElement>(null!);
  useEffect(() => {
    if (data) {
      const max = Math.max(...data.map((o) => o.executionTime));
      const svgHeight = 150;
      const svgWidth = 1020;
      const blockWidth = svgWidth / data.length;
      setTime(data[data.length - 1].executionTime);

      let cursor = 2;
      const points:number[][] = [];
      data.forEach((val) => {
        points.push([cursor, svgHeight - (svgHeight * val.executionTime) / max + 5]);
        cursor += blockWidth;
      });

      if (polyRef.current) {
        polyRef.current.setAttribute('points', points.join(' '));
      }
      if (svgRef.current) {
        svgRef.current.setAttribute('width', `${svgWidth}px`);
        svgRef.current.setAttribute('height', `${svgHeight}px`);
      }
    }
  }, [data]);

  return (
    <ChartWrap id="chart">
      <Svg width={1020} height={150} ref={svgRef} className="chart-svg" stroke="#939db8" strokeWidth="3" fill="#939db8">
        <ChartPoly ref={polyRef} points="0 150 1020 150" paintOrder="stroke" fill="none" strokeWidth="3" />
      </Svg>
    </ChartWrap>
  );
};

const ChartWrap = styled.div`
  position: relative;
`;

const Svg = styled.svg`
  flex: none;
  overflow: visible;
  border-bottom: #E6E9ED 1px;
`;

const ChartPoly = styled.polyline`
  stroke-linejoin: miter;
  stroke-miterlimit: 5;
  paint-order: stroke;
`;

export default Chart;
