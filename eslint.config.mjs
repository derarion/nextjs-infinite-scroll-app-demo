import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: [".next/**", "node_modules/**", "out/**", ".turbo/**", "dist/**", "build/**"],
  },
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  ...compat.extends("plugin:prettier/recommended"),
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      // Next.js auto-generated files use triple-slash references
      "@typescript-eslint/triple-slash-reference": "off",
    },
  },
];

export default config;
