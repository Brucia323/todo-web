'use client';

import Logo from '@/components/logo';
import { PASSWORD } from '@/lib/utils';
import {
  Button,
  PasswordInput,
  PinInput,
  Stack,
  TextInput,
} from '@mantine/core';
import { isEmail, matches, useForm } from '@mantine/form';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { IconMail, IconPassword, IconUser } from '@tabler/icons-react';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface FormValues {
  name: string;
  email: string;
  password: string;
}

export default function SignUp() {
  const [loading, setLoading] = useState(false);

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

  const handleSubmit = async (values: FormValues) => {
    try {
      setLoading(true);
      const prevResponse = await fetch(`/api/user/email/${values.email}`, {
        method: HTTP_METHODS[0],
      });
      if (prevResponse.ok) {
        notifications.show({ message: '该邮箱已注册' });
        return;
      }
      const response = await fetch('/api/user/captcha', {
        method: HTTP_METHODS[0],
      });
      if (response.ok) {
        const body = await response.json();
        const captcha: string = body.captcha;
        modals.open({
          centered: true,
          title: '输入验证码',
          children: (
            <PinInput
              oneTimeCode
              onComplete={async (value) => {
                if (value !== captcha) {
                  notifications.show({ message: '验证码错误', color: 'red' });
                  modals.closeAll();
                  return;
                }
                const response = await fetch('/api/user', {
                  method: HTTP_METHODS[3],
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(values),
                });
                if (response.status === 201) {
                  notifications.show({
                    title: '注册成功',
                    message: `欢迎 ${values.email}!`,
                    color: 'green',
                  });
                  router.push('/user/login');
                } else {
                  notifications.show({
                    title: '注册失败',
                    message: '邮箱被占用',
                    color: 'red',
                  });
                }
                modals.closeAll();
              }}
            />
          ),
        });
      }
    } catch (e) {
      console.error({ e });
      notifications.show({ message: '注册失败', color: 'red' });
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
            description="以字母开头，长度在6~18之间，只能包含字母、数字和下划线"
            placeholder="密码"
            icon={<IconPassword />}
            {...form.getInputProps('password')}
          />
          <Button fullWidth type="submit" loading={loading}>
            注册
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
