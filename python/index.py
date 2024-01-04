from playwright.sync_api import sync_playwright

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page()
    page.goto("https://github.com/tbouffard/html-to-pdf-extractor")
    print(page.title())
    browser.close()
