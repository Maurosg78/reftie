// @ts-check
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  {
    ignores: ['dist/**', 'node_modules/**'],
  },
  {
    rules: {
      // Convención de este repo: una operación por línea, sin encadenar
      // optional-chaining/??/&& en una sola expresión compuesta. No hay
      // plugin automático para esto — se audita en revisión, ver
      // docs/adr/0001.
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
  {
    // scripts/ es CLI de uso manual (ver ADR-0004) — su salida ES el
    // producto, no un descuido de debugging.
    files: ['scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
    },
  },
);
