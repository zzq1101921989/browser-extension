const Header = () => {
    return (
        <header className="popup-header">
            <h1>网页数据采集器</h1>
            <div className={`status-indicator ${status}`}>
                {{
                    idle: '准备就绪',
                    crawling: '采集中...',
                    completed: '采集完成',
                    error: '采集失败'
                }['idle']}
            </div>
        </header>
    )
}

export default Header;