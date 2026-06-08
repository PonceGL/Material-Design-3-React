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

| Prop           | Tipo                                                               | Por defecto | Descripción                                                                                                    |
| -------------- | ------------------------------------------------------------------ | ----------- | -------------------------------------------------------------------------------------------------------------- |
| `variant`      | `'filled' \| 'elevated' \| 'filled-tonal' \| 'outlined' \| 'text'` | `'filled'`  | Variante visual del botón.                                                                                     |
| `icon`         | `ReactNode`                                                        | —           | Icono líder renderizado antes de la etiqueta.                                                                  |
| `iconTrailing` | `ReactNode`                                                        | —           | Icono al final renderizado después de la etiqueta.                                                             |
| `testId`       | `string`                                                           | —           | Propagado como `data-testid` en el elemento raíz para selectores de prueba.                                    |
| `disabled`     | `boolean`                                                          | `false`     | Deshabilita el botón y elimina los eventos de puntero.                                                         |
| `type`         | `'button' \| 'submit' \| 'reset'`                                  | `'button'`  | Atributo `type` del elemento `<button>`. Por defecto `'button'` para evitar envíos accidentales de formulario. |
| `className`    | `string`                                                           | —           | Clases adicionales que se fusionan con las del componente mediante `cn()`.                                     |
| `onClick`      | `MouseEventHandler`                                                | —           | Manejador del evento click. No se dispara cuando el botón está deshabilitado.                                  |
| ...rest        | `ButtonHTMLAttributes`                                             | —           | Cualquier atributo HTML válido para `<button>` se propaga al elemento raíz.                                    |

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

El componente aplica `min-h-[48px]` en todas las variantes para cumplir con el mínimo de área táctil de 48×48 dp recomendado por M3 y las pautas de accesibilidad móvil.
