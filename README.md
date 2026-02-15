# Dynamic Form Builder

A dynamic form builder application built with React, TypeScript,
and Material-UI. This project allows users to create, edit, and render dynamic forms with validation and auto-save functionality.

---

## **Features**

- Create and edit dynamic forms with a schema-based approach.
- Auto-save functionality for form schemas and values.
- Validation rules for form fields.
- Built with React, TypeScript, Monaco Editor, and Material-UI.
- Unit tests using Vitest.

---

## **Project Structure**

The project is organized into a feature-based folder structure:

```bash
src/
├── App.tsx                 # Main application entry point
├── components/             # Reusable UI components
│   ├── form-renderer/      # Dynamic form renderer + utilities
│   ├── schema-editor/      # Schema editing UI - Monaco Editor integration
│   ├── schema-selector/    # Schema selection dropdown
│   ├── json-modal/         # Modal for displaying JSON output
│   └── view-switcher/      # Grid/row layout switcher
├── constants/              # Application-wide constants
├── data/                   # Example schemas, mock API data
├── services/               # Auto-save and shared service logic
├── test/                   # Test setup and utilities
├── types/                  # TypeScript type definitions
└── main.tsx                # React entry point
```

---

## **Getting Started**

### **Prerequisites**

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### **Installation**

1. Clone the repository:

    ```bash
    git clone https://github.com/AtanasovCodes/react-json-form-generator
    cd react-json-form-generator
    ```

2. Install dependencies:

    ```bash
    npm install
    # or
    yarn install
    ```

3. Start the development server:

    ```bash
    npm run dev
    # or
    yarn dev
    ```

4. Open your browser and navigate to `http://localhost:3000` to see the application in action.

### Example JSON Schema for Dynamic Form Builder

- [Basic Form Example](src/data/examples/basic-form.json)
- [Nested Group Example](src/data/examples/nested-group.json)
- [Dynamic Visibility Example](src/data/examples/dynamic-visibility.json)
- [Validation Example](src/data/examples/validation.json)
- [Auto-Fill Example](src/data/examples/auto-fill.json)
