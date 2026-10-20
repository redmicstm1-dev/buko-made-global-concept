import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Prevents unescaped quotes like contractions from dropping warnings
      "react/no-unescaped-entities": "off",
      // Safely permits standard document custom symbols without stopping pipelines
      "@next/next/no-html-link-for-pages": "warn"
    }
  }
];

export default eslintConfig;
