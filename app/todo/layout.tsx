'use client';

import {
  AppShell,
  Flex,
  Header,
  Menu,
  Navbar,
  UnstyledButton,
} from '@mantine/core';
import { useLocalStorage, useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [value, setValue] = useSessionStorage({
    key: 'token',
    getInitialValueInEffect: false,
  });

  if (!value) {
    notifications.show({ title: '未登录', message: '请先登录', color: 'red' });
    router.push('/');
  }

  const user: { name: string; token: string } = JSON.parse(value);

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="xs">
          Todo
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Flex justify="flex-end" align="center">
            <Menu shadow="md" width={200}>
              <Menu.Target>
                <UnstyledButton>{user.name}</UnstyledButton>
              </Menu.Target>
            </Menu>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
