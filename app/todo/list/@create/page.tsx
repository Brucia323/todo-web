'use client';

import { UserType } from '@/lib/types';
import {
  Button,
  Drawer,
  Flex,
  Group,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import dayjs from 'dayjs';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useState } from 'react';

interface FormValues {
  name: string;
  beginDate: Date | null;
  plannedEndDate: Date | null;
  totalAmount: number | '';
  description: string;
}

export default function Create() {
  const [value] = useSessionStorage<UserType>({ key: 'user' });
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      beginDate: null,
      plannedEndDate: null,
      totalAmount: '',
      description: '',
    },
    validate: {
      beginDate: (value, values, path) =>
        dayjs(value).isAfter(values.plannedEndDate)
          ? '开始时间不得晚于预计结束时间'
          : null,
      plannedEndDate: (value, values) =>
        dayjs(value).isBefore(values.beginDate)
          ? '预计结束时间不得早于开始时间'
          : null,
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch('/api/todo', {
        method: HTTP_METHODS[3],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...values,
          beginDate: dayjs.tz(values.beginDate).utc(true),
          plannedEndDate: dayjs.tz(values.plannedEndDate).utc(true),
        }),
      });
      if (response.status === 201) {
        notifications.show({
          message: '新建成功',
          color: 'green',
        });
        form.reset();
        close();
      }
    } catch {
      notifications.show({ message: '新建失败', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    form.reset();
    close();
  };

  return (
    <>
      <Drawer
        onClose={handleClose}
        opened={opened}
        title="新建任务"
        overlayProps={{ opacity: 0.75, blur: 8 }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="名称"
              required
              withAsterisk
              maxLength={15}
              {...form.getInputProps('name')}
            />
            <Group grow>
              <DateInput
                clearable
                label="开始日期"
                valueFormat="YYYY-MM-DD"
                {...form.getInputProps('beginDate')}
              />
              <DateInput
                clearable
                label="计划结束时间"
                valueFormat="YYYY-MM-DD"
                {...form.getInputProps('plannedEndDate')}
              />
            </Group>
            <NumberInput
              label="总任务数"
              required
              withAsterisk
              min={1}
              precision={0}
              type="number"
              {...form.getInputProps('totalAmount')}
            />
            <Textarea
              autosize
              label="备注"
              placeholder="备忘"
              {...form.getInputProps('description')}
            />
            <Flex justify="flex-end" align="center">
              <Button loading={loading} type="submit">
                提交
              </Button>
            </Flex>
          </Stack>
        </form>
      </Drawer>

      <Group position="center">
        <Button onClick={open}>新建</Button>
      </Group>
    </>
  );
}
