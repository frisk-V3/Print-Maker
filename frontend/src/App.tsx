import React, { useState } from 'react';
import { PrintData } from './types';

export default function App() {
  const [data, setData] = useState<PrintData>({
    title: '',
    content: '',
    author: '',
    date: new Date().toLocaleDateString()
  });
  const [loading, setLoading] = useState(false);

  const generatePDF = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:8000/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error('生成失敗');
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${data.title || 'frisk-v3'}.pdf`;
      a.click();
    } catch (e) {
      alert('エラーが発生しました');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      <h1>frisk-V3 Generator</h1>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input placeholder="タイトル" onChange={e => setData({...data, title: e.target.value})} style={{padding: '10px'}} />
        <textarea placeholder="本文" onChange={e => setData({...data, content: e.target.value})} style={{padding: '10px', height: '200px'}} />
        <input placeholder="作成者" onChange={e => setData({...data, author: e.target.value})} style={{padding: '10px'}} />
        <button onClick={generatePDF} disabled={loading} style={{padding: '15px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer'}}>
          {loading ? 'PDF作成中...' : 'PDFをダウンロード'}
        </button>
      </div>
    </div>
  );
}
