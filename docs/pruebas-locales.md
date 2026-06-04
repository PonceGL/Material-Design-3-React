# Pruebas locales con pnpm link

Este documento describe cómo probar la librería localmente en un proyecto externo antes de publicarla en npm.

> **Verificado con:** pnpm 11.1.3, React 19, Vite 8 (Electron), Next.js 16 (ver [notas por framework](#notas-por-framework)).

---

## Requisitos previos

- pnpm 11 o superior instalado globalmente
- Un proyecto React externo (React ≥ 18.2)
- La librería compilada al menos una vez (ver paso 1)

**Solo en Windows:** `pnpm link` crea symlinks, y en Windows crearlos requiere que el **Modo desarrollador** esté activado (`Configuración → Sistema → Para desarrolladores → Modo desarrollador`) o ejecutar la terminal como Administrador. Sin uno de estos, el link parece funcionar pero el paquete no se resuelve. Si no puedes activar el Modo desarrollador, usa el [protocolo `file:`](#windowsvite--electron) en su lugar — copia los archivos al store de pnpm sin symlinks y funciona sin permisos elevados.

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

Desde la **raíz de tu proyecto externo**, ejecuta:

```bash
pnpm link <ruta-absoluta-a-packages/material-design-3>
```

La ruta es siempre **absoluta** y varía según el sistema operativo y el usuario. Ejemplos:

**macOS / Linux**

```bash
pnpm link /Users/tunombre/proyectos/Material-Design-3-React/packages/material-design-3
```

**Windows (PowerShell o Símbolo del sistema)**

```powershell
pnpm link C:\Users\tunombre\Documents\DEV\Material-Design-3-React\packages\material-design-3
```

pnpm modificará tres archivos en tu proyecto:

1. `package.json` — agrega la dependencia usando el protocolo `link:`.
2. `pnpm-workspace.yaml` — agrega un override apuntando a la ruta local (comportamiento de pnpm 11).
3. `pnpm-lock.yaml` — lockfile actualizado.

Verás una línea de confirmación en la salida:

```
dependencies:
+ @poncegl/material-design-3 0.1.0 <- ../Material-Design-3-React/packages/material-design-3
```

> **No hagas commit de estos cambios a tu rama principal.** Las rutas en `package.json` y `pnpm-workspace.yaml` son específicas de tu máquina y solo son válidas durante las pruebas locales. Ve el [Paso 6](#paso-6--desconectar-el-enlace) para limpiarlos.

> **Nota sobre las advertencias de peer dependencies:** pnpm mostrará una advertencia indicando que `react` y `react-dom` no se resuelven a través del enlace. Esto es el comportamiento esperado — la instalación de React del proyecto consumidor se usa en tiempo de ejecución y no hay ningún problema real siempre que React ya esté instalado.

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

Ejecuta el mismo comando que en el paso 1. Esto re-valida todo y actualiza `dist/`. No es necesario volver a enlazar — el symlink ya apunta a `dist/`.

```bash
pnpm build:local
```

---

## Paso 6 — Desconectar el enlace

Cuando ya no necesites el enlace local:

1. Abre `package.json` y **elimina** la entrada `link:`:

   ```diff
   - "@poncegl/material-design-3": "link:../ruta/a/packages/material-design-3",
   ```

2. Abre `pnpm-workspace.yaml` y **elimina** el bloque de override:

   ```diff
   - overrides:
   -   '@poncegl/material-design-3': link:../ruta/a/packages/material-design-3
   ```

3. Ejecuta `pnpm install` para restaurar el proyecto a su estado original:

   ```bash
   pnpm install
   ```

> **¿Por qué no usar `pnpm unlink`?** `pnpm unlink <paquete>` no elimina la entrada `link:` de `package.json` ni el override de `pnpm-workspace.yaml`. Siempre límpialos manualmente y vuelve a ejecutar `pnpm install`.

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

## Notas por framework

### Windows / Vite + Electron

`pnpm link` usa symlinks. En Windows, crearlos requiere el **Modo desarrollador** o ejecutar la terminal como Administrador (ver [Requisitos previos](#requisitos-previos)). Si ves errores como `Module not found` o `Failed to resolve import` después de ejecutar `pnpm link`, el symlink no se creó correctamente.

**Solución recomendada:** usa el protocolo `file:` directamente. Copia los archivos al virtual store de pnpm mediante hardlinks — sin necesidad de permisos de symlink.

1. Agrega la dependencia manualmente en `package.json` usando barras hacia adelante:

   ```diff
   + "@poncegl/material-design-3": "file:../ruta/relativa/a/packages/material-design-3",
   ```

   O con ruta absoluta:

   ```diff
   + "@poncegl/material-design-3": "file:C:/Users/tunombre/Documents/DEV/Material-Design-3-React/packages/material-design-3",
   ```

2. Ejecuta `pnpm install`:

   ```bash
   pnpm install
   ```

3. Después de cada recompilación de la librería, actualiza el store de pnpm:

   ```bash
   pnpm update @poncegl/material-design-3
   ```

   > `pnpm install` solo no es suficiente después de una recompilación — los hardlinks en el virtual store apuntan a los inodos anteriores. `pnpm update` vuelve a copiar los archivos.

4. Para desconectar, elimina la entrada `file:` de `package.json` y el override de `pnpm-workspace.yaml`, luego ejecuta `pnpm install`.

---

### Next.js / Turbopack

Next.js 15+ usa Turbopack por defecto para los builds de producción. Turbopack no resuelve symlinks que apunten fuera de la raíz del proyecto, por lo que `pnpm link` (que usa el protocolo `link:`) fallará al compilar con `Module not found`.

**Solución:** usa el protocolo `file:` directamente en lugar de `pnpm link`.

1. Agrega la dependencia manualmente en `package.json`:

   ```diff
   + "@poncegl/material-design-3": "file:../ruta/a/packages/material-design-3",
   ```

2. Ejecuta `pnpm install`:

   ```bash
   pnpm install
   ```

3. Después de cada recompilación de la librería, actualiza el store de pnpm:

   ```bash
   pnpm update @poncegl/material-design-3
   ```

   > A diferencia de `link:`, el protocolo `file:` copia los archivos al virtual store de pnpm mediante hardlinks. Cuando la librería se recompila (nuevos inodos), debes ejecutar `pnpm update` para refrescar los hardlinks. Un `pnpm install` normal no es suficiente.

4. Para desconectar, elimina la entrada `file:` y el override de `pnpm-workspace.yaml`, luego ejecuta `pnpm install`.

---

## Referencia rápida

| Tarea                                             | Comando                                                                                     |
| ------------------------------------------------- | ------------------------------------------------------------------------------------------- |
| Compilar + verificar (recomendado)                | `pnpm build:local` (desde la raíz del monorepo)                                             |
| Solo compilar (rápido)                            | `pnpm build` (desde la raíz del monorepo)                                                   |
| Enlazar en proyecto externo (macOS/Linux)         | `pnpm link /ruta/absoluta` (desde la raíz del proyecto externo)                             |
| Enlazar en proyecto externo (Windows)             | `pnpm link C:\ruta\absoluta` — requiere Modo desarrollador o admin                          |
| Alternativa en Windows (sin symlinks)             | Usar protocolo `file:` en `package.json`, luego `pnpm install`                              |
| Verificar tipos                                   | `pnpm typecheck` (en el proyecto externo)                                                   |
| Recompilar + verificar después de cambios         | `pnpm build:local` — no requiere volver a enlazar                                           |
| Ver archivos que se publicarían                   | `pnpm pack:preview` (desde `packages/material-design-3`)                                    |
| Desconectar                                       | Elimina `link:` de `package.json` + override de `pnpm-workspace.yaml`, luego `pnpm install` |
| Recompilar después de cambios (Next.js / Windows) | `pnpm build:local` → `pnpm update @poncegl/material-design-3`                               |
