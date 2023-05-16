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

/* 定义可以传递给 AreaChart 组件的道具。道具包括“data”，它是要在图表上绘制的数据数组，“index”，它是表示 x 轴值的数据数组中的键，“category”，它是表示 y
轴值的数据数组，以及“name”，这是要在图表图例中显示的数据系列的名称。 */
export interface AreaChartProps {
  data: any[] | undefined;
  index: string;
  catogory: string;
  name: string;
}

/**
 * 这是一个 React 功能组件，它使用具有可自定义数据、索引、类别和名称道具的 ReCharts 库呈现面积图。
 * @param props - props 参数是一个对象，其中包含传递给 AreaChart 组件的属性。这些属性包括数据、索引、类别和名称。
 * @returns 一个 AreaChart 组件，它使用 ReCharts 库来呈现具有提供的数据、索引、类别和名称属性的面积图。该图表包括 X 轴和 Y
 * 轴、笛卡尔网格、工具提示和图例。该区域填充了由 category 属性定义的线性渐变。
 */
const AreaChart: React.FC<AreaChartProps> = (props) => {
  /* `const { data, index, catogory, name } = props;` 正在解构 `props` 对象并将其属性 `data`、`index`、`catogory` 和
  `name` 的值分配给分隔常量相同的名字。这样可以更轻松、更简洁地访问组件内的这些属性。 */
  const { data, index, catogory, name } = props;

  /* `return` 语句正在渲染一个使用 ReCharts 库显示面积图的 React 组件。图表由传递给组件的 `data`、`index`、`catogory` 和 `name`
  属性定义。该图表包括 X 轴和 Y 轴、笛卡尔网格、工具提示和图例。图表区域填充了由 catogory 属性定义的线性渐变。 */
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
