'use client';

import { useUser } from '@/lib/service';
import { UserType } from '@/lib/types';
import { FETCH, PASSWORD } from '@/lib/utils';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogin, IconMail, IconPassword } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';

interface FormValues {
  email: string;
  password: string;
}

export default function Login() {
  const { setUser } = useUser();
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

  const handleSubmit = async (
    values: FormValues,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    try {
      setLoading(true);
      const response = await fetch('/api/user/login', {
        method: FETCH.METHOD.POST,
        headers: FETCH.HEADER,
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        const user: UserType = await response.json();
        setUser(user)
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
