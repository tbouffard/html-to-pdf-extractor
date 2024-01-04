# html-to-pdf-extractor - JavaScript implementation

A JavaScript implementation that uses [Playwright](https://playwright.dev) and Chromium to extract HTML as PDF files.

## Install

- NodeJS: [nvm](https://github.com/nvm-sh/nvm) users can run `nvm use`
- install dependencies: run `npm install`

## Run

- Create a `data/urls.txt` file. To test, you can use the following content
```text
https://playwright.dev/docs/api/class-page#page-pdf
https://github.com/tbouffard/html-to-pdf-extractor
```
- Put URLs in the file (one URL per line)
- Run `npm start`
- The pdf files are generated in the `build/pdf` directory
