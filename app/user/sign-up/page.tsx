'use client';

import { FETCH, PASSWORD } from '@/lib/utils';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { IconMail, IconPassword, IconUser } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const router = useRouter();
  const form = useForm<FormValues>({
    initialValues: {
      name: '',
      email: '',
      password: '',
    },
    validate: {
      name: (value) => (value.length > 0 ? null : '用户名无效'),
      email: isEmail('邮箱无效'),
      password: matches(PASSWORD, '密码无效'),
    },
  });

  const handleSubmit = async (
    values: FormValues,
    _event: React.FormEvent<HTMLFormElement>
  ) => {
    const response = await fetch('/api/user/sign-up', {
      method: FETCH.METHOD.POST,
      headers: FETCH.HEADER,
      body: JSON.stringify(values),
    });
    if (response.status === 201) {
      notifications.show({
        title: '注册成功',
        message: `欢迎 ${values.email}!`,
      });
      router.push('/user/login')
    }
  };

  return (
    <Stack align="center" justify="center" h="100%">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Stack spacing="lg">
          <TextInput
            placeholder="用户名"
            icon={<IconUser />}
            {...form.getInputProps('name')}
          />
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
            注册
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
