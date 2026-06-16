# @poncegl/material-design-3

Librería de componentes React basada en Material Design 3 de Google, inspirada en los patrones de Jetpack Compose.

## Instalación

```bash
npm install @poncegl/material-design-3
```

## Configuración inicial

Importa el stylesheet una sola vez en la raíz de tu aplicación:

```tsx
import '@poncegl/material-design-3/styles.css';
```

Envuelve tu app con `MD3Provider` y pasa un color fuente para generar el tema:

```tsx
import { MD3Provider } from '@poncegl/material-design-3';

export function App() {
  return <MD3Provider sourceColor="#6750A4">{/* tu aplicación */}</MD3Provider>;
}
```

## Componentes

| Componente         | Descripción                                                          | Documentación                                                                                                           |
| ------------------ | -------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `Button`           | Botón M3 en sus variantes de énfasis                                 | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/Button.md)           |
| `ButtonGroup`      | Grupo de botones M3                                                  | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/ButtonGroup.md)      |
| `ToggleButton`     | ToggleButton M3 con sus variantes de énfasis                         | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/ToggleButton.md)     |
| `IconButton`       | Botón M3 de icono en sus variantes de énfasis                        | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/IconButton.md)       |
| `ToggleIconButton` | IconButton M3 con estado de alternancia                              | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/ToggleIconButton.md) |
| `SegmentedButton`  | Segmented button M3 "clásico" de igual ancho                         | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/SegmentedButton.md)  |
| `SplitButton`      | Botón principal + trigger secundario fusionados (M3 Expressive)      | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/SplitButton.md)      |
| `List`             | Contenedor vertical M3 Expressive con estilos `standard`/`segmented` | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/List.md)             |
| `ListItem`         | Item de lista M3 con slots leading/trailing y alturas auto-derivadas | [Ver documentación →](https://github.com/PonceGL/Material-Design-3-React/blob/main/docs/components/List.md)             |
