'use client';

import {
  ActionIcon,
  AppShell,
  Flex,
  Header,
} from '@mantine/core';
import { IconHome } from '@tabler/icons-react';
import Link from 'next/link';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <AppShell
      padding="md"
      header={
        <Header height={60} p="xs">
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
}
