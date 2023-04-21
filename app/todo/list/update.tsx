import { useDisclosure } from '@mantine/hooks';
import { Dialog, Group, Button, Text, NumberInput } from '@mantine/core';
import { useState } from 'react';
import { HTTP_METHODS } from 'next/dist/server/web/http';

interface UpdateProps {
  min: number;
  max: number;
}

export default function Update({ min, max }: UpdateProps) {
  const [value, setValue] = useState<number | ''>(min);
  const [loading, setLoading] = useState(false);
  const [opened, { toggle, close }] = useDisclosure(false);

  const handleClick = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/todo', { method: HTTP_METHODS[4] });
    } catch {
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
          <Button onClick={close} loading={loading}>
            提交
          </Button>
        </Group>
      </Dialog>
    </>
  );
}
