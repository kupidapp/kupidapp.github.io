import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = process.cwd();
const clientDir = resolve(root, "dist/client");
const pagesDir = resolve(root, "dist/pages");
const serverEntry = resolve(root, "dist/server/server.js");
const siteUrl = "https://kupidapp.github.io/";

await rm(pagesDir, { recursive: true, force: true });
await mkdir(pagesDir, { recursive: true });
await cp(clientDir, pagesDir, { recursive: true });

const server = await import(serverEntry);
const response = await server.default.fetch(new Request(siteUrl), {}, {});

if (!response.ok) {
  throw new Error(`Prerender failed with status ${response.status}`);
}

const html = await response.text();

await writeFile(resolve(pagesDir, "index.html"), html);
await writeFile(resolve(pagesDir, "404.html"), html);
await writeFile(resolve(pagesDir, ".nojekyll"), "");
