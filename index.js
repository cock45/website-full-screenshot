const pw = require("playwright");

(async () => {
    const browser = await pw.chromium.launch({ headless: false }); // or 'chromium', 'firefox'
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://devdemo.nicepage.io/");
    await scrollFullPage(page);

    await page.screenshot({
        path: "example.png",
        fullPage: true,
    });

    await browser.close();
})();

async function scrollFullPage(page) {
    await page.evaluate(async () => {
        await new Promise((resolve) => {
            let totalHeight = 0;
            const distance = 100;
            const timer = setInterval(() => {
                const scrollHeight = document.body.scrollHeight;
                window.scrollBy(0, distance);
                totalHeight += distance;

                if (totalHeight >= scrollHeight) {
                    clearInterval(timer);
                    resolve();
                }
            }, 100);
        });
    });
}
