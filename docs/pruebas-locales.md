# Pruebas locales con pnpm

Este documento describe cómo probar la librería localmente en un proyecto externo antes de publicarla en npm.

> **Verificado con:** pnpm 11.1.3, React 19, Vite 8 (Electron), Next.js 16.

---

## Requisitos previos

- pnpm 11 o superior instalado globalmente
- Un proyecto React externo (React ≥ 18.2)
- La librería compilada al menos una vez (ver paso 1)

---

## Paso 1 — Compilar y verificar la librería

Desde la **raíz del monorepo**, ejecuta el comando de verificación completo:

```bash
pnpm build:local
```

Este comando se ejecuta en secuencia y se detiene inmediatamente si algún paso falla:

1. **Typecheck** — valida todos los archivos TypeScript, incluyendo los de prueba
2. **Tests** — ejecuta la suite de pruebas completa
3. **Build** — compila y empaqueta la librería en `dist/`

El resultado de una ejecución exitosa:

```
dist/
  index.js        # Punto de entrada ESM
  index.cjs       # Punto de entrada CommonJS
  index.d.ts      # Declaraciones de tipos TypeScript
  styles.css      # Estilos de componentes (requieren importación explícita)
  components/     # Declaraciones de tipos por componente
```

> Usa `pnpm build` si solo necesitas compilar sin ejecutar pruebas (por ejemplo, en CI o cuando estás iterando sobre estilos).

---

## Paso 2 — Enlazar el paquete

Hay dos enfoques disponibles. Usa esta tabla para elegir:

| Situación                                  | Usa         |
| ------------------------------------------ | ----------- |
| Windows (cualquier framework)              | `file:` (A) |
| macOS / Linux + Next.js / Turbopack        | `file:` (A) |
| macOS / Linux + Vite (Electron, Vite puro) | Cualquiera  |

### Opción A — protocolo `file:` (recomendado, funciona en todas las plataformas)

1. Agrega la dependencia manualmente en `package.json`. **Usa barras hacia adelante en todas las plataformas, incluido Windows** (evita problemas de escapado):

   **macOS / Linux:**

   ```json
   "@poncegl/material-design-3": "file:../ruta/relativa/a/packages/material-design-3"
   ```

   **Windows (usa barras hacia adelante, no barras invertidas):**

   ```json
   "@poncegl/material-design-3": "file:C:/Users/tunombre/Documents/DEV/Material-Design-3-React/packages/material-design-3"
   ```

2. Ejecuta `pnpm install`:

   ```bash
   pnpm install
   ```

   Verás una línea de confirmación en la salida:

   ```
   + @poncegl/material-design-3 0.1.0
   ```

> **Por qué `file:` funciona en todas partes:** pnpm copia los archivos del paquete al virtual store (`.pnpm/` dentro del proyecto) mediante hardlinks, y luego crea un symlink de `node_modules/@poncegl/material-design-3` hacia ese store local. El symlink nunca cruza el límite del directorio del proyecto, por lo que Vite lo resuelve en cualquier OS.

> **Por qué `link:` falla en Windows y Next.js:** `link:` crea un symlink que apunta directamente a la ruta externa. Vite en Windows y Next.js / Turbopack no siguen symlinks que cruce el límite del directorio del proyecto.

