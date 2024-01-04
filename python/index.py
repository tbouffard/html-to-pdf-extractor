from playwright.sync_api import sync_playwright, Playwright


# with sync_playwright() as p:
#     browser = p.chromium.launch(headless=False)
#     page = browser.new_page()
#     page.goto("https://github.com/tbouffard/html-to-pdf-extractor")
#     print(page.title())
#     print('Closing browser')
#     browser.close()
#     print('Browser closed')


# Get all new pages (including popups) in the context
def handle_page(page):
    page.wait_for_load_state()
    print(page.title())


# https://playwright.dev/docs/api/class-page#page-pdf
# https://github.com/tbouffard/html-to-pdf-extractor


def run(p: Playwright):
    browser = p.chromium.launch(headless=False)
    page = browser.new_page()
    page.goto("https://github.com/tbouffard/html-to-pdf-extractor")
    print(page.title())
    print('Closing browser')
    browser.close()
    print('Browser closed')


with sync_playwright() as playwright:
    run(playwright)
