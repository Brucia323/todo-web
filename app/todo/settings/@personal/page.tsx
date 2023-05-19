'use client';

import { UserType } from '@/lib/types';
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
import { useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconPassword } from '@tabler/icons-react';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useState } from 'react';

interface FormValues {
  password: string;
}

export default function Personal() {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [value] = useSessionStorage<UserType>({ key: 'user' });

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

  const handleFirstSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `/api/user/password?password=${values.password}`,
        {
          method: HTTP_METHODS[0],
          headers: { Authorization: value.token },
        }
      );
      if (response.status === 200) {
        setActive(1);
      } else {
        notifications.show({ message: '密码错误', color: 'red' });
      }
    } catch {
      notifications.show({ message: '网络异常', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSecondSubmit = (values: FormValues) => {
    try{}catch{}finally{}
  };

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
