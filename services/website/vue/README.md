# Website Service

This is the main website service for Qroog, serving as the landing page at `qroog.local`.

## Features

- **Landing Page**: Modern, responsive landing page with hero section and features
- **Internationalization**: Support for English and Russian languages
- **Shared Components**: Uses components from the `@libs/vue-ui` library
- **Routing**: Vue Router for navigation between pages
- **State Management**: Pinia for state management

## Tech Stack

- **Vue 3**: Composition API with TypeScript
- **Vite**: Build tool and development server
- **Vue Router**: Client-side routing
- **Pinia**: State management
- **Vue I18n**: Internationalization
- **Tailwind CSS**: Styling (via `@libs/styles`)

## Development

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview production build
pnpm preview
```

## Structure

```
src/
├── components/          # Service-specific components
│   └── WebsiteHeader.vue
├── logic/              # Business logic
│   └── i18n.ts         # Internationalization setup
├── router/             # Vue Router configuration
│   └── index.ts
├── views/              # Page components
│   ├── HomeView.vue    # Landing page
│   └── AboutView.vue   # About page
├── App.vue             # Root component
└── main.ts             # Application entry point
```

## Integration

- **Auth Service**: Links to `http://auth.qroog.local:5174` for authentication
- **Shared Libraries**: Uses `@libs/vue-ui` and `@libs/shared-types`
- **Styling**: Imports global styles from `@libs/styles`

## Environment

The service runs on port 5180 by default and is accessible at `http://qroog.local:5180`.
