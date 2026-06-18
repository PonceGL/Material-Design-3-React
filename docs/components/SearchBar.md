# SearchBar

`SearchBar` sigue la especificación [Search de Material Design 3](https://m3.material.io/components/search/overview): un campo de búsqueda persistente, de forma `corner-full`, con ícono líder opcional y hasta dos acciones (y/o un avatar) al final. Es la pieza "siempre visible" de la categoría Search — empareja con [`SearchView`](./SearchView.md) (vía su prop `searchBar`) para mostrar sugerencias o resultados debajo.

```tsx
<SearchBar
  aria-label="Search"
  placeholder="Search…"
  leadingIcon={<SearchIcon />}
/>
```

## Props

| Prop              | Tipo                                    | Por defecto | Descripción                                                                                                                                                                                     |
| ----------------- | --------------------------------------- | ----------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `leadingIcon`     | `ReactNode`                             | —           | Ícono antes del input — típicamente una lupa, o una flecha "back" cuando el `SearchBar` está dentro de un `SearchView` abierto.                                                                 |
| `trailingActions` | `ReactNode`                             | —           | Hasta dos acciones al final del campo (p. ej. un `IconButton` de esta librería con un ícono provisto por el consumidor) y/o un avatar. Los íconos en sí quedan fuera de alcance de la librería. |
| `type`            | `HTMLInputTypeAttribute`                | `'search'`  | Atributo nativo `type` del `<input>`. A diferencia de `TextField`, no está restringido — puede sobreescribirse si se necesita.                                                                  |
| `testId`          | `string`                                | —           | Propagado como `data-testid` en el contenedor raíz para selectores de prueba.                                                                                                                   |
| `className`       | `string`                                | —           | Clases adicionales que se fusionan con las del componente mediante `cn()`. Se aplican al contenedor raíz.                                                                                       |
| `...rest`         | `InputHTMLAttributes<HTMLInputElement>` | —           | Cualquier atributo HTML válido se propaga al `<input>` (`value`, `onChange`, `placeholder`, `onFocus`, `onBlur`, `aria-label`, etc.).                                                           |

## Tokens y medidas

| Elemento                   | Atributo                                 | Valor                                          |
| -------------------------- | ---------------------------------------- | ---------------------------------------------- |
| Contenedor                 | Altura                                   | 56dp                                           |
| Contenedor                 | Forma                                    | `corner-full` (siempre, sin shape-morph)       |
| Contenedor                 | Fondo                                    | `surface-container-high`                       |
| Padding horizontal         | En reposo                                | 24dp                                           |
| Padding horizontal         | Con foco (M3 Expressive "grow on focus") | 12dp                                           |
| Ícono líder/texto          | Gap                                      | 16dp                                           |
| Avatar (`trailingActions`) | Tamaño                                   | 30dp                                           |
| State-layer                | Hover / Focus / Pressed                  | `on-surface-variant` opacidad 0.08 / 0.1 / 0.1 |

El "grow on focus" (padding 24dp → 12dp) y el state-layer son transiciones CSS puras (`:focus-within`, `:hover`) — no requieren estado de React para dispararse.

## Accesibilidad

El `<input>` necesita un nombre accesible. `placeholder` por sí solo **sí es técnicamente suficiente** — el cómputo de nombre accesible (HTML-AAM) lo usa como último recurso cuando no hay `label`/`aria-label`/`aria-labelledby`, y `axe-core` no marca una violación en ese caso — pero sigue siendo **buena práctica** pasar un `aria-label` explícito: el `placeholder` desaparece visualmente en cuanto el campo tiene texto, y algunos lectores de pantalla lo anuncian de forma menos consistente que un `aria-label`.

```tsx
<SearchBar
  aria-label="Search"
  placeholder="Search…"
  leadingIcon={<SearchIcon />}
/>
```

Cuando `trailingActions` incluye controles interactivos (p. ej. un `IconButton` para búsqueda por voz), cada uno necesita su propio `aria-label` — `SearchBar` no aporta ninguno automáticamente, ya que el contenido de `trailingActions` es responsabilidad del consumidor.

## Ejemplos

### Básico

```tsx
import { SearchBar } from '@poncegl/material-design-3';

<SearchBar
  aria-label="Search"
  placeholder="Search…"
  leadingIcon={<SearchIcon />}
/>;
```

### Con acciones (`trailingActions`)

```tsx
import { IconButton, SearchBar } from '@poncegl/material-design-3';

<SearchBar
  aria-label="Search"
  placeholder="Search…"
  leadingIcon={<SearchIcon />}
  trailingActions={
    <IconButton size="s" icon={<MicIcon />} aria-label="Search by voice" />
  }
/>;
```

### Con avatar

```tsx
<SearchBar
  aria-label="Search"
  placeholder="Search…"
  leadingIcon={<SearchIcon />}
  trailingActions={<Avatar initials="JD" />}
/>
```

### Controlado, abriendo un `SearchView` al enfocar

```tsx
function Search() {
  const [open, setOpen] = useState(false);

  return (
    <SearchView
      open={open}
      onClose={() => setOpen(false)}
      searchBar={
        <SearchBar
          aria-label="Search"
          placeholder="Search…"
          leadingIcon={<SearchIcon />}
          onFocus={() => setOpen(true)}
        />
      }
    >
      {/* resultados */}
    </SearchView>
  );
}
```

Ver [`SearchView`](./SearchView.md) para la documentación completa del panel de resultados.
