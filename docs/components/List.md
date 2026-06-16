# List / ListItem

`List` y `ListItem` implementan la especificación ["Lists" (M3 Expressive)](https://m3.material.io/components/lists/overview) de Material Design 3: un índice vertical continuo de texto e imágenes con soporte para slots de contenido flexible.

> **M3 Expressive (Dic 2025)**: la variante **expressive** es la recomendada — esquinas redondeadas, estados de selección destacados y slots personalizables. La variante `baseline` (esquinas cuadradas, colores estándar) sigue disponible, pero no incluye las últimas actualizaciones visuales. Esta librería implementa el comportamiento expressive a través de las props `variant`, `selected` y los slots `leading`/`trailing`.

## `List`

`List` es el contenedor vertical. Agrupa `ListItem` en dos estilos visuales (`standard` y `segmented`) sin afectar el comportamiento de los items.

### Props

| Prop        | Tipo                             | Por defecto   | Descripción                                                                                           |
| ----------- | -------------------------------- | ------------- | ----------------------------------------------------------------------------------------------------- |
| `variant`   | `'standard' \| 'segmented'`      | `'standard'`  | Estilo visual. `'segmented'` añade gap de 12dp entre items y un fondo `surface` propio al contenedor. |
| `children`  | `ReactNode`                      | — (requerido) | Items de la lista (`ListItem`).                                                                       |
| `testId`    | `string`                         | —             | Propagado como `data-testid` en el elemento raíz.                                                     |
| `className` | `string`                         | —             | Clases adicionales fusionadas con `cn()`.                                                             |
| `...rest`   | `HTMLAttributes<HTMLDivElement>` | —             | Cualquier atributo HTML válido para `<div>` se propaga al elemento raíz (p.ej. `aria-label`, `id`).   |

### `standard` vs `segmented`

|                  | `standard`                  | `segmented`                            |
| ---------------- | --------------------------- | -------------------------------------- |
| Gap entre items  | 0                           | 12dp                                   |
| Fondo contenedor | Ninguno (transparente)      | `surface`                              |
| Esquinas         | Heredadas de `ListItem`     | Heredadas de `ListItem`                |
| Cuándo usar      | Listas de navegación, menús | Listas con items visualmente separados |

## `ListItem`

`ListItem` representa un item individual. La altura se deriva automáticamente del contenido: la presencia de `overline` activa el modo de tres líneas, la de `supportingText` el de dos líneas, y ninguno de los dos el de una línea.

### Props

| Prop             | Tipo                             | Por defecto   | Descripción                                                                                                                |
| ---------------- | -------------------------------- | ------------- | -------------------------------------------------------------------------------------------------------------------------- |
| `label`          | `string`                         | — (requerido) | Texto primario del item. Provee el nombre accesible cuando no hay `aria-label` explícito.                                  |
| `leading`        | `ReactNode`                      | —             | Slot inicial: avatar, icono, imagen, miniatura de video o control de selección (`checkbox`, `radio`, `switch`).            |
| `overline`       | `string`                         | —             | Texto pequeño encima del `label` (M3 Expressive). Su presencia activa la altura de **tres líneas** (88dp).                 |
| `supportingText` | `string`                         | —             | Texto secundario debajo del `label`. Su presencia activa la altura de **dos líneas** (72dp) si `overline` está ausente.    |
| `trailing`       | `ReactNode`                      | —             | Slot final: icono, texto corto o control de selección. Siempre queda fuera del área primaria para evitar botones anidados. |
| `selected`       | `boolean`                        | `false`       | Estado de selección presentacional — el fondo del item pasa a `secondary-container`.                                       |
| `disabled`       | `boolean`                        | `false`       | El contenido se renderiza con 0.38 de opacidad y las interacciones quedan deshabilitadas.                                  |
| `onClick`        | `() => void`                     | —             | Si se proporciona, el área primaria (leading + texto) se convierte en un `<button>` interno con el handler de click.       |
| `testId`         | `string`                         | —             | Propagado como `data-testid` en el elemento raíz.                                                                          |
| `className`      | `string`                         | —             | Clases adicionales fusionadas con `cn()`.                                                                                  |
| `...rest`        | `HTMLAttributes<HTMLDivElement>` | —             | Cualquier atributo HTML válido para `<div>` se propaga al elemento raíz.                                                   |

## Anatomía y slots

Un `ListItem` tiene tres zonas de contenido:

| Slot      | Prop            | Contenido admitido                                                      | Requerido    |
| --------- | --------------- | ----------------------------------------------------------------------- | ------------ |
| Leading   | `leading`       | Avatar, icono, imagen, miniatura de video, checkbox / radio / switch    | No           |
| Contenido | `label` + texto | `overline` (opcional), `label` (requerido), `supportingText` (opcional) | Sí (`label`) |
| Trailing  | `trailing`      | Icono, texto corto, checkbox / radio / switch                           | No           |

> **Nota sobre controles de selección**: `checkbox`, `radio` y `switch` no están incluidos en esta librería — se pasan como `ReactNode` directamente en `leading` o `trailing`. `Divider` se documenta por separado (ver [`Divider.md`](./Divider.md), RCL-165).

### Restricciones de slots

- El slot `leading` y el slot `trailing` deben ser **más estrechos** que la sección de contenido.
- El target táctil mínimo recomendado por M3 es **48×48dp**.
- No añadas elementos interactivos en `trailing` cuando el item ya tiene `onClick` — el `<button>` del área primaria no puede contener otro `<button>`.

## Alturas auto-derivadas

La altura mínima del item se determina automáticamente según qué props de texto estén presentes:

| Modo        | Condición                                        | Altura mínima |
| ----------- | ------------------------------------------------ | ------------- |
| Una línea   | Sin `overline` ni `supportingText`               | 56dp (3.5rem) |
| Dos líneas  | `supportingText` presente, sin `overline`        | 72dp (4.5rem) |
| Tres líneas | `overline` presente (con o sin `supportingText`) | 88dp (5.5rem) |

No hay ninguna prop de altura — el componente la resuelve por CSS.

## Color por estado

### Item no seleccionado

| Estado   | Texto / icono      | State layer      |
| -------- | ------------------ | ---------------- |
| Default  | `on-surface`       | —                |
| Hover    | `on-surface`       | `on-surface` 8%  |
| Focus    | `on-surface`       | `on-surface` 10% |
| Pressed  | `on-surface`       | `on-surface` 10% |
| Disabled | `on-surface` (38%) | —                |

### Item seleccionado (`selected={true}`)

| Estado  | Fondo                 | Texto / icono            | State layer                  |
| ------- | --------------------- | ------------------------ | ---------------------------- |
| Default | `secondary-container` | `on-secondary-container` | —                            |
| Hover   | `secondary-container` | `on-secondary-container` | `on-secondary-container` 8%  |
| Focus   | `secondary-container` | `on-secondary-container` | `on-secondary-container` 10% |
| Pressed | `secondary-container` | `on-secondary-container` | `on-secondary-container` 10% |

## Ejemplos

### Lista simple (una línea)

```tsx
import { List, ListItem } from '@poncegl/material-design-3';

function InboxList() {
  return (
    <List>
      <ListItem label="Bandeja de entrada" />
      <ListItem label="Enviados" />
      <ListItem label="Borradores" />
      <ListItem label="Papelera" />
    </List>
  );
}
```

### Con leading icon y supporting text (dos líneas)

```tsx
import { List, ListItem } from '@poncegl/material-design-3';

function FileList() {
  return (
    <List variant="segmented">
      <ListItem
        leading={<img src="/icons/pdf.svg" alt="" width={40} height={40} />}
        label="Informe_Q4.pdf"
        supportingText="2.4 MB · hace 3 días"
      />
      <ListItem
        leading={<img src="/icons/doc.svg" alt="" width={40} height={40} />}
        label="Propuesta_cliente.docx"
        supportingText="840 KB · hace 1 semana"
      />
    </List>
  );
}
```

### Con overline y trailing text (tres líneas)

```tsx
import { List, ListItem } from '@poncegl/material-design-3';

function MessageList() {
  return (
    <List>
      <ListItem
        overline="María García"
        label="Reunión del lunes"
        supportingText="Confirmo asistencia. Nos vemos a las 10:00 en la sala 3."
        trailing={<span>10:42</span>}
      />
      <ListItem
        overline="Carlos López"
        label="Actualización del proyecto"
        supportingText="Acabo de subir los últimos cambios al repositorio."
        trailing={<span>09:15</span>}
      />
    </List>
  );
}
```

### Lista con acciones (single-action)

```tsx
import { List, ListItem } from '@poncegl/material-design-3';

function NavigationList() {
  return (
    <List>
      <ListItem label="Perfil" onClick={() => navigate('/profile')} />
      <ListItem label="Configuración" onClick={() => navigate('/settings')} />
      <ListItem label="Ayuda" onClick={() => navigate('/help')} />
      <ListItem label="Cerrar sesión" onClick={handleLogout} disabled />
    </List>
  );
}
```

### Lista de selección (single-select con `useState`)

`ListItem` no gestiona el estado de selección — el componente padre decide qué item está seleccionado.

```tsx
import { useState } from 'react';

import { List, ListItem } from '@poncegl/material-design-3';

type Category = 'all' | 'unread' | 'starred' | 'important';

function FilterList() {
  const [active, setActive] = useState<Category>('all');

  const items: { id: Category; label: string }[] = [
    { id: 'all', label: 'Todos' },
    { id: 'unread', label: 'No leídos' },
    { id: 'starred', label: 'Destacados' },
    { id: 'important', label: 'Importantes' },
  ];

  return (
    <List variant="segmented" aria-label="Filtrar mensajes">
      {items.map(({ id, label }) => (
        <ListItem
          key={id}
          label={label}
          selected={active === id}
          onClick={() => setActive(id)}
        />
      ))}
    </List>
  );
}
```

### Con controles de selección en el trailing

Los controles de selección se pasan como `ReactNode` — la librería no incluye `Checkbox`, `Radio` ni `Switch`.

```tsx
<List aria-label="Tareas">
  <ListItem
    label="Revisar pull requests"
    trailing={
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
        aria-label="Marcar tarea completada"
      />
    }
  />
</List>
```

## Accesibilidad

- **`role="list"`**: `List` renderiza un `<div role="list">` que comunica la semántica de lista a tecnologías asistivas.
- **`role="listitem"`**: cada `ListItem` renderiza un `<div role="listitem">` como hijo directo.
- **Nombre accesible del grupo**: pasa `aria-label` (o `aria-labelledby`) en `List` para describir su propósito, por ejemplo `aria-label="Carpetas"`.
- **Item con `onClick`**: cuando se proporciona `onClick`, el área primaria (leading + texto) se envuelve en un `<button type="button">` nativo — las interacciones de teclado (`Enter`, `Space`) y el foco están gestionados automáticamente por el navegador. El nombre accesible del botón proviene del texto visible en `label`.
- **`disabled`**: el `<button>` interno recibe el atributo `disabled` nativo, eliminando el item del orden de tabulación y comunicando el estado a tecnologías asistivas. El contenedor renderiza con `opacity-[0.38]`.
- **Botones anidados**: el slot `trailing` vive **fuera** del `<button>` del área primaria para que un control interactivo en `trailing` (p.ej. un icono de menú) nunca quede anidado dentro de otro `<button>`.
- **Controles de selección en slots**: cuando se pasan `checkbox` / `radio` / `switch` como `ReactNode` en `leading` o `trailing`, asegúrate de que cada control tenga su propio `aria-label` o esté asociado a un `<label>`.
