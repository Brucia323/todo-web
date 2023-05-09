'use client';

import { Container, Stack } from '@mantine/core';
import React from 'react';

export default function Layout({
  children,
  efficiency,
  program,
}: {
  children: React.ReactNode;
  efficiency: React.ReactNode;
  program: React.ReactNode;
}) {
  return (
    <Container>
      <Stack>
        {children}
        {efficiency}
        {program}
      </Stack>
    </Container>
  );
}
