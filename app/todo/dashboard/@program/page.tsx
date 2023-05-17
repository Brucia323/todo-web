'use client';

import { UserType } from '@/lib/types';
import {
  Card,
  Center,
  Divider,
  HoverCard,
  Progress,
  Stack,
  Table,
  Text,
  Title,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';
import { TodoType } from '../../list/page';
import dayjs from 'dayjs';

const fetcher = async (
  url: RequestInfo | URL,
  token: string
): Promise<TodoType[]> => {
  const response = await fetch(url, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  if (response.ok) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export default function Program() {
  const [value] = useSessionStorage<UserType | undefined>({ key: 'user' });
  const { data, error } = useSWR(
    value ? ['/api/todo/program', value.token] : null,
    ([input, token]) => fetcher(input, token)
  );

  if (error) return <></>;

  if (!data || data.length === 0) {
    return (
      <Card shadow="md" withBorder>
        <Stack>
          <Title order={2}>今日任务</Title>
          <Divider />
          <Center>今日休息</Center>
        </Stack>
      </Card>
    );
  }

  return (
    <Card shadow="md" withBorder>
      <Stack>
        <Title order={2}>今日任务</Title>
        <Divider />
        <Table highlightOnHover>
          <thead>
            <tr>
              <th>名称</th>
              <th>预计结束时间</th>
              <th>进度</th>
              <th>今日任务量</th>
            </tr>
          </thead>
          <tbody>
            {data.map((todo) => {
              const progress = (todo.currentAmount / todo.totalAmount) * 100;
              const plannedEndDate = dayjs(todo.plannedEndDate);
              const duratin = dayjs.duration(plannedEndDate.diff(dayjs()));
              const today =
                (todo.totalAmount - todo.currentAmount) / duratin.asDays();
              return (
                <tr key={todo.id}>
                  <td>
                    {todo.description?.length ? (
                      <HoverCard position="bottom-start">
                        <HoverCard.Target>
                          <Text>{todo.name}</Text>
                        </HoverCard.Target>
                        <HoverCard.Dropdown sx={{ maxWidth: 320 }}>
                          {todo.description.split('\n').map((value) => (
                            <Text key={value}>{value}</Text>
                          ))}
                        </HoverCard.Dropdown>
                      </HoverCard>
                    ) : (
                      <Text>{todo.name}</Text>
                    )}
                  </td>
                  <td>{todo.plannedEndDate}</td>
                  <td>
                    <Progress
                      sections={[
                        {
                          value: progress,
                          color: 'blue',
                        },
                      ]}
                    />
                  </td>
                  <td>
                    {today < 0
                      ? todo.totalAmount - todo.currentAmount
                      : today.toFixed(0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Stack>
    </Card>
  );
}
