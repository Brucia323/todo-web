'use client';

import { ModalsProvider } from '@mantine/modals';
import React from 'react';

export default function ModalsRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ModalsProvider labels={{ confirm: '确认', cancel: '取消' }}>
      {children}
    </ModalsProvider>
  );
}
