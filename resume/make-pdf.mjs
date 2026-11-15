// Renders resume/resume.html to public/resume.pdf (one US Letter page).
// Usage:  npx -y playwright@1 install chromium   (first time only)
//         node resume/make-pdf.mjs
import { chromium } from "playwright";
import { fileURLToPath, pathToFileURL } from "url";
import path from "path";

const here = path.dirname(fileURLToPath(import.meta.url));
const src = pathToFileURL(path.join(here, "resume.html")).href;
const out = path.join(here, "..", "public", "resume.pdf");

const browser = await chromium.launch(
  process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {},
);
const page = await browser.newPage();
await page.goto(src, { waitUntil: "networkidle" });
await page.evaluate(() => document.fonts.ready);

// Fail loudly if the content no longer fits on one page.
const overflow = await page.evaluate(() => document.body.scrollHeight - 11 * 96);
if (overflow > 0) {
  console.error(`Resume is ${overflow}px taller than one Letter page. Trim content before publishing.`);
  process.exitCode = 1;
}

await page.pdf({ path: out, format: "Letter", printBackground: true, preferCSSPageSize: true });
await browser.close();
console.log("Wrote", out);
