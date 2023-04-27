'use client';

import { Container, Stack, Title } from '@mantine/core';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import Efficiency from './efficiency';
import useSWR from 'swr';
import { useSessionStorage } from '@mantine/hooks';
import { UserType } from '@/lib/types';

const fetcher = async (url: RequestInfo | URL, token: string) => {
  const response = await fetch(url, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
};

export default function Dashboard() {
  const [value] = useSessionStorage<UserType>({ key: 'user' });
  const { data } = useSWR(
    value ? ['/api/user', value.token] : null,
    ([url, token]) => fetcher(url, token)
  );

  return (
    <Container>
      <Stack>
        <Title>你好{data && `，${data.name}`}</Title>
        <Efficiency />
      </Stack>
    </Container>
  );
}
