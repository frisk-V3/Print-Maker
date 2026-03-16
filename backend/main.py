import os
import sys
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from jinja2 import Environment, FileSystemLoader

# --- 重要：EXE化した時のパス問題を解決する魔法のコード ---
def get_base_path():
    if hasattr(sys, '_MEIPASS'):
        return sys._MEIPASS
    return os.path.dirname(os.path.abspath(__file__))

base_path = get_base_path()

# 相対インポート(from .generator)を「絶対インポート」に変える
import generator  # 同じフォルダにある場合はこれだけでOK

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

class PrintRequest(BaseModel):
    title: str
    content: str
    author: str
    date: str

# テンプレートのパスもEXE用に修正
template_env = Environment(loader=FileSystemLoader(os.path.join(base_path, "templates")))

@app.post("/api/generate")
async def generate(data: PrintRequest):
    template = template_env.get_template("base.html")
    html = template.render(data.model_dump())
    pdf_bytes = await generator.export_pdf(html) # ここで呼び出す
    return Response(content=pdf_bytes, media_type="application/pdf")
