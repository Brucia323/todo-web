'use client';

import { PASSWORD } from '@/lib/utils';
import {
  Button,
  Card,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Stepper,
  Title,
} from '@mantine/core';
import { matches, useForm } from '@mantine/form';
import { IconPassword } from '@tabler/icons-react';
import { useState } from 'react';

interface FormValues {
  password: string;
}

export default function Personal() {
  const [active, setActive] = useState(0);

  const firstForm = useForm<FormValues>({
    initialValues: {
      password: '',
    },
    validate: {
      password: matches(PASSWORD, '密码无效'),
    },
  });
  const secondForm = useForm<FormValues>({
    initialValues: {
      password: '',
    },
    validate: {
      password: matches(PASSWORD, '密码无效'),
    },
  });

  const handleFirstSubmit = (values: FormValues) => {};

  const handleSecondSubmit = (values: FormValues) => {};

  return (
    <Stack>
      <Card shadow="md" withBorder>
        <Stack>
          <Title>修改密码</Title>
          <Divider />
          <Stepper active={active} breakpoint="sm">
            <Stepper.Step label="确认旧密码">
              <form onSubmit={firstForm.onSubmit(handleFirstSubmit)}>
                <Stack align="center">
                  <PasswordInput
                    description="以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                    placeholder="当前密码"
                    icon={<IconPassword />}
                    {...firstForm.getInputProps('password')}
                  />
                  <Group position="right" w="100%">
                    <Button type="submit">下一步</Button>
                  </Group>
                </Stack>
              </form>
            </Stepper.Step>
            
            <Stepper.Step label="输入新密码">
              <form onSubmit={secondForm.onSubmit(handleSecondSubmit)}>
                <Stack align="center">
                  <PasswordInput
                    description="以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
                    placeholder="新密码"
                    icon={<IconPassword />}
                    {...secondForm.getInputProps('password')}
                  />
                  <Group position="right" w="100%">
                    <Button type="submit">确认</Button>
                  </Group>
                </Stack>
              </form>
            </Stepper.Step>
          </Stepper>
        </Stack>
      </Card>
    </Stack>
  );
}
