import { useState } from 'react';

import { ToggleButton } from '@poncegl/material-design-3';

export function ToggleButtonSection() {
  const [isSelectedRound, setIsSelectedRound] = useState<boolean>(false);
  const [isSelectedSquare, setIsSelectedSquare] = useState<boolean>(false);

  return (
    <section className="w-full min-h-40 bg-md-surface px-6 py-10 text-md-on-surface">
      <h2>Toggle Button</h2>
      <div className="w-full flex justify-center items-center gap-3">
        <ToggleButton
          variant="filled"
          shape="square"
          selected={isSelectedRound}
          onSelectedChange={(next) => {
            setIsSelectedRound(next);
          }}
        >
          Toggle Button
        </ToggleButton>

        <ToggleButton
          variant="filled"
          shape="round"
          selected={isSelectedSquare}
          onSelectedChange={(next) => {
            setIsSelectedSquare(next);
          }}
        >
          Toggle Button Round
        </ToggleButton>
      </div>
    </section>
  );
}
