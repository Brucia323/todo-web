'use client';

import {
  AppShell,
  Flex,
  Group,
  Header,
  Menu,
  Navbar,
  Text,
  UnstyledButton,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLogout, IconSettings2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [value, setValue, removeValue] = useSessionStorage({
    key: 'token',
    getInitialValueInEffect: false,
  });

  if (!value) {
    notifications.show({ title: '未登录', message: '请先登录', color: 'red' });
    router.push('/');
  }

  const user: { name: string; token: string } = JSON.parse(value);

  const handleLogout = () => {
    removeValue();
    router.push('/');
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height="100%" p="xs">
          <Navbar.Section>仪表板</Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Flex justify="flex-end" align="center">
            <Menu
              closeDelay={400}
              openDelay={100}
              shadow="md"
              trigger="hover"
              width={200}
            >
              <Menu.Target>
                <UnstyledButton>{user.name}</UnstyledButton>
              </Menu.Target>
              <Menu.Dropdown>
                <Menu.Item icon={<IconSettings2 />}>设置</Menu.Item>
                <Menu.Item icon={<IconLogout />} onClick={handleLogout}>
                  退出
                </Menu.Item>
              </Menu.Dropdown>
            </Menu>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
