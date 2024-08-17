import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import globals from 'globals'

export default tseslint.config(
  // Globally ignore the lib folder, DO NOT put anything else in this object
  {
    ignores: ['lib']
  },
  // Load TS recommended config on but modify to ignore lib folder & js files
  ...tseslint.configs.recommended.map((d) => {
    d.ignores = ['./lib/**', '**/*.js?(x)']
    return d
  }),

  // Integrate node.js globals & types into js & ts files
  {
    files: ['**/*.js?(x)', '**/*.ts?(x)'],
    languageOptions: {
      globals: {
        ...globals.node
      }
    }
  },

  // Customize Specific TS eslint rules
  {
    files: ['**/*.ts?(x)'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-namespace': 'off'
    }
  },

  // Load JS recommended config on js files only
  {
    files: ['**/*.js?(x)'],
    ...eslint.configs.recommended
  }
)