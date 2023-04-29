'use client';

import { UserType } from '@/lib/types';
import { Card, Divider, Stack, Title } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import React from 'react';
import AreaChart from '@/components/AreaChart';

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
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export default function Efficiency() {
  const [value] = useSessionStorage<UserType | undefined>({ key: 'user' });
  const { data } = useSWR(
    value ? ['/api/todo/efficiency', value.token] : null,
    ([input, token]) => fetcher(input, token)
  );

  return (
    <Card shadow="md" withBorder>
      <Stack>
        <Title order={2}>效率指数</Title>
        <Divider />
        <AreaChart data={data} index="time" catogory="amount" name="效率指数" />
      </Stack>
    </Card>
  );
}
