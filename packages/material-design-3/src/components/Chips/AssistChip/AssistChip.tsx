import { cn } from '@/lib/cn';

interface AssistChipProps {
  selected?: boolean;
  onSelectedChange?: (isSelected: boolean) => void;
}

const AssistChip = ({
  selected = false,
  onSelectedChange,
}: AssistChipProps) => {
  return (
    <>
      <button
        className={cn(
          'rounded-lg text-md-on-primary px-2 h-8 bg-md-primary text-sm font-medium tracking-[0.1px]',
          selected
            ? 'bg-transparent border border-md-outline text-md-on-surface-variant'
            : 'bg-md-primary text-md-on-primary border-transparent',
        )}
        onClick={() => {
          console.log(
            '1. El botón fue presionado. ¿Estaba seleccionado (true/false)?',
            selected,
          );
          console.log('2. Avisando al padre que debe cambiar a:', !selected);
          onSelectedChange?.(!selected);
        }}
      >
        AssistChip
      </button>
    </>
  );
};

export default AssistChip;
