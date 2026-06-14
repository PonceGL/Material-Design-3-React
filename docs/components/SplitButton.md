# SplitButton

`SplitButton` sigue la especificación ["Buttons" (M3 Expressive)](https://m3.material.io/components/buttons/overview) de Material Design 3: dos botones fusionados visualmente en un único control — un botón principal (`SplitButton.Leading`) que ejecuta la acción más probable, y un botón secundario (`SplitButton.Trailing`) que típicamente abre un menú con acciones relacionadas.

## Cuándo usarlo

| Necesitas...                                                                                   | Usa...                                    |
| ---------------------------------------------------------------------------------------------- | ----------------------------------------- |
| Una acción principal + un atajo a opciones relacionadas (p. ej. "Guardar" / "Guardar como...") | `SplitButton`                             |
| Varias acciones del mismo peso visual, agrupadas (p. ej. una barra de herramientas)            | [`ButtonGroup`](./ButtonGroup.md)         |
| Alternar entre vistas o filtros de igual ancho                                                 | [`SegmentedButton`](./SegmentedButton.md) |

`SplitButton` no gestiona ningún menú o dropdown — esa lógica (abrir/cerrar, posicionamiento, opciones) es responsabilidad del consumidor. `SplitButton.Trailing` solo expone el `onClick`/`onCheckedChange` para conectarse a ella.

## Patrón compound component

`<SplitButton>` es el contenedor — un `<div>` sin estilo de color propio que agrupa visualmente sus dos partes con un gap de 2dp. `<SplitButton.Leading>` y `<SplitButton.Trailing>` son botones independientes, cada uno con su propio `<button>` nativo.

```tsx
import { SplitButton } from '@poncegl/material-design-3';

<SplitButton>
  <SplitButton.Leading onClick={handleConfirm}>Confirmar</SplitButton.Leading>
  <SplitButton.Trailing
    icon={<ChevronDownIcon />}
    aria-label="Más opciones"
    onClick={openMenu}
  />
</SplitButton>;
```

## Props

### `SplitButton`

| Prop        | Tipo                             | Por defecto   | Descripción                                                                                                                          |
| ----------- | -------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `spacing`   | `string`                         | —             | Separación entre `Leading` y `Trailing` (longitud CSS). Por defecto los dos botones quedan unidos con un gap de 2dp definido en CSS. |
| `children`  | `ReactNode`                      | — (requerido) | `SplitButton.Leading` y `SplitButton.Trailing`.                                                                                      |
| `testId`    | `string`                         | —             | Propagado como `data-testid` en el contenedor (`<div>`) para selectores de prueba.                                                   |
| `className` | `string`                         | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                           |
| `...rest`   | `HTMLAttributes<HTMLDivElement>` | —             | Cualquier atributo HTML válido para `<div>` se propaga al contenedor.                                                                |

### `SplitButton.Leading`

| Prop       | Tipo                                                               | Por defecto   | Descripción                                                                                                           |
| ---------- | ------------------------------------------------------------------ | ------------- | --------------------------------------------------------------------------------------------------------------------- |
| `variant`  | `'filled' \| 'elevated' \| 'filled-tonal' \| 'outlined' \| 'text'` | `'filled'`    | Variante visual. Debe coincidir con la de `SplitButton.Trailing` — ver [Variante consistente](#variante-consistente). |
| `icon`     | `ReactNode`                                                        | —             | Icono renderizado antes de `children`.                                                                                |
| `children` | `ReactNode`                                                        | — (requerido) | Etiqueta del botón.                                                                                                   |
| `testId`   | `string`                                                           | —             | Propagado como `data-testid` en el `<button>`.                                                                        |
| `...rest`  | `ButtonHTMLAttributes<HTMLButtonElement>`                          | —             | Cualquier atributo HTML válido para `<button>` (`onClick`, `disabled`, `type`, `aria-*`, etc.).                       |

### `SplitButton.Trailing`

| Prop              | Tipo                                                               | Por defecto | Descripción                                                                                                             |
| ----------------- | ------------------------------------------------------------------ | ----------- | ----------------------------------------------------------------------------------------------------------------------- |
| `variant`         | `'filled' \| 'elevated' \| 'filled-tonal' \| 'outlined' \| 'text'` | `'filled'`  | Variante visual. Debe coincidir con la de `SplitButton.Leading` — ver [Variante consistente](#variante-consistente).    |
| `icon`            | `ReactNode`                                                        | —           | Icono renderizado dentro del botón (típicamente un chevron o icono de menú).                                            |
| `checked`         | `boolean`                                                          | —           | Estado actual cuando `Trailing` actúa como toggle. Si se omite, no se renderizan `aria-pressed` ni `data-checked`.      |
| `onCheckedChange` | `(checked: boolean) => void`                                       | —           | Se llama con el siguiente estado al hacer clic, además de `onClick`. Ver [Trailing como toggle](#trailing-como-toggle). |
| `testId`          | `string`                                                           | —           | Propagado como `data-testid` en el `<button>`.                                                                          |
| `...rest`         | `ButtonHTMLAttributes<HTMLButtonElement>`                          | —           | Cualquier atributo HTML válido para `<button>` (`onClick`, `disabled`, `aria-label`, etc.).                             |

## Variante consistente

`SplitButton.Leading` y `SplitButton.Trailing` aceptan `variant` de forma independiente, pero **deben usar la misma `variant`** para que ambas partes se perciban como un único control:

```tsx
<SplitButton>
  <SplitButton.Leading variant="outlined">Confirmar</SplitButton.Leading>
  <SplitButton.Trailing
    variant="outlined"
    icon={<ChevronDownIcon />}
    aria-label="Más opciones"
  />
</SplitButton>
```

Esto no se valida en tiempo de ejecución — es una convención de uso.

## Shape morphing

Ambas partes tienen esquinas externas `corner-full` (3rem, forma `round` de `Button`) y esquinas internas `corner-extra-small` (4dp), que crean la "muesca" característica entre `Leading` y `Trailing`. Al presionar cualquiera de las dos partes (`:active`), solo la esquina interna crece a 1rem — la misma transición que usa `Button` con `shape="round"` al presionar — mientras la esquina externa se mantiene en `corner-full`.

## Trailing como toggle

Cuando `SplitButton.Trailing` abre/cierra un menú, conviene reflejar ese estado visualmente. Pasa `checked` y `onCheckedChange` para que `Trailing` se comporte como un toggle: `aria-pressed` y `data-checked` reflejan `checked`, y `onCheckedChange` se llama con el siguiente valor en cada click (además de `onClick`).

```tsx
import { useState } from 'react';

import { SplitButton } from '@poncegl/material-design-3';

function FavoriteSplitButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <SplitButton>
      <SplitButton.Leading onClick={handleFavorite}>
        Marcar como favorito
      </SplitButton.Leading>
      <SplitButton.Trailing
        icon={<ChevronDownIcon />}
        aria-label="Expandir opciones"
        checked={menuOpen}
        onCheckedChange={setMenuOpen}
      />
    </SplitButton>
  );
}
```

## Conectar a un menú

`SplitButton` no incluye ningún componente de menú — conecta el `onClick`/`onCheckedChange` de `Trailing` al estado de tu propio menú (o de una librería de menús):

```tsx
import { useState } from 'react';

import { SplitButton } from '@poncegl/material-design-3';

function ExportSplitButton() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="relative inline-block">
      <SplitButton>
        <SplitButton.Leading onClick={handleExport}>
          Exportar
        </SplitButton.Leading>
        <SplitButton.Trailing
          icon={<ChevronDownIcon />}
          aria-label="Más formatos de exportación"
          checked={menuOpen}
          onCheckedChange={setMenuOpen}
        />
      </SplitButton>

      {menuOpen && (
        <ul role="menu" className="absolute right-0 top-full mt-1">
          <li role="menuitem">
            <button onClick={() => handleExport('csv')}>CSV</button>
          </li>
          <li role="menuitem">
            <button onClick={() => handleExport('pdf')}>PDF</button>
          </li>
        </ul>
      )}
    </div>
  );
}
```

## Ejemplos

### Con icono en `Leading`

```tsx
<SplitButton>
  <SplitButton.Leading icon={<PlusIcon />}>Agregar</SplitButton.Leading>
  <SplitButton.Trailing icon={<ChevronDownIcon />} aria-label="Más opciones" />
</SplitButton>
```

### Espaciado personalizado entre `Leading` y `Trailing`

```tsx
<SplitButton spacing="0.5rem">
  <SplitButton.Leading>Confirmar</SplitButton.Leading>
  <SplitButton.Trailing icon={<ChevronDownIcon />} aria-label="Más opciones" />
</SplitButton>
```

### Estado deshabilitado

```tsx
{
  /* Solo Trailing deshabilitado: la acción principal sigue disponible */
}
<SplitButton>
  <SplitButton.Leading>Confirmar</SplitButton.Leading>
  <SplitButton.Trailing
    disabled
    icon={<ChevronDownIcon />}
    aria-label="Más opciones"
  />
</SplitButton>;

{
  /* Ambas partes deshabilitadas */
}
<SplitButton>
  <SplitButton.Leading disabled>Confirmar</SplitButton.Leading>
  <SplitButton.Trailing
    disabled
    icon={<ChevronDownIcon />}
    aria-label="Más opciones"
  />
</SplitButton>;
```

### Con `testId` para pruebas

```tsx
<SplitButton testId="export-split-button">
  <SplitButton.Leading testId="export-split-button-leading">
    Exportar
  </SplitButton.Leading>
  <SplitButton.Trailing
    testId="export-split-button-trailing"
    icon={<ChevronDownIcon />}
    aria-label="Más formatos de exportación"
  />
</SplitButton>;

// En el test:
screen.getByTestId('export-split-button');
screen.getByTestId('export-split-button-leading');
screen.getByTestId('export-split-button-trailing');
```

## Accesibilidad

- **Cada parte es un `<button>` independiente**: `SplitButton.Leading` y `SplitButton.Trailing` son botones nativos separados, cada uno necesita su propio nombre accesible.
- **`SplitButton.Leading`**: su nombre accesible proviene del texto visible en `children`. Si solo muestra un icono, agrega `aria-label`.
- **`SplitButton.Trailing`**: normalmente no tiene texto visible (solo un icono de menú), por lo que **siempre** requiere `aria-label` describiendo su acción (p. ej. `aria-label="Más opciones"`).
- **`aria-pressed` / `data-checked`**: cuando `Trailing` actúa como toggle (`checked`/`onCheckedChange`), `aria-pressed` comunica el estado a tecnologías asistivas; `data-checked` queda disponible para estilos o selectores de prueba.
- **Navegación con teclado**: `Tab`/`Shift+Tab` recorre `Leading` y `Trailing` como dos botones independientes; `Enter`/`Space` activan el botón enfocado.
