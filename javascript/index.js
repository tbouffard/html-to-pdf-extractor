import * as fs from 'node:fs';
import {chromium} from 'playwright-chromium';
import PDFMerger from 'pdf-merger-js';

// options
const createMergePdfs = true;
const resumeFromMergePdfs = false;
const dataFilePath = 'data/urls.txt';
const pdfFormat = 'A3';
const browserHeadless = true;

const baseOutputDirectory = 'build/pdf';
const urlsOutputDirectory = `${baseOutputDirectory}/urls`;

async function saveContentsAsPdf() {
  // Clean output directory
  // TODO use await and async functions
  fs.rmSync(baseOutputDirectory, {recursive: true, force: true});
  fs.mkdirSync(urlsOutputDirectory, {recursive: true});

  // Read the file and print its contents.
  console.info('Getting URLs from', dataFilePath);
  // TODO use await and async functions
  const data = fs.readFileSync(dataFilePath, 'utf8');
  const urls = data.toString().split('\n').filter(Boolean)

  // const urls = [
  //   'https://playwright.dev/docs/api/class-page#page-pdf',
  //   'https://github.com/tbouffard/html-to-pdf-extractor',
  // ]
  console.info(`Found ${urls.length} URLs`);

  const browser = await chromium.launch({headless: browserHeadless});
  const page = await browser.newPage();

  for (let counter = 0; counter < urls.length; counter++) {
    const url = urls[counter];

    console.info('Processing', url);
    const fileName = `file-${counter}`;

    await page.goto(`${url}`); // and wait for the load event

    console.info('Page loaded');

    // Generates a PDF with 'screen' media type.
    // https://playwright.dev/docs/api/class-page#page-pdf
    await page.emulateMedia({media: 'screen'});
    await page.pdf({path: `${urlsOutputDirectory}/${fileName}.pdf`, format: pdfFormat});

    console.info(`PDF generated for ${fileName}`);
  }

  console.info('Closing browser');
  await browser.close();
  console.info('Browser closed');
}

const mergePdfs = async () => {
  console.info('Generating a merged PDF file');

  // Read all files in the folder
  // TODO use await and async functions
  const files = fs.readdirSync(urlsOutputDirectory);
  console.info(`Merging ${files.length} files`)

  const merger = new PDFMerger();
  for (const fileName of files) {
    await merger.add(`${urlsOutputDirectory}/${fileName}`);
  }

  // Set metadata
  await merger.setMetadata({
    producer: "html-to-pdf-extractor JavaScript",
    creator: "html-to-pdf-extractor JavaScript (https://github.com/tbouffard/html-to-pdf-extractor)",
  });

  await merger.save(`${baseOutputDirectory}/00-merged.pdf`);
  console.info('Merged PDF file generated');
};

(async () => {
  if (!resumeFromMergePdfs) {
    await saveContentsAsPdf();
  }

  if (createMergePdfs) {
    await mergePdfs();
  }

  process.exit(0);
})();
