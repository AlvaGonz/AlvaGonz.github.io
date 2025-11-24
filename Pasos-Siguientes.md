# 👣 Pasos Siguientes Recomendados

Sigue este orden de prioridad para mejorar la salud de tu proyecto:

## 🔴 Prioridad Alta (Inmediato)

1.  **Corregir Vulnerabilidades:**
    ```bash
    pnpm audit fix
    ```
    *Si `pnpm audit fix` no está disponible o no resuelve todo, actualiza las dependencias manualmente en `package.json`.*

2.  **Configurar Linting & Formatting:**
    Instalar dependencias de desarrollo:
    ```bash
    pnpm add -D eslint prettier eslint-plugin-react eslint-plugin-react-hooks @typescript-eslint/eslint-plugin @typescript-eslint/parser eslint-config-prettier eslint-plugin-prettier
    ```
    Crear `.eslintrc.json` y `.prettierrc` con reglas estándar.

## 🟡 Prioridad Media (Esta semana)

3.  **Refactorizar Duolingo Service:**
    *   Crear un hook `useDuolingoStats` en `src/hooks/useDuolingoStats.ts`.
    *   Mover la lógica de fetch de `DuolingoFireWidget.tsx` a este hook.
    *   Reutilizar este hook tanto en el widget como en cualquier otro componente que necesite stats.
    *   Eliminar el uso de `any` definiendo interfaces correctas.

4.  **Limpieza de Tipos:**
    *   Revisar `src/services/duolingo.ts` y eliminar `any`.
    *   Asegurar que todos los componentes tengan props tipadas (ya está mayormente hecho, pero revisar nuevos componentes).

## 🟢 Prioridad Baja (Mejora Continua)

5.  **Documentación:**
    *   Crear `ARCHITECTURE.md` con un diagrama simple del flujo de datos (especialmente el switch entre vistas Formal/Curiosity).

6.  **Optimización:**
    *   Revisar el bundle size con `npm run build` y analizar si se necesita más code splitting.
