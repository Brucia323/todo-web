import { ActionIcon } from '@mantine/core';
import { IconDashboard, IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MainLinkProps {
  url: string;
  children: React.ReactNode;
}

function MainLink({ url, children }: MainLinkProps) {
  const pathName = usePathname();

  return (
    <ActionIcon
      component={Link}
      href={url}
      size="xl"
      variant={pathName === url ? 'filled' : 'subtle'}
    >
      {children}
    </ActionIcon>
  );
}

const data = [
  { label: 'dashboard', url: '/todo/dashboard', icon: <IconDashboard /> },
  { label: 'todolist', url: '/todo/list', icon: <IconList /> },
];

export default function MainLinks() {
  const links = data.map((link) => (
    <MainLink key={link.label} url={link.url}>
      {link.icon}
    </MainLink>
  ));
  return <div>{links}</div>;
}
