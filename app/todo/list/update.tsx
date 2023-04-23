import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import { Dialog, Group, Button, Text, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { UserType } from '@/lib/types';
import { notifications } from '@mantine/notifications';

interface UpdateProps {
  min: number;
  max: number;
  id: number;
}

export default function Update({ min, max, id }: UpdateProps) {
  const [value, setValue] = useState<number | ''>(min);
  const [loading, setLoading] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);
  const [user] = useSessionStorage<UserType>({ key: 'user' });

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/todo/${id}`, {
        method: HTTP_METHODS[3],
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ currentAmount: value }),
      });
      if (response.status === 201) {
        notifications.show({ message: '更新成功', color: 'green' });
        close();
      }
    } catch {
      notifications.show({ message: '更新失败', color: 'red' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Group position="center">
        <Button onClick={toggle} variant="subtle" size="xs">
          更新
        </Button>
      </Group>

      <Dialog
        opened={opened}
        withCloseButton
        onClose={close}
        size="lg"
        radius="md"
      >
        <Text size="sm" mb="xs" weight={500}>
          更新进度
        </Text>

        <Group align="flex-end">
          <NumberInput
            min={min}
            max={max}
            defaultValue={min}
            type="number"
            onChange={setValue}
          />
          <Button onClick={handleClick} loading={loading}>
            提交
          </Button>
        </Group>
      </Dialog>
    </>
  );
}
