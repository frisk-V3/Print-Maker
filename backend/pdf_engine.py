from playwright.async_api import async_playwright

async def generate_pdf_from_html(html_content: str):
    async with async_playwright() as p:
        # ブラウザを起動（ヘッドレスモード）
        browser = await p.chromium.launch()
        page = await browser.new_page()
        
        # HTMLを流し込む
        await page.set_content(html_content)
        
        # A4サイズ、背景色ありでPDF出力
        # 完璧なレイアウトのために余白を0に設定することも可能
        pdf_bytes = await page.pdf(
            format="A4",
            print_background=True,
            margin={"top": "10mm", "bottom": "10mm", "left": "10mm", "right": "10mm"}
        )
        
        await browser.close()
        return pdf_bytes
