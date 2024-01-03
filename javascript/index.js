import * as fs from 'node:fs';
import {chromium} from 'playwright-chromium';

const outputDirectory = 'build/pdf';
fs.rmSync(outputDirectory, {recursive: true, force: true});
fs.mkdirSync(outputDirectory, {recursive: true});


(async () => {
  const urls = [
    'https://playwright.dev/docs/api/class-page#page-pdf',
    'https://github.com/tbouffard/html-to-pdf-extractor',
  ]

  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();

  for (let counter = 0; counter < urls.length; counter++) {
    const url = urls[counter];

    console.info('Processing URL', url);
    const fileName = `code-${counter}`;

    await page.goto(`${url}`); // and wait for the load event

    console.info('Page loaded');

    // Generates a PDF with 'screen' media type.
    // https://playwright.dev/docs/api/class-page#page-pdf
    await page.emulateMedia({media: 'screen'});
    await page.pdf({path: `${outputDirectory}/${fileName}.pdf`, format: 'A4'});

    console.info(`PDF generated for ${fileName}`);
  }

  await browser.close();
  process.exit(0);
})();
