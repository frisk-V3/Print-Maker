from fastapi import FastAPI, HTTPException
from fastapi.responses import Response
from pydantic import BaseModel
from .pdf_engine import generate_pdf_from_html
from jinja2 import Environment, FileSystemLoader
import os

app = FastAPI()

# データの型定義（TypeScript側と合わせる）
class PrintData(BaseModel):
    title: str
    content: str
    author: str

# Jinja2の設定（HTMLテンプレートを読み込む）
env = Environment(loader=FileSystemLoader("backend/templates"))

@app.post("/generate-pdf")
async def generate_print(data: PrintData):
    try:
        # 1. テンプレートにデータを流し込む
        template = env.get_template("print_layout.html")
        html_content = template.render(
            title=data.title,
            content=data.content,
            author=data.author
        )

        # 2. PlaywrightでPDFに変換
        pdf_bytes = await generate_pdf_from_html(html_content)

        # 3. PDFとしてレスポンスを返す
        return Response(
            content=pdf_bytes,
            media_type="application/pdf",
            headers={"Content-Disposition": "attachment; filename=print.pdf"}
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
