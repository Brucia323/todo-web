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
  id: number;
  userId: number;
  name: string;
  beginDate: Date | null;
  plannedEndDate: Date | null;
  currentAmount: number;
  totalAmount: number | '';
  description: string | null;
}

export default function Edit(props: FormValues) {
  const [value] = useSessionStorage<UserType>({ key: 'user' });
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<FormValues>({
    initialValues: { ...props },
    validate: {
      beginDate: (value, values, path) =>
        dayjs(value).isBefore(values.plannedEndDate)
          ? null
          : '开始时间不得晚于预计结束时间',
      plannedEndDate: (value, values) =>
        dayjs(value).isAfter(values.beginDate)
          ? null
          : '预计结束时间不得早于开始时间',
    },
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch('/api/todo', {
        method: HTTP_METHODS[4],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...values, currentAmount: props.currentAmount }),
      });
      if (response.status === 200) {
        notifications.show({
          message: '修改成功',
          color: 'green',
        });
        form.reset();
        close();
      }
    } catch {
      notifications.show({ message: '修改失败', color: 'red' });
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
        title="修改任务"
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

      <Button onClick={open} size="xs" variant="subtle">
        编辑
      </Button>
    </>
  );
}
