'use client';

import { Button, Card, Divider, Group, Stack, Title } from '@mantine/core';

export default function Personal() {
  return (
    <Stack>
      <Card shadow="md" withBorder>
        <Stack>
          <Title>修改密码</Title>
          <Divider />
          <Group>
            <Button>修改密码</Button>
          </Group>
        </Stack>
      </Card>
    </Stack>
  );
}
