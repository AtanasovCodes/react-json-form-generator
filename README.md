# Dynamic Form Builder

A dynamic form builder application built with React, TypeScript,
and Material-UI. This project allows users to create, edit, and render dynamic forms with validation and auto-save functionality.

## [Live Preview](https://poetic-bavarois-8dfaa4.netlify.app)

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

### **Building your JSON Schema**

The Dynamic Form Builder uses a JSON schema to define the structure, fields, and behavior of the forms. Below are the rules and guidelines for creating a valid JSON schema for the form builder:

---

### 1. Root Schema Structure

The root of the schema must be an object with the following required properties:

- **id**: A unique identifier for the form (string).
- **type**: The type of the root object. Must always be `"group"`.
- **version**: The version of the schema, following semantic versioning (e.g., `1.0.0`).
- **children**:
    - An array of child fields or groups.
    - If the type is `"group"`, the `children` property is required.

---

### 2. Field Types

Each field in the `children` array must have the following properties:

- **id**: A unique identifier for the field (string).
- **type**: The type of the field. Supported types are:
    - `"text"`: A single-line text input.
    - `"textarea"`: A multi-line text input.
    - `"dropdown"`: A dropdown menu with predefined options.
    - `"checkbox"`: A checkbox input.
    - `"radio"`: A group of radio buttons.
    - `"group"`: A nested group of fields.

---

### 3. Optional Properties

Fields can have the following optional properties:

- **label**: A string that represents the label of the field.
- **visibilityCondition**: An object that defines when the field should be visible. It has the following properties:
    - **field**: The ID of the field to evaluate.
    - **operator**: The condition to evaluate. Supported operators are:
        - `"equals"`
        - `"notEquals"`
        - `"greaterThan"`
        - `"lessThan"`
    - **value**: The value to compare against.

---

### 4. Validation Rules

Fields can have validation rules to enforce specific constraints.  
The `validationRules` property is an array of objects, where each object defines a validation rule.

Each rule has the following properties:

- **type**: The type of validation. Supported types are:
    - `"required"`: The field must not be empty.
    - `"pattern"`: The field value must match a specific regular expression.
    - `"minLength"`: The field value must have a minimum length.
    - `"maxLength"`: The field value must have a maximum length.
- **value**: The value associated with the validation (e.g., the minimum length or the regex pattern).
- **message**: A custom error message to display when the validation fails.
- **dependsOn** (optional): An object that specifies a dependency on another field. It has the following properties:
    - **fieldId**: The ID of the field the validation depends on.
    - **value**: The value of the dependent field that triggers the validation.

---

### 5. Auto-Fill

The `autoFill` property allows you to define fields that will be automatically populated based on an API response.

The `autoFill` object has the following properties:

- **api**: The name or endpoint of the API to fetch data from.
- **inputFields**: An array of field IDs that will be sent as input to the API.
- **targetFields**: An array of field IDs that will be populated with the API response.

---

### 6. Nested Groups

You can create nested groups by adding a field with the type set to `"group"`.  
Groups can contain their own `children` array, which can include other fields or groups.


---

### Example JSON Schema for Dynamic Form Builder

- [Basic Form Example](src/data/examples/basic-form.json)
- [Nested Group Example](src/data/examples/nested-group.json)
- [Dynamic Visibility Example](src/data/examples/dynamic-visibility.json)
- [Validation Example](src/data/examples/validation.json)
- [Auto-Fill Example](src/data/examples/auto-fill.json)

---

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

