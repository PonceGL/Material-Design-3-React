# SearchView

`SearchView` sigue la especificación [Search de Material Design 3](https://m3.material.io/components/search/overview): el panel de "búsqueda enfocada" que aparece debajo de un [`SearchBar`](./SearchBar.md) con sugerencias o resultados. El `SearchBar` se pasa vía la prop `searchBar` (composición explícita) y **es siempre visible**, independientemente del estado `open` — solo el panel de resultados se muestra u oculta. Vacío por defecto; el consumidor agrega contenido como `children`, normalmente con [`List`/`ListItem`](./List.md) de esta misma librería.

```tsx
<SearchView
  open={open}
  searchBar={<SearchBar aria-label="Search" onFocus={() => setOpen(true)} />}
  onClose={() => setOpen(false)}
>
  <List aria-label="Resultados">
    <ListItem label="Resultado 1" />
  </List>
</SearchView>
```

## `style`: `contained` vs `divided`

| Estilo                | Fondo propio                                        | Separador                  | Recomendación M3                                                                    |
| --------------------- | --------------------------------------------------- | -------------------------- | ----------------------------------------------------------------------------------- |
| `contained` (default) | Sí — `surface-container-low`/`-high` según `layout` | No                         | M3 Expressive, **recomendado**                                                      |
| `divided`             | No                                                  | Sí — 1px `outline-variant` | Baseline, **no recomendado** (úsalo solo por compatibilidad con diseños existentes) |

`divided` no pinta ningún fondo de relleno — solo agrega la línea divisoria entre el `SearchBar` y los resultados, replicando la spec M3 ("the divided style uses a divider to separate the search bar from suggestions and results", a diferencia de "the contained style has a persistent, filled container").

## `layout`: `full-screen` vs `docked`

| Layout                  | Cuándo                              | Fondo (`style="contained"`) | Ancho        | Gap bar↔resultados |
| ----------------------- | ----------------------------------- | --------------------------- | ------------ | ------------------ |
| `full-screen` (default) | Pantallas compactas (<600dp)        | `surface-container-low`     | Completo     | —                  |
| `docked`                | Pantallas medianas/grandes (≥600dp) | `surface-container-high`    | Máximo 720dp | 2dp                |

## Estados y transiciones

- **`open`** (requerido) controla la visibilidad del panel de resultados — siempre es una prop controlada por el consumidor.
- El panel **siempre está montado en el DOM**; nunca se desmonta condicionalmente. La visibilidad se expresa con `data-state="open"`/`"closed"` en el panel interno, animado en CSS (`max-height`/`opacity`/`visibility`, ~200-250ms) para una transición suave.
- Cuando `open={false}`, el panel recibe el atributo nativo `inert` (no focuseable, excluido del árbol de accesibilidad) — pero **el `SearchBar` permanece visible y funcional**, ya que vive fuera del área que colapsa.
- **`Escape`** llama a `onClose` mientras el panel está abierto (sin importar si el foco está en el `SearchBar` o dentro de los resultados). `SearchView` no renderiza ningún botón de cierre — ese disparador visible es responsabilidad del consumidor, típicamente un ícono "back" en el `leadingIcon` del propio `SearchBar`:

```tsx
<SearchBar
  aria-label="Search"
  leadingIcon={
    open ? (
      <button type="button" aria-label="Back" onClick={() => setOpen(false)}>
        <BackIcon />
      </button>
    ) : (
      <SearchIcon />
    )
  }
  onFocus={() => setOpen(true)}
/>
```

## Props

| Prop        | Tipo                                            | Por defecto     | Descripción                                                                                                                                                                                                                                                |
| ----------- | ----------------------------------------------- | --------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `open`      | `boolean`                                       | — (requerido)   | Visibilidad del panel de resultados. Siempre controlada por el consumidor.                                                                                                                                                                                 |
| `layout`    | `'full-screen' \| 'docked'`                     | `'full-screen'` | Ver [`layout`](#layout-full-screen-vs-docked).                                                                                                                                                                                                             |
| `style`     | `'contained' \| 'divided'`                      | `'contained'`   | Ver [`style`](#style-contained-vs-divided).                                                                                                                                                                                                                |
| `searchBar` | `ReactNode`                                     | — (requerido)   | El `SearchBar` asociado a este panel — siempre visible, independientemente de `open`.                                                                                                                                                                      |
| `children`  | `ReactNode`                                     | —               | Contenido de sugerencias/resultados — recomendado `List`/`ListItem` de esta librería.                                                                                                                                                                      |
| `onClose`   | `() => void`                                    | —               | Llamado al presionar `Escape` mientras `open` es `true`.                                                                                                                                                                                                   |
| `testId`    | `string`                                        | —               | Propagado como `data-testid` en el contenedor raíz para selectores de prueba.                                                                                                                                                                              |
| `className` | `string`                                        | —               | Clases adicionales que se fusionan con las del componente mediante `cn()`. Se aplican al contenedor raíz.                                                                                                                                                  |
| `...rest`   | `Omit<HTMLAttributes<HTMLDivElement>, 'style'>` | —               | Cualquier atributo HTML válido se propaga al contenedor raíz (`role`, `aria-*`, etc.). El atributo nativo `style` (CSSProperties) queda excluido porque `style` ya es la prop de variante visual de M3 — usa `className` para ajustes de layout puntuales. |

`SearchView` no aporta ningún rol ARIA propio por defecto — el contenido de `children` (p. ej. `List`) trae el suyo.

## Ejemplos

### Full-screen, con resultados reales

```tsx
import {
  List,
  ListItem,
  SearchBar,
  SearchView,
} from '@poncegl/material-design-3';

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
      <List aria-label="Recent searches">
        <ListItem leading={<HistoryIcon />} label="Material Design 3" />
        <ListItem leading={<HistoryIcon />} label="React component library" />
      </List>
    </SearchView>
  );
}
```

### Docked (pantallas medianas/grandes)

```tsx
<SearchView
  open={open}
  layout="docked"
  searchBar={<SearchBar aria-label="Search" />}
>
  {/* resultados */}
</SearchView>
```

### Divided (baseline)

```tsx
<SearchView
  open={open}
  style="divided"
  searchBar={<SearchBar aria-label="Search" />}
>
  {/* resultados */}
</SearchView>
```

## Accesibilidad

- El panel cerrado (`open={false}`) recibe `inert`, por lo que su contenido queda excluido del árbol de accesibilidad y no es focuseable mientras está oculto.
- `Escape` cierra el panel sin requerir que el consumidor cablee un listener de teclado manualmente.
- El `SearchBar` pasado vía `searchBar` necesita su propio `aria-label` — ver [accesibilidad de `SearchBar`](./SearchBar.md#accesibilidad).
- Cero violaciones de `axe-core` en las combinaciones de `layout`/`style`/`open` cubiertas en la suite de tests del componente.
