import * as fs from 'node:fs';
import {chromium} from 'playwright-chromium';

const outputDirectory = 'build/pdf';
fs.rmSync(outputDirectory, {recursive: true, force: true});
fs.mkdirSync(outputDirectory, {recursive: true});


(async () => {
  // Read the file and print its contents.
  const dataFilePath = 'data/urls.txt';
  console.info('Getting URLs from', dataFilePath);
  const data = fs.readFileSync(dataFilePath, 'utf8');
  const urls = data.toString().split('\n').filter(Boolean)

  // const urls = [
  //   'https://playwright.dev/docs/api/class-page#page-pdf',
  //   'https://github.com/tbouffard/html-to-pdf-extractor',
  // ]
  console.info(`Found ${urls.length} URLs`);

  const browser = await chromium.launch({headless: false});
  const page = await browser.newPage();

  for (let counter = 0; counter < urls.length; counter++) {
    const url = urls[counter];

    console.info('Processing', url);
    const fileName = `code-${counter}`;

    await page.goto(`${url}`); // and wait for the load event

    console.info('Page loaded');

    // Generates a PDF with 'screen' media type.
    // https://playwright.dev/docs/api/class-page#page-pdf
    await page.emulateMedia({media: 'screen'});
    await page.pdf({path: `${outputDirectory}/${fileName}.pdf`, height: '42cm', width: '29.7cm'});
    // await page.pdf({path: `${outputDirectory}/${fileName}.pdf`, format: 'A4'});

    console.info(`PDF generated for ${fileName}`);
  }

  await browser.close();
  process.exit(0);
})();
