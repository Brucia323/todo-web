'use client';

import Logo from '@/app/logo';
import { UserType } from '@/lib/types';
import { PASSWORD } from '@/lib/utils';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogin, IconMail, IconPassword } from '@tabler/icons-react';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const [_value, setValue] = useSessionStorage<UserType>({ key: 'user' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: isEmail('邮箱无效'),
      password: matches(PASSWORD, '密码无效'),
    },
  });

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/login', {
        method: HTTP_METHODS[3],
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        const user: UserType = await response.json();
        user.token = `Bearer ${user.token}`;
        setValue(user);
        notifications.show({
          title: '登录成功',
          message: `欢迎回来 ${user.name}!`,
          color: 'green',
        });
        router.push('/todo/dashboard');
      } else if (response.status === 401) {
        notifications.show({
          title: '登录失败',
          message: '邮箱或密码错误',
          color: 'red',
        });
      }
    } catch {
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack align="center" justify="center" h="100%">
      <Logo />
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <TextInput
            placeholder="邮箱"
            icon={<IconMail />}
            {...form.getInputProps('email')}
          />
          <PasswordInput
            placeholder="密码"
            icon={<IconPassword />}
            {...form.getInputProps('password')}
          />
          <Button
            fullWidth
            leftIcon={<IconLogin />}
            loading={loading}
            type="submit"
          >
            登录
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
