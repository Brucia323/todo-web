'use client';

import { PASSWORD } from '@/lib/utils';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { IconMail, IconPassword } from '@tabler/icons-react';
import React from 'react';

interface FormValues {
  email: string;
  password: string;
}

const Login: React.FC = () => {
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
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (response.status === 201) {
      console.log('login');
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
          <Button fullWidth type="submit">
            登录
          </Button>
        </Stack>
      </form>
    </Stack>
  );
};

export default Login;
