import type { HTMLAttributes, ReactNode } from 'react';

import type { BaseComponentProps } from '@/components/shared/BaseComponent.types';

export interface ListItemProps
  extends BaseComponentProps, HTMLAttributes<HTMLDivElement> {
  /** Leading slot: avatar, icon, image, video thumbnail, or selection control. */
  leading?: ReactNode;
  /** Small text above the label (M3 Expressive). Presence makes the item three-line (88dp). */
  overline?: string;
  /** Primary text. Required. */
  label: string;
  /** Secondary text below the label, 1-3 lines. Presence makes the item two-line (72dp) if `overline` is absent. */
  supportingText?: string;
  /** Trailing slot: icon, text, or selection control. */
  trailing?: ReactNode;
  /** Presentational selected state — container becomes secondary-container. */
  selected?: boolean;
  /** Disabled state — content rendered at 0.38 opacity, no interactions. */
  disabled?: boolean;
  /** If provided, the item renders an inner <button> and becomes a single-action item. */
  onClick?: () => void;
}
