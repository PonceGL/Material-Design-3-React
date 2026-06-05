# Material Design 3 React

React component library inspired by Material Design 3 and Jetpack Compose.

## Editor setup

This project includes recommended VS Code extensions. They work with **VS Code, Cursor, and Windsurf**.

### Recommended extensions

| Extension                                                                                                  | Purpose                                                   |
| ---------------------------------------------------------------------------------------------------------- | --------------------------------------------------------- |
| [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)                     | Formats files on save using the project's Prettier config |
| [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)                       | Shows lint errors inline as you type                      |
| [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) | Autocomplete and hover previews for Tailwind classes      |

### How to install them

The first time you open the project the editor may show a popup asking you to install the recommended extensions. If that prompt didn't appear or you dismissed it, you can open the list manually:

1. Open the command palette: `Cmd + Shift + P` on Mac · `Ctrl + Shift + P` on Windows
2. Type `Show Recommended Extensions` and select it
3. Click **Install** on each extension in the list that appears

> **Note:** The Prettier extension is required for format-on-save to work. The project's `.vscode/settings.json` already enables format-on-save and sets Prettier as the default formatter — no manual editor configuration needed.

## Scripts

- `npm run dev`: run the example app.
- `npm run build`: build the library for npm.
- `npm run typecheck`: validate TypeScript.

## Usage

```tsx
import { Button } from '@poncegl/material-design-3';
import '@poncegl/material-design-3/styles.css';

export function App() {
  return <Button>Continue</Button>;
}
```
