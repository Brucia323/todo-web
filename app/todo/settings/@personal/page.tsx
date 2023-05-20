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
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormValues {
  password: string;
}

export default function Personal() {
  const [active, setActive] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

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

  const handleSecondSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true);
      const prevResponse = await fetch('/api/user', {
        method: HTTP_METHODS[0],
        headers: { Authorization: value.token },
      });
      if (!prevResponse.ok) {
        notifications.show({ message: '网络异常', color: 'red' });
        return;
      }
      const body = await prevResponse.json();
      const response = await fetch(`/api/user/${body.id}`, {
        method: HTTP_METHODS[4],
        headers: {
          Authorization: value.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...body, ...values }),
      });
      if (response.ok) {
        notifications.show({
          title: '修改成功',
          message: '请重新登录',
          color: 'green',
        });
        router.push('/user/login');
        return;
      }
      notifications.show({ message: '网络异常', color: 'red' });
    } catch {
      notifications.show({ message: '网络异常', color: 'red' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Stack>
      <Card shadow="md" withBorder>
        <Stack>
          <Title order={2}>修改密码</Title>
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
                    <Button type="submit" loading={isLoading}>
                      下一步
                    </Button>
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
                    <Button type="submit" loading={isLoading}>
                      确认
                    </Button>
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
