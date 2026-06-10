# Button

El componente Button sigue la especificación [Buttons de Material Design 3](https://m3.material.io/components/buttons/overview). Ofrece cinco variantes que representan distintos niveles de énfasis visual, permitiendo jerarquizar las acciones disponibles en una pantalla.

## Variantes

| Variante     | Prop                     | Cuándo usarla                                                                                                                           |
| ------------ | ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- |
| Filled       | `variant="filled"`       | Acción principal de la pantalla. El mayor énfasis visual disponible. Úsala para la acción más importante, como "Guardar" o "Continuar". |
| Elevated     | `variant="elevated"`     | Énfasis medio con sombra. Útil cuando se necesita separar visualmente el botón del fondo sin recurrir al relleno de color de `filled`.  |
| Filled Tonal | `variant="filled-tonal"` | Énfasis medio-alto con relleno tonal. Alternativa a `elevated` para acciones secundarias que aún requieren prominencia.                 |
| Outlined     | `variant="outlined"`     | Énfasis medio sin relleno. Para acciones importantes que no son la primaria, como "Cancelar" o "Volver".                                |
| Text         | `variant="text"`         | Menor énfasis. Para acciones opcionales o complementarias, como "Omitir" o "Más información".                                           |

## Props

| Prop           | Tipo                                                               | Por defecto | Descripción                                                                                                     |
| -------------- | ------------------------------------------------------------------ | ----------- | --------------------------------------------------------------------------------------------------------------- |
| `variant`      | `'filled' \| 'elevated' \| 'filled-tonal' \| 'outlined' \| 'text'` | `'filled'`  | Variante visual del botón.                                                                                      |
| `size`         | `'xs' \| 's' \| 'm' \| 'l' \| 'xl'`                                | `'m'`       | Tamaño M3 Expressive. Controla el `min-height` (área táctil) y el padding horizontal, en reposo y al presionar. |
| `shape`        | `'round' \| 'square'`                                              | `'round'`   | Forma M3 Expressive en reposo. Controla el `border-radius`, en reposo y al presionar.                           |
| `icon`         | `ReactNode`                                                        | —           | Icono líder renderizado antes de la etiqueta.                                                                   |
| `iconTrailing` | `ReactNode`                                                        | —           | Icono al final renderizado después de la etiqueta.                                                              |
| `testId`       | `string`                                                           | —           | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                     |
| `disabled`     | `boolean`                                                          | `false`     | Deshabilita el botón y elimina los eventos de puntero.                                                          |
| `type`         | `'button' \| 'submit' \| 'reset'`                                  | `'button'`  | Atributo `type` del elemento `<button>`. Por defecto `'button'` para evitar envíos accidentales de formulario.  |
| `className`    | `string`                                                           | —           | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                      |
| `onClick`      | `MouseEventHandler`                                                | —           | Manejador del evento click. No se dispara cuando el botón está deshabilitado.                                   |
| ...rest        | `ButtonHTMLAttributes`                                             | —           | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz.                                     |

## Tamaños y formas (M3 Expressive)

Además de `variant`, `Button` admite dos ejes de personalización de M3 Expressive: `size` y `shape`.

### `size`

Controla el área táctil (`min-height`) y el padding horizontal del botón, tanto en reposo como al presionar.

| Tamaño | `min-height` | Uso recomendado                                                          |
| ------ | ------------ | ------------------------------------------------------------------------ |
| `xs`   | 40px         | Espacios muy compactos (toolbars densas).                                |
| `s`    | 44px         | Listas o formularios compactos.                                          |
| `m`    | 48px         | Por defecto. Cumple el área táctil mínima de 48×48dp recomendada por M3. |
| `l`    | 52px         | Acciones destacadas.                                                     |
| `xl`   | 56px         | Pantallas de gran formato o mayor accesibilidad.                         |

```tsx
<Button size="xs">XS</Button>
<Button size="s">S</Button>
<Button size="m">M</Button>
<Button size="l">L</Button>
<Button size="xl">XL</Button>
```

### `shape`

Controla el `border-radius` del botón, tanto en reposo como al presionar (M3 Expressive "shape morph").

- `round` (por defecto) — esquinas totalmente redondeadas.
- `square` — esquinas levemente redondeadas (`corner-medium`).

```tsx
<Button shape="round">Round</Button>
<Button shape="square">Square</Button>
```

## Ejemplos

### Uso básico

```tsx
import { Button } from '@poncegl/material-design-3';

<Button>Guardar</Button>;
```

### Las cinco variantes

```tsx
<Button variant="filled">Filled</Button>
<Button variant="elevated">Elevated</Button>
<Button variant="filled-tonal">Filled Tonal</Button>
<Button variant="outlined">Outlined</Button>
<Button variant="text">Text</Button>
```

### Con icono líder

```tsx
import { PlusIcon } from './icons';

<Button variant="filled" icon={<PlusIcon />}>
  Agregar elemento
</Button>;
```

### Con icono al final

```tsx
import { ArrowIcon } from './icons';

<Button variant="filled" iconTrailing={<ArrowIcon />}>
  Continuar
</Button>;
```

### Estado deshabilitado

```tsx
<Button disabled>No disponible</Button>
```

### Con `testId` para pruebas

```tsx
<Button testId="submit-btn" type="submit">
  Enviar formulario
</Button>;

// En el test:
screen.getByTestId('submit-btn');
```

### Fusión de clases con `className`

Las clases adicionales se fusionan correctamente con las del componente sin romper las variantes:

```tsx
<Button className="w-full">Botón de ancho completo</Button>
```

## Accesibilidad

### `aria-label` para botones icon-only

Cuando el botón no tiene texto visible — por ejemplo, un botón que solo contiene un icono —, proporciona un `aria-label` descriptivo:

```tsx
<Button aria-label="Cerrar diálogo" icon={<CloseIcon />} />
```

Sin texto ni `aria-label`, el botón no tendrá nombre accesible y fallará en auditorías de accesibilidad.

### Comportamiento con teclado

El componente hereda el comportamiento nativo del elemento `<button>`:

- `Enter` y `Space` disparan el evento `onClick`.
- `Tab` y `Shift+Tab` navegan entre botones y otros elementos interactivos.
- Cuando está deshabilitado, el botón queda fuera del flujo de tabulación del navegador.

### Touch target

El `min-height` del botón depende de `size` (ver [Tamaños y formas](#tamaños-y-formas-m3-expressive)). El valor por defecto, `'m'` (48px), cumple con el mínimo de área táctil de 48×48 dp recomendado por M3 y las pautas de accesibilidad móvil. Los tamaños `xs` (40px) y `s` (44px) quedan por debajo de esa recomendación: úsalos solo en contextos de espacio reducido y considera reforzar el área táctil con `padding`/`margin` en el contenedor.
