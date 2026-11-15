# Resume

`resume.html` is the source of the one-page resume. `make-pdf.mjs` renders it to
`public/resume.pdf`, which the portfolio's Resume buttons download.

To update it:

1. Edit `resume.html`. Keep it in step with `src/data/portfolio.ts`.
2. Regenerate the PDF (Playwright is not a project dependency, so install it once):

   ```bash
   npm i --no-save playwright && npx playwright install chromium
   node resume/make-pdf.mjs
   ```

The script exits with an error if the content no longer fits on one US Letter page.
