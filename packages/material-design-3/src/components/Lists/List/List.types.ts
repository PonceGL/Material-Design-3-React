import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

export type ListVariant = 'standard' | 'segmented';

export interface ListProps
  extends BaseComponentProps, HTMLAttributes<HTMLDivElement> {
  /** Visual style. 'segmented' gives each item its own container with a gap between items. */
  variant?: ListVariant; // default 'standard'
  /** ListItem elements. */
  children: ReactNode;
}
