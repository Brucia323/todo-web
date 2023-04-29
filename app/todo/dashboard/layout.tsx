'use client';

import { Container, Stack } from '@mantine/core';
import React from 'react';

export default function Layout({
  children,
  efficiency,
}: {
  children: React.ReactNode;
  efficiency: React.ReactNode;
}) {
  return (
    <Container>
      <Stack>
        {children}
        {efficiency}
      </Stack>
    </Container>
  );
}
