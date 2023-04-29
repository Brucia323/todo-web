import { UserType } from '@/lib/types';
import { Button, Text } from '@mantine/core';
import { useSessionStorage } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { notifications } from '@mantine/notifications';
import { HTTP_METHODS } from 'next/dist/server/web/http';

interface DeleteProps {
  id: number;
  name: string;
}

export default function Delete({ id, name }: DeleteProps) {
  const [user] = useSessionStorage<UserType>({ key: 'user' });

  const openModal = () =>
    modals.openConfirmModal({
      title: '删除任务',
      centered: true,
      children: <Text size="sm">你确定要删除【{name}】吗?</Text>,
      confirmProps: { color: 'red' },
      overlayProps: { opacity: 0.75, blur: 8 },
      onConfirm: async () => {
        try {
          const response = await fetch(`/api/todo/${id}`, {
            method: HTTP_METHODS[5],
            headers: {
              Authorization: user.token,
            },
          });
          if (response.status === 204) {
            notifications.show({ message: '删除成功', color: 'green' });
          }
        } catch {
          notifications.show({ message: '删除失败', color: 'red' });
        }
      },
    });

  return (
    <Button onClick={openModal} variant="subtle" size="xs" color="red">
      删除
    </Button>
  );
}
