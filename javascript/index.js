import * as fs from 'node:fs';
import {chromium} from 'playwright-chromium';

const outputDirectory = 'build/pdf';
fs.rmSync(outputDirectory, {recursive: true, force: true});
fs.mkdirSync(outputDirectory, {recursive: true});


const urls = [
  'https://playwright.dev/docs/api/class-page#page-pdf'
]


(async () => {
  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();

  for (const url of urls) {
    console.info('Processing URL', url);
    const fileName = "url1";

    await page.goto(`${url}`); // and wait for the load event

    console.info('Page loaded');

    // Generates a PDF with 'screen' media type.
    // https://playwright.dev/docs/api/class-page#page-pdf
    await page.emulateMedia({media: 'screen'});
    await page.pdf({path: `${outputDirectory}/${fileName}.pdf`});

    console.info(`PDF generated for ${fileName}`);
  }

  await browser.close();
  process.exit(0);
})();
