import { FC } from "react"

const Operaction: FC = () => {
    return (
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
                    onChange={(e) => setExportFormat(e.target.value as AppContextType.ExportFormat)}
                >
                    <option value="json">JSON</option>
                    <option value="csv">CSV</option>
                </select>
                <button className="export-btn">导出数据</button>
                <span className="data-count">{sampleData.length} 条记录</span>
            </div>
        </section>
    )
}