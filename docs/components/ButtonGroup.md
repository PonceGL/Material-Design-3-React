# ButtonGroup

El componente `ButtonGroup` sigue la especificación [Button groups de Material Design 3](https://m3.material.io/components/button-groups/overview). Es un contenedor sin estilo de color propio que organiza entre 2 y 5 botones (`Button`, `IconButton` o `ToggleButton`) como un único `role="group"`, resolviendo el espaciado y la forma de sus hijos según la variante elegida.

## Variantes

|               | `variant="standard"`                                                                                                                           | `variant="connected"`                                                                                                                                                                                    |
| ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Espaciado** | Gap entre items escalado por `size`: 18px (`xs`), 12px (`s`), 8px (`m`/`l`/`xl`).                                                              | Gap fijo de 2px entre items, independiente de `size`.                                                                                                                                                    |
| **Forma**     | El item seleccionado (`aria-pressed="true"`) crece respecto a sus vecinos ("squish-expand", `flex-grow: 1.5` vs `1`) con una transición suave. | Cada item recibe un corner-radius según `size`: 4px (`xs`), 8px (`s`/`m`), 16px (`l`), 20px (`xl`). Si `shape="round"`, además las esquinas externas del primer y último item se redondean por completo. |

`ButtonGroup` no gestiona el estado de selección: cada hijo (típicamente `ToggleButton`) controla su propio `selected`/`onSelectedChange`. La prop `selectionMode` solo documenta la intención del grupo (ver [Modo de selección](#modo-de-selección)) — la lógica de "solo uno seleccionado" o "al menos uno seleccionado" la implementa el componente padre.

> **Nota**: si necesitas un grupo de segmentos de **igual ancho** con un único estilo `outlined` (el "M3 clásico" de segmented buttons, sin `variant`/`size`), usa `SegmentedButton` en su lugar. `ButtonGroup` cubre el patrón M3 Expressive más reciente, con tamaños XS-XL y composición libre de items.

## Props

| Prop            | Tipo                                                        | Por defecto   | Descripción                                                                                                                                        |
| --------------- | ----------------------------------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`       | `'standard' \| 'connected'`                                 | `'standard'`  | Variante de layout. Ver [Variantes](#variantes).                                                                                                   |
| `size`          | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`                         | `'m'`         | Tamaño M3 Expressive, compartido con `Button`/`ToggleButton`. Define el gap (`standard`) o el corner-radius por item (`connected`).                |
| `shape`         | `'round' \| 'square'`                                       | `'round'`     | Forma en reposo de los items. En `connected` con `shape="round"`, redondea por completo las esquinas externas del primer y último item.            |
| `selectionMode` | `'single-select' \| 'multi-select' \| 'selection-required'` | —             | Documenta el comportamiento de selección de los items internos. Se refleja como `data-selection-mode` en el contenedor; no añade lógica de estado. |
| `children`      | `ReactNode`                                                 | — (requerido) | Items del grupo (`Button`, `IconButton` o `ToggleButton`, 2-5 recomendado).                                                                        |
| `testId`        | `string`                                                    | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                        |
| `className`     | `string`                                                    | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                                         |
| `...rest`       | `HTMLAttributes<HTMLDivElement>`                            | —             | Cualquier atributo HTML válido para `<div>` se propaga al elemento raíz (incluyendo `aria-label`, ver [Accesibilidad](#accesibilidad)).            |

## Color

`ButtonGroup` **no define ningún token de color**: el contenedor es completamente transparente. Todo el color proviene de cada item según su propia `variant` (`Button` o `ToggleButton`).

## Modo de selección

`selectionMode` describe cómo se relacionan los `ToggleButton` dentro del grupo, pero la implementación del estado vive en el componente padre:

- **`single-select`** — A lo sumo un item seleccionado. El padre desactiva el resto al seleccionar uno nuevo.
- **`multi-select`** — Cualquier número de items puede estar seleccionado de forma independiente.
- **`selection-required`** — Como `single-select`, pero el padre evita que el último item seleccionado se deseleccione (siempre debe quedar exactamente uno).

## Ejemplos

### Uso básico — `variant="standard"`

```tsx
import { useState } from 'react';

import { ButtonGroup, ToggleButton } from '@poncegl/material-design-3';

function ViewRange() {
  const [selected, setSelected] = useState([false, true, false]);
  const labels = ['Day', 'Week', 'Month'];

  return (
    <ButtonGroup aria-label="Rango de tiempo">
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          selected={selected[index]}
          onSelectedChange={(next) =>
            setSelected((prev) => prev.map((v, i) => (i === index ? next : v)))
          }
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
```

### `variant="connected"`

```tsx
<ButtonGroup aria-label="Categoría" variant="connected">
  <ToggleButton
    selected={selected === 'music'}
    onSelectedChange={() => select('music')}
  >
    Music
  </ToggleButton>
  <ToggleButton
    selected={selected === 'podcasts'}
    onSelectedChange={() => select('podcasts')}
  >
    Podcasts
  </ToggleButton>
  <ToggleButton
    selected={selected === 'audiobooks'}
    onSelectedChange={() => select('audiobooks')}
  >
    Audiobooks
  </ToggleButton>
</ButtonGroup>
```

### Children mixtos (`Button` + `ToggleButton`)

```tsx
import { Button, ButtonGroup, ToggleButton } from '@poncegl/material-design-3';

<ButtonGroup aria-label="Acciones de búsqueda">
  <Button variant="outlined" icon={<SearchIcon />} aria-label="Buscar" />
  <Button variant="outlined">Cancelar</Button>
  <ToggleButton
    selected={isFavorite}
    onSelectedChange={setIsFavorite}
    icon={<StarIcon />}
  >
    Favorito
  </ToggleButton>
</ButtonGroup>;
```

### `selectionMode="selection-required"`

```tsx
function SizePicker() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const labels = ['S', 'M', 'L'];

  return (
    <ButtonGroup
      aria-label="Tamaño"
      variant="connected"
      selectionMode="selection-required"
    >
      {labels.map((label, index) => (
        <ToggleButton
          key={label}
          selected={selectedIndex === index}
          onSelectedChange={(next) => {
            // selection-required: ignora el intento de deseleccionar el único item activo
            if (next) setSelectedIndex(index);
          }}
        >
          {label}
        </ToggleButton>
      ))}
    </ButtonGroup>
  );
}
```

### Item deshabilitado

```tsx
<ButtonGroup aria-label="Alineación">
  <ToggleButton selected={false} onSelectedChange={...}>Left</ToggleButton>
  <ToggleButton selected={false} onSelectedChange={...} disabled>
    Center
  </ToggleButton>
  <ToggleButton selected={false} onSelectedChange={...}>Right</ToggleButton>
</ButtonGroup>
```

### Con `testId` para pruebas

```tsx
<ButtonGroup testId="view-range-group" aria-label="Rango de tiempo">
  ...
</ButtonGroup>;

// En el test:
screen.getByTestId('view-range-group');
```

## Accesibilidad

- **`aria-label` en el grupo**: `role="group"` necesita un nombre accesible. Pasa siempre `aria-label` (o `aria-labelledby`) describiendo el propósito del grupo, por ejemplo `aria-label="Rango de tiempo"`.
- **Nombre accesible en cada item**: cada `Button`/`ToggleButton`/`IconButton` hijo debe tener su propio nombre accesible — texto visible o, si es icon-only, un `aria-label` propio (ver [Accesibilidad de Button](./Button.md#aria-label-para-botones-icon-only)).
- **Navegación con teclado**: cada item es un `<button>` nativo independiente — `Tab`/`Shift+Tab` los recorre en orden de DOM, y `Enter`/`Space` activan el item enfocado.
- **Estado de selección**: cuando los items son `ToggleButton`, su `aria-pressed` comunica el estado seleccionado a tecnologías asistivas; `ButtonGroup` no añade ningún `aria-*` adicional sobre sus hijos.
