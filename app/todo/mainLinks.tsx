import { ActionIcon, NavLink } from '@mantine/core';
import { IconDashboard, IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MainLinkProps {
  url: string;
  icon: React.ReactNode;
}

function MainLink({ url, icon }: MainLinkProps) {
  const pathName = usePathname();

  return (
    <NavLink
      component={Link}
      href={url}
      active={pathName === url}
      variant="filled"
      icon={icon}
      styles={{ icon: { margin: 0 } }}
      sx={{ borderRadius: '0.5rem' }}
    />
  );
}

const data = [
  { label: '仪表板', url: '/todo/dashboard', icon: <IconDashboard /> },
  { label: '列表', url: '/todo/list', icon: <IconList /> },
];

export default function MainLinks() {
  const links = data.map((link) => (
    <MainLink key={link.label} url={link.url} icon={link.icon} />
  ));

  return <div>{links}</div>;
}
