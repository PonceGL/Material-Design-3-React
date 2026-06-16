# SegmentedButton

`SegmentedButton` sigue la especificación ["Segmented buttons" (M3 clásico)](https://m3.material.io/components/segmented-buttons/overview) de Material Design 3: un grupo de 2 a 5 segmentos de **igual ancho** y del mismo tipo (`SegmentedButtonItem`), con un único estilo visual fijo (`outline` ↔ `secondary-container`) y una altura fija de 40dp.

> **Nota oficial de M3**: _"Segmented buttons are no longer recommended in the Material 3 expressive update... use the connected button group instead, which has mostly the same functionality but with an updated visual design."_ `SegmentedButton` se mantiene en esta librería para proyectos que sigan el M3 "clásico". Para proyectos M3 Expressive, usa [`ButtonGroup`](./ButtonGroup.md) con `variant="connected"`.

## `SegmentedButton` vs. `ButtonGroup` (`connected`)

|                    | `SegmentedButton`                                | `ButtonGroup` (`connected`)                                    |
| ------------------ | ------------------------------------------------ | -------------------------------------------------------------- |
| Estilo visual      | Único y fijo (`outline` ↔ `secondary-container`) | Configurable (`filled`/`tonal`/`outlined`/`elevated` por item) |
| Tamaño             | Único — 40px (+ density)                         | `xs`/`s`/`m`/`l`/`xl`                                          |
| Ancho de segmentos | Iguales (`flex: 1`)                              | Según el contenido de cada item                                |
| Tipos de hijos     | Todos `SegmentedButtonItem`                      | Mezcla de `Button`/`IconButton`/`ToggleButton`                 |

`SegmentedButton` no tiene props `variant` ni `size` — su estilo visual y altura son fijos. Si necesitas tamaños M3 Expressive (`xs`-`xl`), variantes de color por item, o composición libre de `Button`/`IconButton`/`ToggleButton`, usa [`ButtonGroup`](./ButtonGroup.md) en su lugar.

## Props

### `SegmentedButton`

| Prop            | Tipo                                                        | Por defecto   | Descripción                                                                                                                                                           |
| --------------- | ----------------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selectionMode` | `'single-select' \| 'multi-select' \| 'selection-required'` | — (requerido) | Documenta el comportamiento de selección de los items internos. Se refleja como `data-selection-mode` en el contenedor — ver [Gestión de estado](#gestión-de-estado). |
| `children`      | `ReactNode`                                                 | — (requerido) | Items del grupo (`SegmentedButtonItem`, 2-5 recomendado).                                                                                                             |
| `testId`        | `string`                                                    | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                                           |
| `className`     | `string`                                                    | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                                                            |
| `...rest`       | `HTMLAttributes<HTMLDivElement>`                            | —             | Cualquier atributo HTML válido para `<div>` se propaga al elemento raíz (incluyendo `aria-label`, ver [Accesibilidad](#accesibilidad)).                               |

### `SegmentedButtonItem`

| Prop       | Tipo                                      | Por defecto   | Descripción                                                                                                                                                               |
| ---------- | ----------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `selected` | `boolean`                                 | — (requerido) | Estado seleccionado del item, reflejado como `aria-pressed`. Cuando es `true`, un checkmark reemplaza `icon` — ver [Comportamiento del icono](#comportamiento-del-icono). |
| `onClick`  | `() => void`                              | — (requerido) | Se llama cuando el item se activa (click, `Enter` o `Space`). No recibe argumentos — el consumidor decide el siguiente estado.                                            |
| `label`    | `string`                                  | — (requerido) | Texto visible del item. También provee su nombre accesible — ver [Accesibilidad](#accesibilidad).                                                                         |
| `icon`     | `ReactNode`                               | —             | Icono mostrado antes de `label` mientras `selected={false}`.                                                                                                              |
| `disabled` | `boolean`                                 | `false`       | Deshabilita el item y elimina los eventos de puntero.                                                                                                                     |
| `testId`   | `string`                                  | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                                               |
| `...rest`  | `ButtonHTMLAttributes<HTMLButtonElement>` | —             | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz.                                                                                               |

## Gestión de estado

`SegmentedButton` **no gestiona el estado de selección**: cada `SegmentedButtonItem` recibe su `selected` y `onClick` desde el componente padre, que decide qué item(s) están seleccionados según `selectionMode`.

```tsx
import { useState } from 'react';

import {
  SegmentedButton,
  SegmentedButtonItem,
} from '@poncegl/material-design-3';

function ViewRange() {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');

  return (
    <SegmentedButton selectionMode="single-select" aria-label="Rango de tiempo">
      <SegmentedButtonItem
        label="Day"
        selected={view === 'day'}
        onClick={() => setView('day')}
      />
      <SegmentedButtonItem
        label="Week"
        selected={view === 'week'}
        onClick={() => setView('week')}
      />
      <SegmentedButtonItem
        label="Month"
        selected={view === 'month'}
        onClick={() => setView('month')}
      />
    </SegmentedButton>
  );
}
```

- **`single-select` / `selection-required`**: el padre desactiva el resto de items al seleccionar uno nuevo (como en el ejemplo anterior). En `selection-required`, además evita que el último item seleccionado se deseleccione.
- **`multi-select`**: cada item alterna su propio estado de forma independiente, sin afectar a los demás.

## Estilo y forma

`SegmentedButton` no tiene props `variant` ni `size` — el estilo visual y la altura (40dp + density) son fijos según la especificación M3 "clásica".

### Color por estado

| Estado          | Fondo                 | Borde           | Texto / icono            |
| --------------- | --------------------- | --------------- | ------------------------ |
| No seleccionado | transparente          | `outline` (1px) | `on-surface`             |
| Seleccionado    | `secondary-container` | `outline` (1px) | `on-secondary-container` |

### Forma

Los extremos del grupo (primer y último `SegmentedButtonItem`) reciben esquina completa (`corner-full`, 3rem); los segmentos intermedios reciben esquina reducida (`corner-extra-small`, 0.25rem). Esta forma se resuelve por CSS según la posición del item (`:first-child`/`:last-child`) — no requiere ninguna prop.

## Comportamiento del icono

`icon` se muestra antes de `label` mientras `selected={false}`. Cuando `selected={true}`, un checkmark del sistema **reemplaza** a `icon` como gráfico inicial — incluso si no se proporciona `icon`:

```tsx
<SegmentedButtonItem
  label="Left"
  icon={<AlignLeftIcon />}
  selected={false}
  onClick={() => setAlign('left')}
/>;
{
  /* selected={true} → muestra el checkmark, no AlignLeftIcon */
}
<SegmentedButtonItem
  label="Left"
  icon={<AlignLeftIcon />}
  selected
  onClick={() => setAlign('left')}
/>;
```

## Ejemplos

### `selectionMode="multi-select"`

```tsx
function TextFormat() {
  const [bold, setBold] = useState(false);
  const [italic, setItalic] = useState(false);
  const [underline, setUnderline] = useState(false);

  return (
    <SegmentedButton selectionMode="multi-select" aria-label="Formato de texto">
      <SegmentedButtonItem
        label="Bold"
        selected={bold}
        onClick={() => setBold((v) => !v)}
      />
      <SegmentedButtonItem
        label="Italic"
        selected={italic}
        onClick={() => setItalic((v) => !v)}
      />
      <SegmentedButtonItem
        label="Underline"
        selected={underline}
        onClick={() => setUnderline((v) => !v)}
      />
    </SegmentedButton>
  );
}
```

### Item deshabilitado

```tsx
<SegmentedButton selectionMode="single-select" aria-label="Alineación">
  <SegmentedButtonItem label="Left" selected={false} onClick={...} />
  <SegmentedButtonItem label="Center" selected={false} onClick={...} disabled />
  <SegmentedButtonItem label="Right" selected={false} onClick={...} />
</SegmentedButton>
```

### Con `testId` para pruebas

```tsx
<SegmentedButton
  testId="view-range"
  selectionMode="single-select"
  aria-label="Rango de tiempo"
>
  <SegmentedButtonItem testId="view-range-day" label="Day" selected onClick={...} />
  ...
</SegmentedButton>;

// En el test:
screen.getByTestId('view-range');
screen.getByTestId('view-range-day');
```

## Accesibilidad

- **`aria-label` en el grupo**: `role="group"` necesita un nombre accesible. Pasa siempre `aria-label` (o `aria-labelledby`) describiendo el propósito del grupo, por ejemplo `aria-label="Rango de tiempo"`.
- **`aria-pressed` en cada item**: `SegmentedButtonItem` refleja siempre `selected` como `aria-pressed`, comunicando el estado seleccionado a tecnologías asistivas.
- **Nombre accesible**: cada `SegmentedButtonItem` obtiene su nombre accesible del texto visible en `label` — no es necesario un `aria-label` adicional.
- **Navegación con teclado**: cada item es un `<button>` nativo independiente — `Tab`/`Shift+Tab` los recorre en orden de DOM, y `Enter`/`Space` activan el item enfocado.
