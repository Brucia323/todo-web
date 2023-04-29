'use client';

import { Container, Stack, Tabs } from '@mantine/core';
import React from 'react';

export default function Settings({
  children,
  time,
  personal,
}: {
  children: React.ReactNode;
  time: React.ReactNode;
  personal: React.ReactNode;
}) {
  return (
    <Container>
      <Stack>
        {children}
        <Tabs defaultValue="time">
          <Tabs.List>
            <Tabs.Tab value="time">你的时间</Tabs.Tab>
            <Tabs.Tab value="personal">个人设置</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="time">{time}</Tabs.Panel>
          <Tabs.Panel value="personal" pt="xs">
            {personal}
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
