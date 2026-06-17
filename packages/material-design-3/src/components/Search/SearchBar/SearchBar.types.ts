import type { InputHTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

export interface SearchBarProps
  extends BaseComponentProps, InputHTMLAttributes<HTMLInputElement> {
  /** Leading icon (e.g. a search icon, or a navigation menu/back icon). */
  leadingIcon?: ReactNode;
  /**
   * Up to two actions at the end of the field (e.g. an `IconButton` from
   * this library with an icon provided by the consumer) and/or an avatar.
   * Icons themselves are out of scope for this library.
   */
  trailingActions?: ReactNode;
}
