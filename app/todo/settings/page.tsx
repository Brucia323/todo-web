'use client';

import {
  Container,
  Stack,
  Tabs,
  Title,
} from '@mantine/core';
import Time from './time';

export default function Settings() {
  return (
    <Container>
      <Stack>
        <Title>设置</Title>
        <Tabs defaultValue="time">
          <Tabs.List>
            <Tabs.Tab value="time">你的时间</Tabs.Tab>
            <Tabs.Tab value="personal">个人设置</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panel value="time">
            <Time />
          </Tabs.Panel>
          <Tabs.Panel value="personal" pt="xs">
            Messages tab content
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </Container>
  );
}
