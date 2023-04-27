import React from 'react';
import {
  Area,
  CartesianGrid,
  Legend,
  AreaChart as ReChartsAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export interface AreaChartProps {
  data: any[] | undefined;
  index: string;
  catogory: string;
  name: string;
}

const AreaChart: React.FC<AreaChartProps> = (props) => {
  const { data, index, catogory, name } = props;

  return (
    <ResponsiveContainer width="100%" height={320}>
      <ReChartsAreaChart data={data}>
        <defs>
          <linearGradient id={catogory} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#228BE6" stopOpacity={0.4} />
            <stop offset="95%" stopColor="#228BE6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey={index}
          axisLine={false}
          tickLine={false}
          padding={{ left: 10, right: 10 }}
          minTickGap={5}
          style={{
            fontSize: '12px',
            fontFamily: 'Inter; Helvetica',
            color: 'red',
          }}
          tick={{ transform: 'translate(0, 6)' }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ transform: 'translate(-3, 0)' }}
          style={{
            fontSize: '12px',
            fontFamily: 'Inter; Helvetica',
          }}
        />
        <CartesianGrid
          strokeDasharray="3 3"
          horizontal={true}
          vertical={false}
        />
        <Tooltip wrapperStyle={{ outline: 'none' }} />
        <Legend verticalAlign="top" />
        <Area
          type="linear"
          dataKey={catogory}
          name={name}
          fillOpacity={1}
          fill={`url(#${catogory})`}
          strokeWidth={2}
          stroke="#228BE6"
        />
      </ReChartsAreaChart>
    </ResponsiveContainer>
  );
};

export default AreaChart;
