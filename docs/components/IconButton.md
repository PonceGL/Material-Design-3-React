# IconButton

`IconButton` sigue la especificación ["Icon buttons"](https://m3.material.io/components/icon-buttons/overview) de Material Design 3, basada en `IconButton`/`FilledIconButton`/`FilledTonalIconButton`/`OutlinedIconButton` de Jetpack Compose Material3. Es un botón cuadrado que renderiza un único icono, sin etiqueta de texto.

## `IconButton` vs. `Button` con icono

[`Button`](./Button.md) acepta `icon`/`iconTrailing` junto a una etiqueta de texto, y puede usarse "icon-only" omitiendo `children`. Usa `IconButton` en su lugar cuando:

- La acción **siempre** es icon-only (por ejemplo, en una barra de herramientas o el encabezado de un `Card`).
- Necesitas un **touch target cuadrado** — `IconButton` usa `size` para definir un `width`/`height` igual, mientras que `Button` icon-only conserva el padding horizontal de un botón con texto.
- Quieres las cuatro variantes específicas de icon button (`standard`, `filled`, `tonal`, `outlined`), pensadas para conjuntos de iconos de distinto énfasis.

## Variantes

| Variante | Prop                 | Cuándo usarla                                                                                            |
| -------- | -------------------- | -------------------------------------------------------------------------------------------------------- |
| Standard | `variant="standard"` | Sin contenedor. Énfasis bajo — para acciones dentro de otros componentes (app bars, items de lista).     |
| Filled   | `variant="filled"`   | Mayor énfasis. Para la acción principal de un grupo de icon buttons.                                     |
| Tonal    | `variant="tonal"`    | Énfasis medio-alto con relleno tonal. Para acciones secundarias que aún necesitan un contenedor visible. |
| Outlined | `variant="outlined"` | Énfasis medio sin relleno. Para acciones importantes que no son la principal.                            |

## Props

| Prop        | Tipo                                              | Por defecto   | Descripción                                                                                                                                                           |
| ----------- | ------------------------------------------------- | ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `variant`   | `'standard' \| 'filled' \| 'tonal' \| 'outlined'` | `'standard'`  | Variante visual. Ver [Variantes](#variantes).                                                                                                                         |
| `size`      | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`               | `'m'`         | Tamaño M3 Expressive, compartido con `Button`/`ButtonGroup`/`ToggleButton`. Define el `width`/`height` cuadrado. Ver [Tamaño y touch target](#tamaño-y-touch-target). |
| `shape`     | `'round' \| 'square'`                             | `'round'`     | Forma M3 Expressive en reposo. Controla el `border-radius`, en reposo y al presionar — igual que en `Button`.                                                         |
| `icon`      | `ReactNode`                                       | — (requerido) | Icono renderizado dentro del botón. **Requiere `aria-label`** — ver [Accesibilidad](#accesibilidad).                                                                  |
| `testId`    | `string`                                          | —             | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                                                                           |
| `disabled`  | `boolean`                                         | `false`       | Deshabilita el botón y elimina los eventos de puntero.                                                                                                                |
| `type`      | `'button' \| 'submit' \| 'reset'`                 | `'button'`    | Atributo `type` del elemento `<button>`. Por defecto `'button'` para evitar envíos accidentales de formulario.                                                        |
| `className` | `string`                                          | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                                                                            |
| `onClick`   | `MouseEventHandler`                               | —             | Manejador del evento click. No se dispara cuando el botón está deshabilitado.                                                                                         |
| `...rest`   | `ButtonHTMLAttributes`                            | —             | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz (incluyendo `aria-label`, ver [Accesibilidad](#accesibilidad)).                            |

## Tamaño y touch target

`size` define un área **cuadrada** (`width === height`), reutilizando la misma escala de puntos que el `min-height` de `Button` por `size`:

| Tamaño | `width` / `height` | Cumple touch target 48×48dp |
| ------ | ------------------ | --------------------------- |
| `xs`   | 40px               | No                          |
| `s`    | 44px               | No                          |
| `m`    | 48px               | Sí — por defecto            |
| `l`    | 52px               | Sí                          |
| `xl`   | 56px               | Sí                          |

`m` (por defecto) ya cumple el área táctil mínima de 48×48dp recomendada por M3 — no se añade padding adicional invisible. Los tamaños `xs` (40px) y `s` (44px) quedan por debajo de esa recomendación: úsalos solo en contextos de espacio reducido y considera reforzar el área táctil con `padding`/`margin` en el contenedor, igual que se documenta para [`Button`](./Button.md#size).

```tsx
<IconButton size="xs" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton size="m" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton size="xl" icon={<SettingsIcon />} aria-label="Configuración" />
```

### `shape`

- `round` (por defecto) — esquinas totalmente redondeadas.
- `square` — esquinas levemente redondeadas (`corner-medium`).

```tsx
<IconButton shape="round" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton shape="square" icon={<SettingsIcon />} aria-label="Configuración" />
```

## Ejemplos

### Uso básico

```tsx
import { IconButton } from '@poncegl/material-design-3';

import { SettingsIcon } from './icons';

<IconButton icon={<SettingsIcon />} aria-label="Configuración" />;
```

### Las cuatro variantes

```tsx
<IconButton variant="standard" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton variant="filled" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton variant="tonal" icon={<SettingsIcon />} aria-label="Configuración" />
<IconButton variant="outlined" icon={<SettingsIcon />} aria-label="Configuración" />
```

### Estado deshabilitado

```tsx
<IconButton
  variant="filled"
  icon={<DeleteIcon />}
  aria-label="Eliminar"
  disabled
/>
```

### Con `testId` para pruebas

```tsx
<IconButton
  testId="settings-button"
  icon={<SettingsIcon />}
  aria-label="Configuración"
/>;

// En el test:
screen.getByTestId('settings-button');
```

## Accesibilidad

### `aria-label` es obligatorio

`IconButton` no tiene texto visible: **siempre** debes proporcionar un `aria-label` descriptivo. Sin él, el botón no tiene nombre accesible y fallará cualquier auditoría de accesibilidad (axe-core, Lighthouse, lectores de pantalla):

```tsx
// ✅ Correcto — el icono tiene un nombre accesible
<IconButton icon={<CloseIcon />} aria-label="Cerrar diálogo" />

// ❌ Incorrecto — sin aria-label, el botón no tiene nombre accesible
<IconButton icon={<CloseIcon />} />
```

Si el icono incluye un `<svg>`, márcalo como `aria-hidden="true"` para que los lectores de pantalla no intenten describirlo por separado — el `aria-label` del botón ya provee el nombre accesible.

### Comportamiento con teclado

El componente hereda el comportamiento nativo del elemento `<button>`:

- `Enter` y `Space` disparan el evento `onClick`.
- `Tab` y `Shift+Tab` navegan entre botones y otros elementos interactivos.
- Cuando está deshabilitado, el botón queda fuera del flujo de tabulación del navegador.
