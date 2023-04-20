'use client';

import { UserType } from '@/lib/types';
import {
  AppShell,
  Flex,
  Header,
  Menu,
  Navbar,
  UnstyledButton,
} from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { IconLogout, IconMenu2, IconSettings2 } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { MainLinks } from './_mainLinks';
import { useUser } from '@/lib/service';

export default function Layout({ children }: { children: React.ReactNode }) {
  const { removeUser } = useUser();
  const router = useRouter();

  const handleLogout = () => {
    removeUser();
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
          <Flex justify="flex-end" align="center" h="100%">
            <Menu closeDelay={400} openDelay={100} shadow="md" trigger="hover">
              <Menu.Target>
                <UnstyledButton>
                  <IconMenu2 />
                </UnstyledButton>
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
