'use client';

import Delete from '@/components/delete';
import Edit from '@/components/edit';
import Update from '@/components/update';
import { UserType } from '@/lib/types';
import {
  HoverCard,
  LoadingOverlay,
  Progress,
  Table,
  Text,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import useSWR from 'swr';

interface TodoType {
  id: number;
  userId: number;
  name: string;
  beginDate: string | null;
  plannedEndDate: string | null;
  actualEndDate: string | null;
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
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export default function Todolist() {
    const [value] = useSessionStorage<UserType | undefined>({
      key: 'user',
    });
    const { data, isLoading } = useSWR(
      value ? ['/api/todo', value.token] : null,
      ([url, token]) => fetcher(url, token),
      { refreshInterval: 1000 }
    );
  
  return (
    <>
      <LoadingOverlay visible={isLoading} overlayBlur={8} />
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
          {data?.map?.((todo) => {
            const progress = (todo.currentAmount / todo.totalAmount) * 100;
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
                <td>{todo.beginDate}</td>
                <td>
                  {progress < 100 ? todo.plannedEndDate : todo.actualEndDate}
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
                  <Edit
                    {...todo}
                    beginDate={todo.beginDate ? new Date(todo.beginDate) : null}
                    plannedEndDate={
                      todo.plannedEndDate ? new Date(todo.plannedEndDate) : null
                    }
                  />
                  <Update
                    min={todo.currentAmount}
                    max={todo.totalAmount}
                    id={todo.id}
                  />
                  <Delete id={todo.id} name={todo.name} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}