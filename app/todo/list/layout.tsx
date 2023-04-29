'use client';

import { Container, Flex } from '@mantine/core';
import React from 'react';

export default function Layout({
  children,
  create,
}: {
  children: React.ReactNode;
  create: React.ReactNode;
}) {
  return (
    <Container>
      <Flex align="center" mih={50}>
        {create}
      </Flex>
      {children}
    </Container>
  );
}
