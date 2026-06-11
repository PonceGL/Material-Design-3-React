import { useState } from 'react';

import { IconButton, ToggleIconButton } from '@poncegl/material-design-3';

const SettingsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65A.488.488 0 0 0 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.23-.09-.49 0-.61.22l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.23.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64zM12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5z" />
  </svg>
);

const DeleteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
  </svg>
);

const PlusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M19 13H13v6h-2v-6H5v-2h6V5h2v6h6v2z" />
  </svg>
);

const ArrowIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
  >
    <path d="M12 4l-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8-8-8z" />
  </svg>
);

export function IconButtonSection() {
  const [isSelectedRound, setIsSelectedRound] = useState<boolean>(false);
  const [isSelectedSquare, setIsSelectedSquare] = useState<boolean>(false);
  return (
    <section className="w-full min-h-40 bg-md-surface px-6 py-10 text-md-on-surface">
      <h2>Icon Button</h2>
      <div className="w-full flex justify-center items-center gap-3">
        <IconButton variant="filled" shape="square" icon={<SettingsIcon />} />
        <IconButton variant="filled" shape="round" icon={<DeleteIcon />} />
        <IconButton
          variant="standard"
          shape="square"
          size="l"
          icon={<PlusIcon />}
        />
        <IconButton
          variant="filled"
          shape="round"
          size="xs"
          icon={<ArrowIcon />}
        />
        <IconButton
          variant="tonal"
          shape="round"
          size="xs"
          icon={<ArrowIcon />}
        />
        <IconButton
          variant="outlined"
          shape="round"
          size="xs"
          icon={<ArrowIcon />}
        />
      </div>
      <div className="w-full flex justify-center items-center gap-3">
        <ToggleIconButton
          variant="filled"
          shape="square"
          icon={<SettingsIcon />}
          checked={isSelectedSquare}
          onCheckedChange={setIsSelectedSquare}
        />
        <ToggleIconButton
          variant="filled"
          shape="round"
          icon={<DeleteIcon />}
          checked={isSelectedRound}
          onCheckedChange={setIsSelectedRound}
        />
      </div>
    </section>
  );
}
