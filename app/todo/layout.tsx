'use client';

import {
  AppShell,
  Flex,
  Group,
  Header,
  Menu,
  Navbar,
  UnstyledButton,
} from '@mantine/core';
import { useDidUpdate, useIdle, useSessionStorage } from '@mantine/hooks';
import { IconLogout, IconMenu2, IconSettings2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import MainLinks from '@/components/mainLinks';
import { UserType } from '@/lib/types';
import Logo from '@/components/logo';
import Link from 'next/link';
import { notifications } from '@mantine/notifications';

export default function Layout({ children }: { children: React.ReactNode }) {
  const [value, _setValue, removeValue] = useSessionStorage<
    UserType | undefined
  >({ key: 'user' });
  const router = useRouter();
  const idle = useIdle(1000);

  useDidUpdate(() => {
    if (value === undefined) {
      notifications.show({ message: '未登录', color: 'red' });
      router.push('/');
    }
  }, [idle]);

  const handleLogout = () => {
    removeValue();
    router.push('/');
  };

  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 'xl' }} height="100%" p="xs">
          <Navbar.Section grow>
            <MainLinks />
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          <Group position="apart" h="100%">
            <Logo />
            <Flex align="center" h="100%">
              <Menu
                closeDelay={400}
                openDelay={100}
                shadow="md"
                trigger="hover"
              >
                <Menu.Target>
                  <UnstyledButton>
                    <IconMenu2 />
                  </UnstyledButton>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Item
                    icon={<IconSettings2 />}
                    component={Link}
                    href="/todo/settings"
                  >
                    设置
                  </Menu.Item>
                  <Menu.Item icon={<IconLogout />} onClick={handleLogout}>
                    退出
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Flex>
          </Group>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
