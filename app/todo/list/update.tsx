import { UserType } from '@/lib/types';
import { Button, Group, Modal, NumberInput, Stack } from '@mantine/core';
import { useDisclosure, useSessionStorage } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { HTTP_METHODS } from 'next/dist/server/web/http';
import { useState } from 'react';

interface UpdateProps {
  min: number;
  max: number;
  id: number;
}

export default function Update({ min, max, id }: UpdateProps) {
  const [value, setValue] = useState<number | ''>(min);
  const [loading, setLoading] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
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
      <Modal
        opened={opened}
        onClose={close}
        title="更新进度"
        overlayProps={{ opacity: 0, blur: 8 }}
      >
        <Stack>
          <NumberInput
            min={min}
            max={max}
            defaultValue={min}
            type="number"
            onChange={setValue}
          />
          <Group position="right">
            <Button onClick={handleClick} loading={loading}>
              提交
            </Button>
          </Group>
        </Stack>
      </Modal>

      <Button onClick={open} variant="subtle" size="xs">
        更新
      </Button>
    </>
  );
}
