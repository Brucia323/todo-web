'use client';

import { ActionIcon, AppShell, Flex, Header, Navbar } from '@mantine/core';
import React from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <AppShell
      padding="md"
      navbar={
        <Navbar width={{ base: 300 }} height={500} p="xs">
          Todo
        </Navbar>
      }
      header={
        <Header height={60} p="xs">
          Todo
        </Header>
      }
    >
      {children}
    </AppShell>
  );
}
