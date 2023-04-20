'use client';

import { useUser } from '@/lib/service';
import { UserType } from '@/lib/types';
import { FETCH } from '@/lib/utils';
import { Button, Container, Flex, Table } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import useSWR from 'swr';

const fetcher = async (input: RequestInfo | URL, token: string) =>
  await fetch(input, {
    method: FETCH.METHOD.GET,
    headers: { Authorization: token },
  });

export default function TodoList() {
  const { token } = useUser();
  const { data, isLoading } = useSWR(
    token ? ['/api/todo', token] : null,
    ([input, token]) => fetcher(input, token)
  );

  return (
    <Container>
      <Flex align="center" mih={50}>
        <Button>新建</Button>
      </Flex>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>名称</th>
            <th>开始时间</th>
            <th>预计结束时间</th>
            <th>进度</th>
            <th>操作</th>
          </tr>
        </thead>
      </Table>
    </Container>
  );
}
