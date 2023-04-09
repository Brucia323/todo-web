'use client';

import { CacheProvider } from '@emotion/react';
import {
  MantineProvider,
  MantineProviderProps,
  useEmotionCache,
} from '@mantine/core';
import { useServerInsertedHTML } from 'next/navigation';
import React from 'react';

const RootStyleRegistry: React.FC<MantineProviderProps> = ({ children }) => {
  const cache = useEmotionCache();
  cache.compat = true;

  useServerInsertedHTML(() => (
    <style
      data-emotion={`${cache.key} ${Object.keys(cache.inserted).join(' ')}`}
      dangerouslySetInnerHTML={{
        __html: Object.values(cache.inserted).join(' '),
      }}
    />
  ));

  return (
    <CacheProvider value={cache}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{ colorScheme: 'dark' }}
      >
        {children}
      </MantineProvider>
    </CacheProvider>
  );
};

export default RootStyleRegistry;
