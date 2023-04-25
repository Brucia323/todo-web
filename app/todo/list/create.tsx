'use client';

import { UserType } from '@/lib/types';
import {
  Button,
  Drawer,
  Flex,
  Group,
  Modal,
  NumberInput,
  Stack,
  TextInput,
  Textarea,
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useState } from 'react';

interface FormValue {
  name: string;
  beginDate: Date;
  plannedEndDate: Date;
  totalAmount: number | '';
  description: string;
}

export default function Create() {
  const [value] = useSessionStorage<UserType>({ key: 'user' });
  const [opened, { open, close }] = useDisclosure(false);
  const form = useForm<FormValue>({});
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values: FormValue) => {
    try {
      setLoading(true);
      const response = await fetch('/api/todo', {
        method: HTTP_METHODS[3],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
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

  return (
    <>
      <Drawer
        opened={opened}
        onClose={close}
        title="新建任务"
        overlayProps={{ opacity: 0, blur: 8 }}
      >
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack>
            <TextInput
              label="名称"
              required
              withAsterisk
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
