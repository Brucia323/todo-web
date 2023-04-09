'use client';

import {
  ActionIcon,
  AppShell,
  AppShellProps,
  Flex,
  Header,
} from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

const Layout: React.FC<AppShellProps> = ({ children }) => {
  return (
    <AppShell
      header={
        <Header height={60} pl="lg">
          <Flex align="center" h="100%">
            <Link href="/">
              <ActionIcon size="lg">
                <IconHome />
              </ActionIcon>
            </Link>
          </Flex>
        </Header>
      }
    >
      {children}
    </AppShell>
  );
};

export default Layout;
