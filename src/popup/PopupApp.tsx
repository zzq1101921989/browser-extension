// src/popup/PopupApp.tsx
import React, { useState } from 'react';
import { ExportFormat, CrawlStatus, Selector, Config } from '../types/popup.types';
import './PopupApp.css';

const PopupApp: React.FC = () => {
  // 模拟状态数据
  const [selectors, setSelectors] = useState<Selector[]>([
    { id: '1', name: '选择器1', value: '.product-title' },
    { id: '2', name: '选择器2', value: '#price' },
    { id: '3', name: '选择器3', value: '.description' }
  ]);

  const [currentSelector, setCurrentSelector] = useState<string>('');
  const [status, setStatus] = useState<CrawlStatus>('idle');
  const [exportFormat, setExportFormat] = useState<ExportFormat>('json');
  const [config, setConfig] = useState<Config>({
    autoScroll: true,
    delay: 500
  });

  // 模拟数据
  const sampleData = [
    { text: "示例产品1", price: "$99.99", url: "/product/1" },
    { text: "示例产品2", price: "$129.99", url: "/product/2" }
  ];

  return (
    <div className="popup-container">
      <header className="popup-header">
        <h1>网页数据采集器</h1>
        <div className={`status-indicator ${status}`}>
          {{
            idle: '准备就绪',
            crawling: '采集中...',
            completed: '采集完成',
            error: '采集失败'
          }[status]}
        </div>
      </header>

      <section className="selector-section">
        <h2>目标选择器</h2>
        <div className="selector-input-group">
          <input
            type="text"
            value={currentSelector}
            onChange={(e) => setCurrentSelector(e.target.value)}
            placeholder="输入CSS选择器 (如: .product-name)"
          />
          <button
            className="save-btn"
            onClick={() => {
              if (currentSelector.trim()) {
                const newSelector = {
                  id: Date.now().toString(),
                  name: `选择器-${selectors.length + 1}`,
                  value: currentSelector
                };
                setSelectors([...selectors, newSelector]);
                setCurrentSelector('');
              }
            }}
          >
            保存选择器
          </button>
        </div>

        <div className="selector-list">
          {selectors.map(selector => (
            <div
              key={selector.id}
              className={`selector-item ${currentSelector === selector.value ? 'active' : ''}`}
              onClick={() => setCurrentSelector(selector.value)}
            >
              {selector.name}: {selector.value}
            </div>
          ))}
        </div>
      </section>

      <section className="config-section">
        <h2>采集配置</h2>
        <div className="config-item">
          <label>
            <input
              type="checkbox"
              checked={config.autoScroll}
              onChange={(e) => setConfig({ ...config, autoScroll: e.target.checked })}
            />
            自动滚动页面
          </label>
        </div>
        <div className="config-item">
          <label>
            采集延迟(ms):
            <input
              type="number"
              value={config.delay}
              onChange={(e) => setConfig({ ...config, delay: Number(e.target.value) || 0 })}
              min="0"
            />
          </label>
        </div>
      </section>

      <section className="action-section">
        <button
          className="crawl-button"
          onClick={() => setStatus('crawling')}
          disabled={!currentSelector || status === 'crawling'}
        >
          {status === 'crawling' ? '采集中...' : '开始采集'}
        </button>

        <div className="export-controls">
          <select
            value={exportFormat}
            onChange={(e) => setExportFormat(e.target.value as ExportFormat)}
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
          <button className="export-btn">导出数据</button>
          <span className="data-count">{sampleData.length} 条记录</span>
        </div>
      </section>

      <section className="preview-section">
        <h2>数据预览</h2>
        <div className="data-preview">
          <pre>{JSON.stringify(sampleData, null, 2)}</pre>
          {sampleData.length > 2 && <div>...还有 {sampleData.length - 2} 条记录</div>}
        </div>
      </section>
    </div>
  );
};

export default PopupApp;