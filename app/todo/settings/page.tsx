'use client';

import {
  Button,
  Container,
  Flex,
  Group,
  MultiSelect,
  SelectItem,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { TimeInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import {
  IconCalendar,
  IconClockPlay,
  IconClockStop,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

const dayOfWeek: (string | SelectItem)[] = [
  { value: '0', label: '星期天' },
  { value: '1', label: '星期一' },
  { value: '2', label: '星期二' },
  { value: '3', label: '星期三' },
  { value: '4', label: '星期四' },
  { value: '5', label: '星期五' },
  { value: '6', label: '星期六' },
];

interface FormValue {
  dayOfWeek: string[];
  beginTime: string;
  endTime: string;
}

export default function Settings() {
  const form = useForm<FormValue>({
    initialValues: {
      dayOfWeek: [],
      beginTime: '',
      endTime: '',
    },
    validate: {
      beginTime: (value, values) => dayjs(value).isBefore(values.endTime),
      endTime: (value, values) => dayjs(value).isAfter(values.beginTime),
    },
  });

  const handleSubmit = (values: FormValue) => {
    console.log({ values });
  };

  const handleReset = () => {
    form.reset();
  };

  return (
    <Container>
      <Stack>
        <Title>设置</Title>
        <Tabs defaultValue="time">
          <Tabs.List>
            <Tabs.Tab value="time">时间</Tabs.Tab>
            <Tabs.Tab value="personal">个人设置</Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="time">
            <Stack>
              <Text c="dimmed">
                填写时间将会启动 AI 功能，该功能可能需要收集你的数据。
              </Text>
              <form
                onSubmit={form.onSubmit(handleSubmit)}
                onReset={handleReset}
              >
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
                      description="计划开始的时间"
                      icon={<IconClockPlay />}
                      label="开始时间"
                      {...form.getInputProps('beginTime')}
                    />
                    <TimeInput
                      description="计划结束的时间"
                      icon={<IconClockStop />}
                      label="结束时间"
                      {...form.getInputProps('endTime')}
                    />
                  </Group>
                  <Flex justify="flex-end" align="center" gap="md">
                    <Button type="submit">提交</Button>
                    <Button type="reset" variant="subtle">
                      重置
                    </Button>
                  </Flex>
                </Stack>
              </form>
            </Stack>
          </Tabs.Panel>

          <Tabs.Panel value="personal" pt="xs">
            Messages tab content
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
