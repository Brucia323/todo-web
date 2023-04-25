'use client';

import { UserType } from '@/lib/types';
import {
  Container,
  Flex,
  Group,
  HoverCard,
  Progress,
  Table,
  Text,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import Create from './create';
import Delete from './delete';
import Edit from './edit';
import Update from './update';

interface TodoType {
  id: number;
  userId: number;
  name: string;
  beginTime: string | null;
  plannedEndTime: string | null;
  actualEndTime: string | null;
  currentAmount: number;
  totalAmount: number;
  description: string | null;
  createTime: string;
  updateTime: string;
}

const fetcher = async (
  url: RequestInfo | URL,
  token: string
): Promise<TodoType[]> => {
  const response = await fetch(url, {
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
    { refreshInterval: 1000 }
  );

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
            <th>（预计）结束时间</th>
            <th>进度</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((value) => {
            const progress =
              ((value.currentAmount ?? 0) / (value.totalAmount ?? 0)) * 100;
            return (
              <tr key={value.id}>
                <td>
                  <HoverCard width={320}>
                    <HoverCard.Target>
                      <Text>{value.name}</Text>
                    </HoverCard.Target>
                    <HoverCard.Dropdown>{value.description}</HoverCard.Dropdown>
                  </HoverCard>
                </td>
                <td>{value.beginTime}</td>
                <td>
                  {value.actualEndTime
                    ? value.actualEndTime
                    : value.plannedEndTime}
                </td>
                <td>
                  <Progress
                    sections={[
                      {
                        value: progress,
                        color: progress < 100 ? 'blue' : 'green',
                      },
                    ]}
                  />
                </td>
                <td>
                  <Group>
                    <Edit
                      {...value}
                      beginTime={new Date(value.beginTime ?? '')}
                      plannedEndTime={new Date(value.plannedEndTime ?? '')}
                      description={value.description ?? ''}
                    />
                    <Update
                      min={value.currentAmount}
                      max={value.totalAmount}
                      id={value.id}
                    />
                    <Delete id={value.id} name={value.name} />
                  </Group>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}
