# ToggleButton

`ToggleButton` sigue la especificación ["Toggle button"](https://m3.material.io/components/buttons/overview) de Material Design 3. Visualmente es muy similar a [`Button`](./Button.md) — comparte `size`, `shape` y la misma familia de variantes (`elevated`, `filled`, `filled-tonal`, `outlined`) — pero se diferencia en dos aspectos clave:

1. **Es un control de estado**, no una acción puntual: requiere `selected`/`onSelectedChange` (ambos obligatorios) y refleja su estado como `aria-pressed`.
2. **Su tabla de color es distinta a la de `Button`** ("Toggle" vs. "Default" en la spec de M3) — el mismo `variant` produce colores diferentes según `selected`.

Además, al seleccionarse, la forma cambia (_shape-morph_): un `ToggleButton` `round` pasa a `square` y viceversa.

## Tabla de color "Toggle"

| `variant`      | No seleccionado (contenedor / contenido)                | Seleccionado (contenedor / contenido)                |
| -------------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `elevated`     | `surface` / `primary` (+ elevación 1)                   | `primary` / `on-primary` (+ elevación 1)             |
| `filled`       | `surface-variant` / `on-surface-variant`                | `primary` / `on-primary`                             |
| `filled-tonal` | `secondary-container` / `on-secondary-container`        | `secondary` / `on-secondary`                         |
| `outlined`     | transparente con borde `outline` / `on-surface-variant` | `inverse-surface` / `inverse-on-surface` (sin borde) |

> `ToggleButton` no soporta `variant="text"` — M3 no define un toggle button de tipo texto.

## Props

| Prop               | Tipo                                                     | Por defecto   | Descripción                                                                                                                                          |
| ------------------ | -------------------------------------------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`          | `'elevated' \| 'filled' \| 'filled-tonal' \| 'outlined'` | `'filled'`    | Variante visual. El color resultante depende también de `selected` — ver [Tabla de color "Toggle"](#tabla-de-color-toggle).                          |
| `size`             | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`                      | `'m'`         | Tamaño M3 Expressive, compartido con `Button`/`ButtonGroup`. Define el `min-height` (área táctil) y el padding horizontal, en reposo y al presionar. |
| `shape`            | `'round' \| 'square'`                                    | `'round'`     | Forma en reposo cuando `selected={false}`. Al seleccionarse, la forma cambia a la opuesta (_shape-morph_ round ↔ square).                            |
| `selected`         | `boolean`                                                | — (requerido) | Estado seleccionado, reflejado como `aria-pressed`.                                                                                                  |
| `onSelectedChange` | `(selected: boolean) => void`                            | — (requerido) | Se llama con el siguiente estado (`!selected`) cuando se activa el botón (click, `Enter` o `Space`).                                                 |
| `icon`             | `ReactNode`                                              | —             | Icono renderizado antes de la etiqueta.                                                                                                              |
| `children`         | `ReactNode`                                              | — (requerido) | Etiqueta del botón. Para botones icon-only, pasa `{null}` junto con `icon` y un `aria-label`.                                                        |
| `testId`           | `string`                                                 | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                          |
| `disabled`         | `boolean`                                                | `false`       | Deshabilita el botón, elimina los eventos de puntero y evita que se llame `onSelectedChange`.                                                        |
| `className`        | `string`                                                 | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                                           |
| `...rest`          | `ButtonHTMLAttributes<HTMLButtonElement>`                | —             | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz (incluyendo `onClick`, que se invoca antes que `onSelectedChange`).       |

## Ejemplos

### Uso standalone

```tsx
import { useState } from 'react';

import { ToggleButton } from '@poncegl/material-design-3';

function BoldToggle() {
  const [isBold, setIsBold] = useState(false);

  return (
    <ToggleButton
      variant="outlined"
      selected={isBold}
      onSelectedChange={setIsBold}
    >
      Bold
    </ToggleButton>
  );
}
```

### Las cuatro variantes, seleccionado y no seleccionado

```tsx
<ToggleButton variant="elevated" selected={false} onSelectedChange={...}>Elevated</ToggleButton>
<ToggleButton variant="elevated" selected onSelectedChange={...}>Elevated</ToggleButton>

<ToggleButton variant="filled" selected={false} onSelectedChange={...}>Filled</ToggleButton>
<ToggleButton variant="filled" selected onSelectedChange={...}>Filled</ToggleButton>

<ToggleButton variant="filled-tonal" selected={false} onSelectedChange={...}>Filled Tonal</ToggleButton>
<ToggleButton variant="filled-tonal" selected onSelectedChange={...}>Filled Tonal</ToggleButton>

<ToggleButton variant="outlined" selected={false} onSelectedChange={...}>Outlined</ToggleButton>
<ToggleButton variant="outlined" selected onSelectedChange={...}>Outlined</ToggleButton>
```

### Con icono

```tsx
<ToggleButton
  variant="filled-tonal"
  selected={isFavorite}
  onSelectedChange={setIsFavorite}
  icon={<StarIcon />}
>
  Favorito
</ToggleButton>
```

### Icon-only (con `aria-label`)

```tsx
<ToggleButton
  variant="outlined"
  selected={isMuted}
  onSelectedChange={setIsMuted}
  icon={<MuteIcon />}
  aria-label="Silenciar"
>
  {null}
</ToggleButton>
```

### Dentro de un `ButtonGroup`

`ToggleButton` es el item más común dentro de [`ButtonGroup`](./ButtonGroup.md): el grupo resuelve el espaciado/forma del layout, mientras que cada `ToggleButton` controla su propio estado de selección.

```tsx
<ButtonGroup
  aria-label="Formato de texto"
  variant="connected"
  selectionMode="multi-select"
>
  <ToggleButton selected={bold} onSelectedChange={setBold}>
    Bold
  </ToggleButton>
  <ToggleButton selected={italic} onSelectedChange={setItalic}>
    Italic
  </ToggleButton>
  <ToggleButton selected={underline} onSelectedChange={setUnderline}>
    Underline
  </ToggleButton>
</ButtonGroup>
```

### Estado deshabilitado

```tsx
<ToggleButton variant="filled" selected={false} onSelectedChange={...} disabled>
  No disponible
</ToggleButton>
```

### Con `testId` para pruebas

```tsx
<ToggleButton
  testId="bold-toggle"
  selected={isBold}
  onSelectedChange={setIsBold}
>
  Bold
</ToggleButton>;

// En el test:
screen.getByTestId('bold-toggle');
```

## Accesibilidad

- **`aria-pressed`**: refleja siempre el valor de `selected` (`"true"`/`"false"`), comunicando el estado de alternancia a tecnologías asistivas. No es necesario (ni recomendable) establecer `aria-pressed` manualmente vía `...rest`.
- **Nombre accesible**: si el botón solo tiene `icon` (sin `children` visible), proporciona un `aria-label` descriptivo — igual que en [`Button`](./Button.md#aria-label-para-botones-icon-only).
- **Comportamiento con teclado**: hereda el comportamiento nativo de `<button>` — `Enter` y `Space` invocan `onSelectedChange` con `!selected`; cuando está `disabled`, queda fuera del flujo de tabulación.
- **Touch target**: igual que `Button`, el `min-height` depende de `size` — `'m'` (48px) cumple el mínimo de 48×48dp recomendado por M3.
