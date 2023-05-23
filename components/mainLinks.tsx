import { NavLink, Stack, Tooltip } from '@mantine/core';
import { IconDashboard, IconList } from '@tabler/icons-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

interface MainLinkProps {
  url: string;
  icon: React.ReactNode;
  label: string;
}

function MainLink({ url, icon, label }: MainLinkProps) {
  const pathName = usePathname();

  return (
    <Tooltip label={label} position="right">
      <NavLink
        component={Link}
        href={url}
        active={pathName === url}
        variant="filled"
        icon={icon}
        styles={{ icon: { margin: 0 } }}
        sx={{ borderRadius: '0.5rem', width: '3rem', height: '3rem' }}
      />
    </Tooltip>
  );
}

const data = [
  { label: '仪表板', url: '/todo/dashboard', icon: <IconDashboard /> },
  { label: '列表', url: '/todo/list', icon: <IconList /> },
];

export default function MainLinks() {
  const links = data.map((link) => <MainLink key={link.label} {...link} />);

  return <Stack>{links}</Stack>;
}