> **No hagas commit de estos cambios a tu rama principal.** Las rutas en `package.json` son específicas de tu máquina y solo son válidas durante las pruebas locales. Ve el [Paso 6](#paso-6--desconectar-el-enlace) para limpiarlos.

---

### Opción B — `pnpm link` (solo macOS / Linux + Vite)

> **No funciona en Windows** — Vite no puede seguir symlinks que apunten fuera del directorio del proyecto en Windows, aunque el Modo desarrollador esté activado. Usa la Opción A.
>
> **No funciona con Next.js / Turbopack** — misma restricción de symlinks. Usa la Opción A.

Desde la **raíz de tu proyecto externo**, ejecuta:

```bash
pnpm link /ruta/absoluta/a/Material-Design-3-React/packages/material-design-3
```

pnpm modificará tres archivos: `package.json` (protocolo `link:`), `pnpm-workspace.yaml` (override) y `pnpm-lock.yaml`.

Después de recompilar, no es necesario ningún paso adicional — el symlink ya apunta directamente a `dist/`.

Para desconectar, ve el [Paso 6](#paso-6--desconectar-el-enlace).

---

## Paso 3 — Importar en tu proyecto

### Componentes

```tsx
import { Button } from '@poncegl/material-design-3';
```

### Estilos

El CSS debe importarse de forma explícita. Agrega esta importación una vez en el punto de entrada de tu app (por ejemplo, `main.tsx`, `App.tsx`):

```tsx
import '@poncegl/material-design-3/styles.css';
```

---

## Paso 4 — Verificar los tipos TypeScript

Ejecuta el verificador de tipos en tu proyecto externo:

```bash
pnpm typecheck
# o
npx tsc --noEmit
```

Una ejecución exitosa (sin salida, código de salida 0) confirma que `dist/index.d.ts` está resolviendo correctamente y que todos los tipos exportados están disponibles.

---

## Paso 5 — Recompilar después de cambios

Desde la **raíz del monorepo**, ejecuta:

```bash
pnpm build:local
```

**Si usaste la Opción A (`file:`)**, ejecuta este comando adicional en tu proyecto externo después de cada recompilación:

```bash
pnpm update @poncegl/material-design-3
```

> `file:` copia los archivos al virtual store de pnpm mediante hardlinks. Después de una recompilación (nuevos inodos), `pnpm update` vuelve a copiar los archivos. Un `pnpm install` normal no es suficiente.

**Si usaste la Opción B (`pnpm link`)**, no se necesita ningún paso adicional — el symlink ya apunta a `dist/`.

---

## Paso 6 — Desconectar el enlace

### Opción A (`file:`)

1. Abre `package.json` y **elimina** la entrada `file:`:

   ```diff
   - "@poncegl/material-design-3": "file:../ruta/a/packages/material-design-3",
   ```

2. Elimina el bloque de override de `pnpm-workspace.yaml` si existe:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': file:../ruta/a/packages/material-design-3
   ```

3. Ejecuta `pnpm install`:

   ```bash
   pnpm install
   ```

### Opción B (`pnpm link`)

> **¿Por qué no usar `pnpm unlink`?** `pnpm unlink <paquete>` no elimina la entrada `link:` de `package.json` ni el override de `pnpm-workspace.yaml`. Siempre límpialos manualmente.

1. Abre `package.json` y **elimina** la entrada `link:`:

   ```diff
   - "@poncegl/material-design-3": "link:../ruta/a/packages/material-design-3",
   ```

2. Abre `pnpm-workspace.yaml` y **elimina** el bloque de override:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': link:../ruta/a/packages/material-design-3
   ```

3. Ejecuta `pnpm install`:

   ```bash
   pnpm install
   ```

---

## Contenido del paquete publicado

Para ver exactamente qué archivos se incluirían en una publicación, ejecuta desde el directorio del paquete:

```bash
cd packages/material-design-3
pnpm pack:preview
```

Salida esperada:

```
Tarball Contents
dist/components/Button.d.ts
dist/index.cjs
dist/index.d.ts
dist/index.js
dist/styles.css
package.json
```

Solo se publican los archivos de `dist/` y `package.json`. Los archivos fuente, pruebas, configuración y la app de ejemplo **no se incluyen**.

El hook `prepublishOnly` ejecuta `pnpm build:local` automáticamente antes de cada `pnpm publish`, asegurando que el paquete siempre esté verificado y compilado antes de llegar a npm.

---

## Referencia rápida

| Tarea                                             | Comando                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Compilar + verificar (recomendado)                | `pnpm build:local` (desde la raíz del monorepo)                                             |
| Solo compilar (rápido)                            | `pnpm build` (desde la raíz del monorepo)                                                   |
| Enlazar — Opción A, todas las plataformas (file:) | Agrega `file:<ruta>` a `package.json`, luego `pnpm install`                                 |
| Enlazar — Opción B, solo macOS/Linux + Vite       | `pnpm link <ruta-absoluta>` (desde la raíz del proyecto externo)                            |
| Verificar tipos                                   | `pnpm typecheck` (en el proyecto externo)                                                   |
| Recompilar después de cambios — Opción A          | `pnpm build:local` → `pnpm update @poncegl/material-design-3`                               |
| Recompilar después de cambios — Opción B          | `pnpm build:local` — sin paso adicional                                                     |
| Ver archivos que se publicarían                   | `pnpm pack:preview` (desde `packages/material-design-3`)                                    |
| Desconectar — Opción A                            | Elimina `file:` de `package.json` + override de `pnpm-workspace.yaml`, luego `pnpm install` |
| Desconectar — Opción B                            | Elimina `link:` de `package.json` + override de `pnpm-workspace.yaml`, luego `pnpm install` |
