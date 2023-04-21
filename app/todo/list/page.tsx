'use client';

import { UserType } from '@/lib/types';
import { Button, Container, Flex, Group, Progress, Table } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import Create from './create';
import Update from './update';
import Edit from './edit';
import dayjs from 'dayjs';

interface TodoType {
  id: number;
  userId: number;
  name: string;
  beginTime: string | null;
  plannedEndTime: string | null;
  actualEndTime: string | null;
  currentAmount: number | null;
  totalAmount: number;
  description: string | null;
  createTime: string;
  updateTime: string;
}

const fetcher = async (
  input: RequestInfo | URL,
  token: string
): Promise<TodoType[]> => {
  const response = await fetch(input, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  return response.json();
};

export default function TodoList() {
  const [value] = useSessionStorage<UserType | undefined>({
    key: 'user',
  });
  const { data } = useSWR(
    value ? ['/api/todo', value.token] : null,
    ([input, token]) => fetcher(input, token),
    { refreshInterval: 1 }
  );

  const rows = data?.map((value) => {
    const progress =
      ((value.currentAmount ?? 0) / (value.totalAmount ?? 0)) * 100;
    return (
      <tr key={value.id}>
        <td>{value.name}</td>
        <td>{value.beginTime}</td>
        <td>{value.plannedEndTime}</td>
        <td>{value.actualEndTime}</td>
        <td>
          {value.totalAmount && (
            <Progress
              sections={[
                {
                  value: progress,
                  color: progress < 100 ? 'blue' : 'green',
                },
              ]}
            />
          )}
        </td>
        <td>
          <Group>
            <Edit
              {...value}
              beginTime={new Date(value.beginTime ?? '')}
              plannedEndTime={new Date(value.plannedEndTime ?? '')}
              description={value.description ?? ''}
            />
            {value.totalAmount && (
              <Update min={value.currentAmount ?? 0} max={value.totalAmount} />
            )}
            <Button size="xs" variant="subtle">
              删除
            </Button>
          </Group>
        </td>
      </tr>
    );
  });

  return (
    <Container>
      <Flex align="center" mih={50}>
        <Create />
      </Flex>
      <Table highlightOnHover>
        <thead>
          <tr>
            <th>名称</th>
            <th>开始时间</th>
            <th>预计结束时间</th>
            <th>结束时间</th>
            <th>进度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </Container>
  );
}
