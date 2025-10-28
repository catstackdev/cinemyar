import fs from "fs";
import path from "path";
import dotenv from "dotenv";

const successColor = "\x1b[32m%s\x1b[0m";
const errorColor = "\x1b[31m%s\x1b[0m";
const checkSign = "\u{2705}";

// Load .env file
dotenv.config({ path: ".env" });

// Generate content based on environment
const makeEnvFileContent = (env: "dev" | "prod" | "default"): string => {
  const apiUrl =
    env === "prod"
      ? process.env.VITE_API_URL_PROD
      : env === "dev"
        ? process.env.VITE_API_URL_DEV
        : process.env.VITE_API_URL;

  // const geoUrl =
  //   env === "prod"
  //     ? process.env.GEO_URL_PROD
  //     : env === "dev"
  //       ? process.env.GEO_URL_DEV
  //       : process.env.GEO_URL;

  return `// Auto-generated file. Do not edit manually.
export const environment = {
  production: ${env === "prod"},
  apiUrl: '${apiUrl || "http://localhost:3000"}',

} as const;
`;
};

const files = [
  { name: "environment.ts", env: "default" as const },
  { name: "environment.dev.ts", env: "dev" as const },
  { name: "environment.prod.ts", env: "prod" as const },
];

const folderPath = path.join(process.cwd(), "src/environments");

// Create directory
fs.mkdirSync(folderPath, { recursive: true });

// Generate files
files.forEach(({ name, env }) => {
  const targetPath = path.join(folderPath, name);

  try {
    fs.writeFileSync(targetPath, makeEnvFileContent(env));
    console.log(successColor, `${checkSign} Generated ${name}`);
  } catch (err) {
    console.error(errorColor, `Failed to generate ${name}:`, err);
  }
});

console.log(successColor, `\n${checkSign} All environment files generated!`);
