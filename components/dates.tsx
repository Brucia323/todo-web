'use client';

import { DatesProvider } from '@mantine/dates';
import React from 'react';
import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';

dayjs.locale('zh-cn');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');

export default function DatesRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DatesProvider settings={{ locale: 'zh-cn', firstDayOfWeek: 0 }}>
      {children}
    </DatesProvider>
  );
}