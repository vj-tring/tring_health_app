# Source structure

- **assets** – Fonts, images, and static assets (e.g. `images/`, `fonts/`)
- **components** – Reusable UI components (each in its own folder with `index.tsx`)
- **constants** – App constants: colors, fonts, commonStyles, images, strings, flagMap
- **data** – Static JSON/data (e.g. `countryCodes.json`)
- **hooks** – Custom React hooks (e.g. `useNetworkStatus`, Redux hooks)
- **navigation** – Navigation containers, screen stacks, screen names, utils
- **screens** – Screen components (one folder per screen; styles in `styles.ts`)
- **services** – API client, AsyncStorage, NavigationService, DomainHealthCheck
- **store** – Redux store and feature slices (auth, assets)
- **types** – TypeScript declaration files (e.g. for SVG, vector icons)
- **utils** – Helpers, theme, validation, toast config
