'use client';

import { UserType } from '@/lib/types';
import { Skeleton, Title } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';

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
    <Title display="flex">
      你好{data ? `，${data.name}` : <Skeleton width={200} height={44} />}
    </Title>
  );
}
