'use client';

import { DatesProvider } from '@mantine/dates';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';
import React from 'react';

dayjs.locale('zh-cn');
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault('Asia/Shanghai');
dayjs.extend(customParseFormat);
dayjs.extend(duration);

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
