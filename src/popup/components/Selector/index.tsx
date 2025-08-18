import { AppContext } from "../../../popup/context";
import { useState, FC, useContext } from "react";
import './index.css';

const Selector: FC = () => {
    const context = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('tab1');
    const [activeSubTab, setActiveSubTab] = useState('sub-tab1');

    const handleTabClick = (tabId: string) => {
        setActiveTab(tabId);
        // 切换到tab1时默认激活第一个子tab
        if (tabId === 'tab1') {
            setActiveSubTab('sub-tab1');
        }
    };

    /**
     * 发送内容命令
     * @description 该函数用于向当前激活的标签页发送命令，
     * @param status 
     */
    const sendContentCommand = async (status: App.MessageStatus) => {
        // 1. 获取当前激活的页面
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab.id) {
            switch (status) {
                // 打开智能识别窗口
                case 'Intelligent': {
                    await chrome.tabs.sendMessage(tab.id, {
                        action: 'Intelligent'
                    });
                    break;
                }
                case 'CreateRule': {
                    await chrome.tabs.sendMessage(tab.id, {
                        action: 'CreateRule'
                    });
                    break;
                }
                default:
                    break;
            }
        }
        window.close(); // 关闭当前窗口
    }

    return (
        <section className="selector-section">
            <div className="tab-container">
                <div className="tab-nav">
                    <button
                        className={`tab-btn ${activeTab === 'tab1' ? 'active' : ''}`}
                        onClick={() => handleTabClick('tab1')}
                    >
                        <span className="tab-icon">🏠</span>
                        <span className="tab-text">开始使用</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tab2' ? 'active' : ''}`}
                        onClick={() => handleTabClick('tab2')}
                    >
                        <span className="tab-icon">📦</span>
                        <span className="tab-text">我的规则</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tab3' ? 'active' : ''}`}
                        onClick={() => handleTabClick('tab3')}
                    >
                        <span className="tab-icon">ℹ️</span>
                        <span className="tab-text">关于产品</span>
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tab4' ? 'active' : ''}`}
                        onClick={() => handleTabClick('tab4')}
                    >
                        <span className="tab-icon">✉️</span>
                        <span className="tab-text">联系我们</span>
                    </button>
                </div>

                <div id="tab1" className={`tab-content ${activeTab === 'tab1' ? 'active' : ''}`}>
                    {activeTab === 'tab1' && (
                        <>
                            <div id="sub-tab1" className={`sub-tab-content ${activeSubTab === 'sub-tab1' ? 'active' : ''}`}>
                                <div
                                    className="feature-card"
                                    onClick={() => {
                                        sendContentCommand('Intelligent');
                                    }}
                                >
                                    <div className="feature-icon">🔍</div>
                                    <h4>智能识别</h4>
                                    <p>根据内容特征智能识别，减少手动操作，更好的获取想要的内容</p>
                                </div>
                                <div
                                    className="feature-card"
                                    onClick={() => {
                                        sendContentCommand('CreateRule');
                                    }}
                                >
                                    <div className="feature-icon">🛠️</div>
                                    <h4>创建规则</h4>
                                    <p>直观的可视化界面，轻松创建复杂规则</p>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                <div id="tab2" className={`tab-content ${activeTab === 'tab2' ? 'active' : ''}`}>
                    <h3>我的规则</h3>
                    <p>这里展示了您创建的所有规则。</p>
                </div>

                <div id="tab3" className={`tab-content ${activeTab === 'tab3' ? 'active' : ''}`}>
                    <h3>关于产品</h3>
                    <p>了解我们的团队、历史和企业文化。</p>
                </div>

                <div id="tab4" className={`tab-content ${activeTab === 'tab4' ? 'active' : ''}`}>
                    <h3>联系我们</h3>
                    <p>有任何问题或建议，欢迎随时与我们取得联系。</p>
                </div>
            </div>
        </section>
    )
}

export default Selector;