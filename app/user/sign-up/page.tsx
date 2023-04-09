'use client';

import { PASSWORD } from '@/lib/utils';
import { Button, PasswordInput, Stack, TextInput } from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { IconMail, IconPassword, IconUser } from '@tabler/icons-react';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  const form = useForm<FormValues>({
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
    const response = await fetch('/api/sign-up', {
      method: 'POST',
      body: JSON.stringify(values),
    });
    if (response.status === 201) {
      console.log('sign up');
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
};

export default SignUp;
