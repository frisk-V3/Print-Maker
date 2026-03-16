from playwright.async_api import async_playwright
import os

async def export_pdf(html_content: str):
    async with async_playwright() as p:
        # 初心者環境でも動くよう、ブラウザをヘッドレスで起動
        browser = await p.chromium.launch(args=["--no-sandbox"])
        page = await browser.new_page()
        
        # HTMLを流し込み、ネットワークが安定するまで待機
        await page.set_content(html_content, wait_until="networkidle")
        
        # A4サイズ・余白ゼロ・背景印刷ON
        pdf_bytes = await page.pdf(
            format="A4",
            print_background=True,
            margin={"top": "0", "right": "0", "bottom": "0", "left": "0"}
        )
        await browser.close()
        return pdf_bytes
