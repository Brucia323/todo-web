'use client';

import { UserType } from '@/lib/types';
import {
  Button,
  Flex,
  Group,
  MultiSelect,
  SelectItem,
  Stack,
  Text,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  IconCalendar,
  IconClockPlay,
  IconClockStop,
} from '@tabler/icons-react';
import dayjs from 'dayjs';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useState } from 'react';
import useSWR from 'swr';

interface FormValues {
  dayOfWeek: string[];
  beginTime: string;
  endTime: string;
}

const dayOfWeek: (string | SelectItem)[] = [
  { value: '0', label: '星期天' },
  { value: '1', label: '星期一' },
  { value: '2', label: '星期二' },
  { value: '3', label: '星期三' },
  { value: '4', label: '星期四' },
  { value: '5', label: '星期五' },
  { value: '6', label: '星期六' },
];

const fetcher = async (url: RequestInfo | URL, token: string) => {
  const response = await fetch(url, {
    method: HTTP_METHODS[0],
    headers: { Authorization: token },
  });
  if (!response.ok) {
    throw new Error(await response.json());
  }
  return response.json();
};

export default function Time() {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [resetLoading, setResetLoading] = useState(false);

  const [value] = useSessionStorage<UserType>({ key: 'user' });

  useSWR(
    value ? ['/api/user', value.token] : null,
    ([url, token]) => fetcher(url, token),
    {
      onSuccess: (data) => {
        const timePerWeek = JSON.parse(data.timePerWeek);
        form.setFieldValue(
          'dayOfWeek',
          timePerWeek.map((value: { day: string }) => value.day)
        );
        form.setFieldValue('beginTime', timePerWeek[0].beginTime);
        form.setFieldValue('endTime', timePerWeek[0].endTime);
      },
    }
  );

  const form = useForm<FormValues>({
    initialValues: {
      dayOfWeek: [],
      beginTime: '',
      endTime: '',
    },
    validate: {
      beginTime: (value, values) =>
        dayjs(value, 'HH:mm').isAfter(dayjs(values.endTime, 'HH:mm'), 'h') &&
        '开始时间不得晚于结束时间',
      endTime: (value, values) =>
        dayjs(value, 'HH:mm').isBefore(dayjs(values.beginTime, 'HH:mm'), 'h') &&
        '结束时间不得早于开始时间',
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setSubmitLoading(true);
      const dayOfWeek = values.dayOfWeek.sort((a, b) => Number(a) - Number(b));
      const timePerWeek = dayOfWeek.map((value) => ({
        day: value,
        beginTime: values.beginTime,
        endTime: values.endTime,
      }));
      const prevResponse = await fetch('/api/user', {
        method: HTTP_METHODS[0],
        headers: { Authorization: value.token },
      });
      if (!prevResponse.ok) {
        notifications.show({ message: '更新失败', color: 'red' });
        return;
      }
      const body = await prevResponse.json();
      const response = await fetch(`/api/user/${body.id}`, {
        method: HTTP_METHODS[4],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...body,
          timePerWeek: JSON.stringify(timePerWeek),
        }),
      });
      if (!response.ok) {
        notifications.show({ message: '更新失败', color: 'red' });
        return;
      }
      notifications.show({ message: '更新成功', color: 'green' });
    } catch {
      notifications.show({ message: '更新失败', color: 'red' });
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleReset = async () => {
    try {
      setResetLoading(true);
      const prevResponse = await fetch('/api/user', {
        method: HTTP_METHODS[0],
        headers: { Authorization: value.token },
      });
      if (!prevResponse.ok) {
        notifications.show({ message: '重置失败', color: 'red' });
        return;
      }
      const body = await prevResponse.json();
      const response = await fetch(`/api/user/${body.id}`, {
        method: HTTP_METHODS[4],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body, timePerWeek: null }),
      });
      if (!response.ok) {
        notifications.show({ message: '重置失败', color: 'red' });
        return;
      }
      notifications.show({ message: '重置成功', color: 'green' });
      form.reset();
    } catch {
      notifications.show({ message: '重置失败', color: 'red' });
    } finally {
      setResetLoading(false);
    }
  };

  return (
    <Stack>
      <Text c="dimmed">
        填写时间将会启动 AI{' '}
        功能，该功能可能需要收集你的数据。（暂时只支持同一时间段）
      </Text>
      <form onSubmit={form.onSubmit(handleSubmit)} onReset={handleReset}>
        <Stack>
          <MultiSelect
            data={dayOfWeek}
            description="选择一星期中打算用来完成 Todo 列表的时间"
            icon={<IconCalendar />}
            label="星期"
            transitionProps={{ duration: 400, transition: 'pop' }}
            {...form.getInputProps('dayOfWeek')}
          />
          <Group grow>
            <TimeInput
              description="该时间将用于被选择的每一天"
              icon={<IconClockPlay />}
              label="开始时间"
              {...form.getInputProps('beginTime')}
            />
            <TimeInput
              description="该时间将用于被选择的每一天"
              icon={<IconClockStop />}
              label="结束时间"
              {...form.getInputProps('endTime')}
            />
          </Group>
          <Flex justify="flex-end" align="center" gap="md">
            <Button type="submit" loading={submitLoading}>
              提交
            </Button>
            <Button type="reset" variant="subtle" loading={resetLoading}>
              重置
            </Button>
          </Flex>
        </Stack>
      </form>
    </Stack>
  );
}
