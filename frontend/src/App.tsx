import React, { useState } from 'react';

export const App = () => {
  const [text, setText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const downloadPDF = async () => {
    setIsProcessing(true);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text }),
      });
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `frisk-v3-${Date.now()}.pdf`);
      document.body.appendChild(link);
      link.click();
    } catch (e) {
      alert("PDF作成に失敗しました");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container">
      <h1>frisk-V3 Generator</h1>
      <textarea 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="ここにプリントの内容を入力..."
      />
      <button onClick={downloadPDF} disabled={isProcessing}>
        {isProcessing ? "生成中..." : "PDFをダウンロード"}
      </button>
    </div>
  );
};
