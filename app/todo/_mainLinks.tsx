import { ActionIcon } from '@mantine/core';
import { IconDashboard, IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MainLinkProps {
  href: string;
  children: React.ReactNode;
}

function MainLink({ href, children }: MainLinkProps) {
  const pathName = usePathname();

  return (
    <Link href={href}>
      <ActionIcon size="xl" variant={pathName === href ? 'filled' : 'subtle'}>
        {children}
      </ActionIcon>
    </Link>
  );
}

const data = [
  { label: 'dashboard', href: '/todo/dashboard', icon: <IconDashboard /> },
  { label: 'todolist', href: '/todo/list', icon: <IconList /> },
];

export function MainLinks() {
  const links = data.map((link) => (
    <MainLink key={link.label} href={link.href}>
      {link.icon}
    </MainLink>
  ));
  return <div>{links}</div>;
}
