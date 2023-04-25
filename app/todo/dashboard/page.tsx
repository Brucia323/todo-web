'use client';

import { UserType } from '@/lib/types';
import { Card, Container, Text, Title } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';

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
    ([input, token]) => fetcher(input, token),
  );

  return (
    <Container>
      <Card shadow="sm" padding="lg" radius="md" withBorder>
        <Title>效率指数</Title>
      </Card>
    </Container>
  );
}
