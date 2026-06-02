---
name: jira-reference
description: Jira project RCL structure — epic and task key map for @poncegl/material-design-3
metadata:
  type: reference
---

Jira project: **React Component Library** (`RCL`) at `poncegl.atlassian.net`
Cloud ID: `09db5ce8-1ad5-430b-8e13-91aefdad7b36`

Note: Confluence is NOT available on this account (free Jira only).

## Epics

| Key | Epic |
|---|---|
| RCL-1 | Infraestructura del Monorepo |
| RCL-2 | Entorno de Desarrollo Local |
| RCL-3 | Storybook |
| RCL-4 | GitHub & CI/CD |
| RCL-5 | NPM & Releases |
| RCL-6 | Sistema de Diseño Base (Tokens & Theming) |
| RCL-7 | Landing Page & Documentación |
| RCL-8 | Componentes |

## Tasks by Epic

**RCL-1 (Infraestructura)**
- RCL-9: Migrar estructura a monorepo formal
- RCL-10: Configurar Prettier
- RCL-11: Configurar Vitest + RTL + axe-core
- RCL-12: Configurar Husky + lint-staged
- RCL-13: Configurar Commitlint + Conventional Commits
- RCL-14: Configurar Changesets
- RCL-15: Script preinstall para forzar pnpm

**RCL-2 (Entorno Local)**
- RCL-16: Migrar app de ejemplo a apps/example/
- RCL-17: Documentar flujo pnpm link
- RCL-18: Verificar compatibilidad Next.js, Vite, Astro

**RCL-3 (Storybook)**
- RCL-19: Instalar Storybook 8
- RCL-20: Instalar addons (a11y, docs, interactions)
- RCL-21: Conectar tokens CSS con Storybook
- RCL-22: Stories base del Button como template

**RCL-4 (GitHub & CI/CD)**
- RCL-23: Pipeline CI
- RCL-24: Pipeline release (Changesets)
- RCL-25: Pipeline deploy Storybook → GitHub Pages
- RCL-26: Branch protection en main
- RCL-27: Templates de PR e Issue

**RCL-5 (NPM & Releases)**
- RCL-28: Verificar scope @poncegl en npm
- RCL-29: Preparar package.json para publicación
- RCL-30: Automation token en GitHub Secrets
- RCL-31: Primera publicación (prerequisito: Button completo)

**RCL-6 (Sistema de Diseño)**
- RCL-32: Tokens color light scheme
- RCL-33: Tokens color dark scheme
- RCL-34: Tokens shape, elevation y tipografía
- RCL-35: Mapear tokens a Tailwind v4 @theme
- RCL-36: Implementar createMD3Theme
- RCL-37: Implementar MD3Provider
- RCL-38: Verificación integración theming end-to-end

**RCL-7 (Landing Page)**
- RCL-39: Definir stack y crear apps/docs/
- RCL-40: Sección hero e instalación
- RCL-41: Sección de theming
- RCL-42: Showcase interactivo de componentes
- RCL-43: Deploy automático

**RCL-8 (Componentes)**
- RCL-44: Establecer proceso de trabajo para componentes
- RCL-45: Button — tipos TypeScript y revisión spec M3
- RCL-46: Button — implementar variantes y estados
- RCL-47: Button — tests unitarios
- RCL-48: Button — stories de Storybook
- RCL-49: Button — documentación
