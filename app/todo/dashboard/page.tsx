'use client';

import { UserType } from '@/lib/types';
import { Card, Container, Stack, Title } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface EfficiencyType {
  amount: number;
  time: string;
}

const fetcher = async (
  url: RequestInfo | URL,
  token: string
): Promise<EfficiencyType[]> => {
  const response = await fetch(url, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  return response.json();
};

export default function Dashboard() {
  const [value] = useSessionStorage<UserType | undefined>({ key: 'user' });
  const { data } = useSWR(
    value ? ['/api/todo/efficiency', value.token] : null,
    ([input, token]) => fetcher(input, token)
  );

  return (
    <Container>
      <Stack>
        <Card shadow="md" withBorder>
          <Stack>
            <Title>效率指数</Title>
            <ResponsiveContainer width="100%" height={320}>
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="amount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#228BE6" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#228BE6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="time"
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
                  dataKey="amount"
                  name="效率指数"
                  fillOpacity={1}
                  fill="url(#amount)"
                  strokeWidth={2}
                  stroke="#228BE6"
                />
              </AreaChart>
            </ResponsiveContainer>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
}
