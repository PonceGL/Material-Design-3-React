# TextField

`TextField` sigue la especificación [Text fields de Material Design 3](https://m3.material.io/components/text-fields/overview): un campo de entrada de una línea (`<input>`) o multilínea (`<textarea>`), con etiqueta flotante 100% CSS, en sus dos variantes visuales oficiales.

## Variantes

| Variante | Prop                 | Cuándo usarla                                                                                                                  |
| -------- | -------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| Filled   | `variant="filled"`   | Mayor énfasis visual. Por defecto. Recomendado para formularios cortos y diálogos.                                             |
| Outlined | `variant="outlined"` | Menor énfasis visual. Recomendado para formularios largos, donde varios campos juntos se benefician de un estilo menos pesado. |

Si se usan ambas variantes en una misma pantalla, sepáralas por región (no las mezcles dentro del mismo formulario) — es la recomendación oficial de M3.

```tsx
<TextField label="Email" variant="filled" />
<TextField label="Email" variant="outlined" />
```

## Props

| Prop                    | Tipo                                                                  | Por defecto   | Descripción                                                                                                                                       |
| ----------------------- | --------------------------------------------------------------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                 | `string`                                                              | — (requerido) | Etiqueta del campo. Siempre visible (en reposo, centrada; al enfocar o con valor, flotante arriba) — M3 la exige siempre presente.                |
| `variant`               | `'filled' \| 'outlined'`                                              | `'filled'`    | Variante visual — ver [Variantes](#variantes).                                                                                                    |
| `status`                | `'none' \| 'error' \| 'success' \| 'warning'`                         | `'none'`      | Estado de validación — ver [Validación](#validación-status--supportingtext).                                                                      |
| `supportingText`        | `string`                                                              | —             | Texto de ayuda/error/éxito/advertencia debajo del campo. Color y rol determinados por `status`.                                                   |
| `type`                  | `'text' \| 'email' \| 'password' \| 'tel' \| 'url'`                   | `'text'`      | Tipo nativo del `<input>`, restringido — ver [Tipo de input](#tipo-de-input-type). Solo válido cuando `multiline` es `false`/omitido.             |
| `multiline`             | `boolean`                                                             | `false`       | `true` renderiza un `<textarea>` en vez de un `<input>` — ver [Multilínea](#multilínea-multiline).                                                |
| `rows`                  | `number`                                                              | `3`           | Filas visibles del `<textarea>`. Solo válido cuando `multiline={true}`.                                                                           |
| `leadingIcon`           | `ReactNode`                                                           | —             | Icono antes del campo. Decorativo, 24dp, color fijo `on-surface-variant`.                                                                         |
| `trailingIcon`          | `ReactNode`                                                           | —             | Icono después del campo. Color según `status`.                                                                                                    |
| `onTrailingIconClick`   | `() => void`                                                          | —             | Si se define, envuelve `trailingIcon` en un `<button>` accesible (clear, mostrar/ocultar contraseña, etc.) — requiere `trailingIconAriaLabel`.    |
| `trailingIconAriaLabel` | `string`                                                              | —             | Nombre accesible del botón generado por `onTrailingIconClick`.                                                                                    |
| `showCharacterCount`    | `boolean`                                                             | —             | Muestra "longitud actual / `maxLength`" junto a `supportingText`. Requiere `maxLength`.                                                           |
| `maxLength`             | `number`                                                              | —             | Atributo nativo de `<input>`/`<textarea>`. Requerido para que `showCharacterCount` muestre el contador.                                           |
| `testId`                | `string`                                                              | —             | Propagado como `data-testid` en el contenedor raíz para selectores de prueba.                                                                     |
| `className`             | `string`                                                              | —             | Clases adicionales que se fusionan con las del componente mediante `cn()`. Se aplican al contenedor raíz.                                         |
| `...rest`               | `InputHTMLAttributes` \| `TextareaHTMLAttributes` (según `multiline`) | —             | Cualquier atributo HTML válido se propaga al `<input>`/`<textarea>` (`value`, `onChange`, `placeholder`, `disabled`, `required`, `aria-*`, etc.). |

## Validación (`status` + `supportingText`)

Una sola API cubre los cuatro estados de validación. `error` es el único rol que define M3 oficialmente; `success` y `warning` son una **extensión de esta librería** sobre el sistema de color M3 (tokens `--md-sys-color-success`/`--md-sys-color-warning`, agregados en esta misma tarea — no son roles M3 oficiales).

```tsx
<TextField label="Email" status="error" supportingText="Ingresa un email válido" />
<TextField label="Usuario" status="success" supportingText="Usuario disponible" />
<TextField label="Contraseña" status="warning" supportingText="Contraseña débil" />
<TextField label="Email" supportingText="Nunca compartiremos tu email" />
```

Cuando `status="error"`, el componente fija automáticamente (sin que el consumidor tenga que hacer nada):

- `aria-invalid="true"` en el `<input>`/`<textarea>`.
- `role="alert"` en el elemento de `supportingText`, para que lectores de pantalla lo anuncien.
- `aria-describedby` en el `<input>`/`<textarea>` apuntando al `id` de `supportingText` (esto ocurre para cualquier `status`, no solo `error`, siempre que haya `supportingText`).

## Iconos

```tsx
<TextField label="Buscar" leadingIcon={<SearchIcon />} />
```

### Botón de acción (`onTrailingIconClick`)

Cuando se define `onTrailingIconClick`, `trailingIcon` se envuelve en un `<button type="button">` accesible de 48×48dp (con su propio estado de hover/focus) — útil para limpiar el campo, mostrar/ocultar una contraseña, etc. **`trailingIconAriaLabel` es obligatorio** en este caso, porque el botón no tiene texto visible:

```tsx
function SearchField() {
  const [value, setValue] = useState('');

  return (
    <TextField
      label="Buscar"
      leadingIcon={<SearchIcon />}
      trailingIcon={value ? <ClearIcon /> : undefined}
      onTrailingIconClick={value ? () => setValue('') : undefined}
      trailingIconAriaLabel="Limpiar búsqueda"
      value={value}
      onChange={(event) => setValue(event.target.value)}
    />
  );
}
```

Si `trailingIcon` se define **sin** `onTrailingIconClick`, se renderiza como decorativo (`aria-hidden`, sin envoltorio interactivo).

## Tipo de input (`type`)

`type` acepta un subconjunto deliberadamente restringido del atributo nativo `type` de `<input>`: **`'text' | 'email' | 'password' | 'tel' | 'url'`** (exportado como `TextFieldInputType`). Pasar cualquier otro valor (`'date'`, `'search'`, `'number'`, `'radio'`, etc.) es un error de TypeScript en tiempo de compilación.

```tsx
<TextField label="Email" type="email" />
<TextField label="Teléfono" type="tel" />
<TextField label="Contraseña" type="password" />
```

La razón de la restricción: esta es una librería **web**, y el único beneficio real de `type` en ese contexto es activar el teclado virtual correcto en dispositivos táctiles (`email` → `@`, `tel` → numérico). Los demás valores nativos quedan deliberadamente fuera porque rompen el diseño fijo M3 filled/outlined de este componente:

- `date`/`time`/`month`/`week`/`datetime-local`, `radio`, `checkbox`, `range`, `color`, `file` — cada uno renderiza su propio widget nativo en vez de un campo de texto.
- `number` — agrega flechas de spinner nativas (también cambia la apariencia). Para números tipo teléfono usa `tel`, que no agrega spinners y de igual forma activa el teclado numérico.
- `search` — agrega su propio botón nativo de limpiar (la "x"), que duplicaría/chocaría con `trailingIcon` + `onTrailingIconClick`, ya construido en este componente para ese mismo caso de uso.

`type` solo es válido cuando `multiline` es `false` u omitido — TypeScript lo rechaza si se combina con `multiline={true}`.

## Contador de caracteres (`showCharacterCount` + `maxLength`)

```tsx
<TextField
  label="Biografía"
  maxLength={140}
  showCharacterCount
  supportingText="Cuéntanos sobre ti"
/>
```

Funciona tanto con el campo controlado (`value`) como no controlado (`defaultValue`/sin valor inicial) — en ambos casos el contador refleja la longitud actual en cada cambio.

## Multilínea (`multiline`)

```tsx
<TextField label="Notas" multiline rows={5} />
```

`multiline={true}` renderiza un `<textarea>` en vez de un `<input>`, reutilizando exactamente el mismo label flotante, iconos, `supportingText` y contador. Según las guidelines oficiales de M3, los campos multilínea en **web** usan un `<textarea>` de **altura fija + scroll** (controlado por `rows`, por defecto `3`) — a diferencia del "growing multiline field" que sí existe en Jetpack Compose, este componente no implementa auto-grow.

`rows`, `cols` y demás atributos de `<textarea>` solo son válidos cuando `multiline={true}`; TypeScript rechaza combinarlos con `multiline={false}`/omitido (y viceversa con atributos exclusivos de `<input>` como `type`/`pattern`).

## Ejemplos

### Uso básico

```tsx
import { TextField } from '@poncegl/material-design-3';

<TextField label="Email" />;
```

### Campo controlado

```tsx
function EmailField() {
  const [email, setEmail] = useState('');

  return (
    <TextField
      label="Email"
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />
  );
}
```

### Con `testId` para pruebas

```tsx
<TextField testId="email-field" label="Email" />;

// En el test:
screen.getByTestId('email-field');
```

### Fusión de clases con `className`

```tsx
<TextField label="Email" className="w-full" />
```

### Estado deshabilitado

```tsx
<TextField label="Email" disabled defaultValue="ponce@example.com" />
```

## Accesibilidad

- **`label` siempre requerido**: se renderiza como un `<label>` real asociado al campo vía `htmlFor`/`id` (no solo un `placeholder`) — M3 exige que la etiqueta esté siempre visible.
- **`id` automático**: si el consumidor no pasa `id`, se genera uno único con `useId()` para asociar correctamente `label`/`legend` con el campo. Si se pasa `id` explícito, se usa ese.
- **`aria-invalid`, `aria-describedby`, `role="alert"`**: fijados automáticamente según `status`/`supportingText` — ver [Validación](#validación-status--supportingtext).
- **`trailingIconAriaLabel` obligatorio** cuando se usa `onTrailingIconClick` — el botón generado no tiene texto visible, ver [Iconos](#iconos).
- **Outlined**: el "notch" del label sobre el borde se logra con `<fieldset>`/`<legend>` nativos del navegador — sin trucos de `background-color` ni Canvas.
- Cero violaciones de `axe-core` en todas las combinaciones de variante/status/iconos/multiline (cubierto en la suite de tests del componente).
