# ToggleIconButton

`ToggleIconButton` sigue la especificación ["Icon buttons"](https://m3.material.io/components/icon-buttons/overview) de Material Design 3, en su variante de **toggle button**. Visualmente comparte `size`, `shape` y la misma familia de variantes (`standard`, `filled`, `tonal`, `outlined`) que [`IconButton`](./IconButton.md), pero se diferencia en dos aspectos clave:

1. **Es un control de estado**, no una acción puntual: requiere `checked`/`onCheckedChange` (ambos obligatorios) y refleja su estado como `aria-pressed`.
2. **Su tabla de color es distinta a la de `IconButton`** ("Toggle" vs. "Default" en la spec de M3) — el mismo `variant` produce colores diferentes según `checked`.

Además, al marcarse (`checked={true}`), la forma cambia (_shape-morph_): un `ToggleIconButton` `round` pasa a verse `square` y viceversa.

## Tabla de color "Toggle"

| `variant`  | No marcado (contenedor / contenido)                     | Marcado (contenedor / contenido)                     |
| ---------- | ------------------------------------------------------- | ---------------------------------------------------- |
| `standard` | Sin contenedor / `on-surface-variant`                   | Sin contenedor / `primary`                           |
| `filled`   | `surface-variant` / `on-surface-variant`                | `primary` / `on-primary`                             |
| `tonal`    | `secondary-container` / `on-secondary-container`        | `secondary` / `on-secondary`                         |
| `outlined` | transparente con borde `outline` / `on-surface-variant` | `inverse-surface` / `inverse-on-surface` (sin borde) |

> La tabla es idéntica a la de [`ToggleButton`](./ToggleButton.md#tabla-de-color-toggle) — `ToggleIconButton` reutiliza la misma tabla de color "Toggle" de M3, aplicada a un botón cuadrado sin etiqueta de texto.

## Forma (_shape-morph_)

`shape` define la forma **en reposo, cuando `checked={false}`**:

- `round` (por defecto) — esquinas totalmente redondeadas (`corner-full`).
- `square` — esquinas levemente redondeadas (`corner-medium`).

Al marcarse (`checked={true}`), la forma cambia a la opuesta:

| `shape`  | `checked={false}`          | `checked={true}`           |
| -------- | -------------------------- | -------------------------- |
| `round`  | `corner-full` (redondeado) | `corner-medium` (cuadrado) |
| `square` | `corner-medium` (cuadrado) | `corner-full` (redondeado) |

```tsx
<ToggleIconButton shape="round" icon={<StarIcon />} checked={false} onCheckedChange={...} aria-label="Favorito" />
<ToggleIconButton shape="round" icon={<StarIcon />} checked onCheckedChange={...} aria-label="Favorito" />
```

El tamaño (`size`) se comporta igual que en `IconButton` — ver [Tamaño y touch target](./IconButton.md#tamaño-y-touch-target).

## Props

| Prop              | Tipo                                              | Por defecto   | Descripción                                                                                                                                                                                      |
| ----------------- | ------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `variant`         | `'standard' \| 'filled' \| 'tonal' \| 'outlined'` | `'standard'`  | Variante visual. El color resultante depende también de `checked` — ver [Tabla de color "Toggle"](#tabla-de-color-toggle).                                                                       |
| `size`            | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`               | `'m'`         | Tamaño M3 Expressive, compartido con `IconButton`. Define el `width`/`height` cuadrado.                                                                                                          |
| `shape`           | `'round' \| 'square'`                             | `'round'`     | Forma en reposo cuando `checked={false}`. Al marcarse, la forma cambia a la opuesta (_shape-morph_) — ver [Forma](#forma-shape-morph).                                                           |
| `icon`            | `ReactNode`                                       | — (requerido) | Icono renderizado mientras `checked={false}`. **Requiere `aria-label`** — ver [Accesibilidad](#accesibilidad).                                                                                   |
| `checkedIcon`     | `ReactNode`                                       | —             | Icono renderizado mientras `checked={true}`. Si no se proporciona, se reutiliza `icon` — ver [Comportamiento del icono](#comportamiento-del-icono).                                              |
| `checked`         | `boolean`                                         | — (requerido) | Estado marcado, reflejado como `aria-pressed`.                                                                                                                                                   |
| `onCheckedChange` | `(checked: boolean) => void`                      | — (requerido) | Se llama con el siguiente estado (`!checked`) cuando se activa el botón (click, `Enter` o `Space`).                                                                                              |
| `testId`          | `string`                                          | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                                                                      |
| `disabled`        | `boolean`                                         | `false`       | Deshabilita el botón, elimina los eventos de puntero y evita que se llame `onCheckedChange`.                                                                                                     |
| `className`       | `string`                                          | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                                                                                       |
| `...rest`         | `Omit<ButtonHTMLAttributes, 'onClick'>`           | —             | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz (incluyendo `aria-label`, ver [Accesibilidad](#accesibilidad)). `onClick` no está disponible — usa `onCheckedChange`. |

## Comportamiento del icono

`ToggleIconButton` recibe dos iconos:

- `icon` — se muestra mientras `checked={false}`. Es **requerido**.
- `checkedIcon` — se muestra mientras `checked={true}`. Es **opcional**: si no se proporciona, `checked={true}` vuelve a renderizar `icon`.

Usa `checkedIcon` cuando el icono debe comunicar el cambio de estado (por ejemplo, un contorno que se rellena):

```tsx
<ToggleIconButton
  icon={<FavoriteBorderIcon />}
  checkedIcon={<FavoriteIcon />}
  checked={isFavorite}
  onCheckedChange={setIsFavorite}
  aria-label="Favorito"
/>
```

Si el icono no cambia visualmente entre estados (el color y la forma ya comunican el cambio), omite `checkedIcon`:

```tsx
<ToggleIconButton
  icon={<MicIcon />}
  checked={isMicOn}
  onCheckedChange={setIsMicOn}
  aria-label="Micrófono"
/>
```

## Ejemplos

### Uso controlado

```tsx
import { useState } from 'react';

import { ToggleIconButton } from '@poncegl/material-design-3';

function FavoriteToggle() {
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <ToggleIconButton
      variant="tonal"
      icon={<FavoriteBorderIcon />}
      checkedIcon={<FavoriteIcon />}
      checked={isFavorite}
      onCheckedChange={setIsFavorite}
      aria-label="Favorito"
    />
  );
}
```

### Las cuatro variantes, marcado y no marcado

```tsx
<ToggleIconButton variant="standard" icon={<StarIcon />} checked={false} onCheckedChange={...} aria-label="Favorito" />
<ToggleIconButton variant="standard" icon={<StarIcon />} checked onCheckedChange={...} aria-label="Favorito" />

<ToggleIconButton variant="filled" icon={<StarIcon />} checked={false} onCheckedChange={...} aria-label="Favorito" />
<ToggleIconButton variant="filled" icon={<StarIcon />} checked onCheckedChange={...} aria-label="Favorito" />

<ToggleIconButton variant="tonal" icon={<StarIcon />} checked={false} onCheckedChange={...} aria-label="Favorito" />
<ToggleIconButton variant="tonal" icon={<StarIcon />} checked onCheckedChange={...} aria-label="Favorito" />

<ToggleIconButton variant="outlined" icon={<StarIcon />} checked={false} onCheckedChange={...} aria-label="Favorito" />
<ToggleIconButton variant="outlined" icon={<StarIcon />} checked onCheckedChange={...} aria-label="Favorito" />
```

### Estado deshabilitado

```tsx
<ToggleIconButton
  variant="filled"
  icon={<MicIcon />}
  checked={false}
  onCheckedChange={() => {}}
  aria-label="Micrófono"
  disabled
/>
```

### Con `testId` para pruebas

```tsx
<ToggleIconButton
  testId="favorite-toggle"
  icon={<FavoriteBorderIcon />}
  checkedIcon={<FavoriteIcon />}
  checked={isFavorite}
  onCheckedChange={setIsFavorite}
  aria-label="Favorito"
/>;

// En el test:
screen.getByTestId('favorite-toggle');
```

## Accesibilidad

- **`aria-pressed`**: refleja siempre el valor de `checked` (`"true"`/`"false"`), comunicando el estado de alternancia a tecnologías asistivas. No es necesario (ni recomendable) establecer `aria-pressed` manualmente vía `...rest`.
- **`aria-label` es obligatorio**: igual que [`IconButton`](./IconButton.md#aria-label-es-obligatorio), `ToggleIconButton` no tiene texto visible. Sin un `aria-label` descriptivo, el botón no tiene nombre accesible y fallará cualquier auditoría de accesibilidad (axe-core, Lighthouse, lectores de pantalla):

  ```tsx
  // ✅ Correcto
  <ToggleIconButton icon={<MicIcon />} checked={isMicOn} onCheckedChange={setIsMicOn} aria-label="Micrófono" />

  // ❌ Incorrecto — sin aria-label, el botón no tiene nombre accesible
  <ToggleIconButton icon={<MicIcon />} checked={isMicOn} onCheckedChange={setIsMicOn} />
  ```

- **Comportamiento con teclado**: hereda el comportamiento nativo de `<button>` — `Enter` y `Space` invocan `onCheckedChange` con `!checked`; cuando está `disabled`, queda fuera del flujo de tabulación.
- **Touch target**: igual que `IconButton`, el `width`/`height` depende de `size` — `'m'` (48px, por defecto) cumple el mínimo de 48×48dp recomendado por M3.
