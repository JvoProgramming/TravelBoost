# TravelBoost Web Application

A modern web application for travel planning, built with React, TypeScript, and Vite.

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository
```bash
git clone https://github.com/your-org/travelboost.git
cd client/webapp
```

2. Install dependencies
```bash
npm install
# or
yarn
```

### Development
Run the development server:
```bash
npm run dev
# or
yarn dev
```
The app will be available at `http://localhost:5173`

### Building for Production
```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory.

### Linting
```bash
npm run lint
# or
yarn lint
```

## Project Structure
- `src/components/` - Reusable UI components
- `src/pages/` - Page components
- `src/assets/` - Static assets
- `src/App.tsx` - Root component
- `src/App.css` - Global styles

## Features
- Modern, responsive design
- Smooth animations and transitions
- Form handling with validation
- Device detection
- API integration ready

## Development Notes
- Built with Vite + React + TypeScript
- Uses CSS modules for styling
- Follows modern React patterns
- Emphasizes clean, maintainable code

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    'react-x': reactX,
    'react-dom': reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs['recommended-typescript'].rules,
    ...reactDom.configs.recommended.rules,
  },
})
```
