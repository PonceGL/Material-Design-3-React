# Convención de Mensajes de Commit (Conventional Commits)

Este proyecto sigue la especificación de **Conventional Commits**. Esto nos permite mantener un historial de cambios legible, estructurado y automatizar la generación de changelogs usando herramientas como Changesets.

## Estructura del Mensaje

El mensaje de commit debe tener la siguiente estructura básica:

```text
<tipo>(<alcance opcional>): <descripción breve en minúsculas>

[cuerpo opcional]

[pie de página opcional]
```

> [!IMPORTANT]
>
> - El tipo y la descripción corta son obligatorios.
> - Usa verbos en imperativo/infinitivo y en inglés para la descripción (ej: `add`, `fix`, `update`).
> - La descripción no debe terminar con un punto `.`.

---

## Tipos Permitidos

| Tipo           | Descripción                                                                            | Ejemplo                                               |
| :------------- | :------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| **`feat`**     | Una nueva característica para el usuario final.                                        | `feat(button): add support for outline variant`       |
| **`fix`**      | Solución a un error o bug.                                                             | `fix(input): correct placeholder alignment on Safari` |
| **`docs`**     | Cambios únicamente en la documentación.                                                | `docs: update release and contribution guide`         |
| **`chore`**    | Cambios en el proceso de construcción, herramientas de desarrollo o dependencias.      | `chore: update eslint configs`                        |
| **`refactor`** | Cambios en el código que no corrigen un error ni añaden una característica.            | `refactor(utils): simplify color palette generation`  |
| **`test`**     | Añadir pruebas faltantes o corregir pruebas existentes.                                | `test(button): add accessibility and click tests`     |
| **`style`**    | Cambios que no afectan el significado del código (espacios en blanco, formateo, etc.). | `style: run prettier format check`                    |
| **`perf`**     | Cambios en el código que mejoran el rendimiento.                                       | `perf(theme): optimize CSS variable parsing speed`    |

---

## Ejemplos de Mensajes Válidos

- `feat: add Button component`
- `fix: correct hover state color`
- `chore: update dependencies`
- `feat(button): add primary and secondary variants`
- `docs: document commit linting convention`

## Ejemplos de Mensajes Inválidos (Serán bloqueados)

- `arregle algo` (Falta el tipo y delimitador `: `)
- `fix: Correct hover state` (La descripción empieza con mayúscula)
- `feat: add button.` (La descripción termina con punto)
- `refactor: simplified parser` (No usa infinitivo/imperativo)
