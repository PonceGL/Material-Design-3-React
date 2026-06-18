import { cn } from '@/lib/cn';

export type AssistChipVariant =
  | 'primary'
  | 'filled'
  | 'elevated'
  | 'tonal'
  | 'outlined';

const base = [
  'inline-flex items-center justify-center',
  'h-8 rounded-[8px] px-4',
  'text-[14px] font-medium tracking-[0.1px]',
  'transition-colors duration-200',
].join(' ');

const variantClasses: Record<AssistChipVariant, string> = {
  primary: 'bg-md-primary text-md-on-primary',
  filled: 'bg-md-surface-variant text-md-on-surface-variant',
  elevated: 'bg-md-surface shadow-md-elevation-1',
  tonal: 'bg-md-secondary-container text-md-on-secondary-container',
  outlined:
    'bg-transparent border border-md-outline-variant text-md-on-surface-variant',
};

interface AssistChipProps {
  selected?: boolean;
  onSelectedChange?: (isSelected: boolean) => void;
  variant?: AssistChipVariant;
  children: React.ReactNode;
  className?: string;
}

const AssistChip = ({
  selected = false,
  onSelectedChange,
  variant = 'primary',
}: AssistChipProps) => {
  return (
    <>
      <button
        className={cn(base, variantClasses[variant])}
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
