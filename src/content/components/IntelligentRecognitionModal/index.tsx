import { createRoot } from 'react-dom/client';
import { useState } from 'react';
import './index.css'; // Assuming you have a CSS file for styles

const IntelligentRecognitionModal = () => {
  const [pageTurnOption, setPageTurnOption] = useState('auto');
  
  // 模拟识别到的数据区域
  const [dataGroups, setDataGroups] = useState([
    { id: 1, name: '用户信息组', fields: 5, icon: '📄' },
    { id: 2, name: '销售数据组', fields: 8, icon: '📊' },
    { id: 3, name: '产品信息组', fields: 12, icon: '🛒' }
  ]);

  const handleSave = () => {
    console.log('保存规则:', { pageTurnOption });
  };

  const onClose = () => {
    
  }

  return (
    <div className="modal-overlay">
      <div className="intelligent-recognition-modal">
        <div className="modal-header">
          <h2>智能识别</h2>
          <button className="close-button">×</button>
        </div>
        
        <div className="modal-body">
          <div className="data-area">
            <h3 className="section-title">识别到的数据区域</h3>
            <div className="data-list">
              {dataGroups.map(group => (
                <div key={group.id} className="data-item">
                  <div className="item-icon">{group.icon}</div>
                  <div className="item-content">
                    <div className="item-title">{group.name}</div>
                    <div className="item-desc">识别到{group.fields}个字段</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="page-settings">
            <h3 className="section-title">点击翻页功能设置</h3>
            <div className="radio-group">
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="pageTurn" 
                  value="auto"
                  checked={pageTurnOption === 'auto'}
                  onChange={() => setPageTurnOption('auto')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">自动翻页（间隔3秒）</span>
              </label>
              
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="pageTurn" 
                  value="manual"
                  checked={pageTurnOption === 'manual'}
                  onChange={() => setPageTurnOption('manual')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">手动点击翻页</span>
              </label>
              
              <label className="radio-option">
                <input 
                  type="radio" 
                  name="pageTurn" 
                  value="scroll"
                  checked={pageTurnOption === 'scroll'}
                  onChange={() => setPageTurnOption('scroll')}
                />
                <span className="radio-custom"></span>
                <span className="radio-label">滚动到底部自动加载</span>
              </label>
            </div>
          </div>
        </div>
        
        <button className="save-button" onClick={handleSave}>
          保存规则并运行
        </button>
      </div>
    </div>
  );
};

export default IntelligentRecognitionModal