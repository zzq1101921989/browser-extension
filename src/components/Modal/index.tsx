import React, { useEffect, useState } from 'react';
import styles from './index.module.less'; // CSS Modules
import { ModalProps } from './types/index';

const Modal: React.FC<ModalProps> = ({
  visible,
  title,
  width = 520,
  height,
  maskClosable = true,
  closable = true,
  zIndex = 10000,
  centered = true,
  destroyOnClose = false,
  className = '',
  wrapClassName = '',
  maskClassName = '',
  headerClassName = '',
  bodyClassName = '',
  footerClassName = '',
  footer,
  onCancel,
  onOk,
  okText = '确定',
  cancelText = '取消',
  confirmLoading = false,
  okButtonProps,
  cancelButtonProps,
  afterClose,
  closeIcon,
  children,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleClose = () => {
    onCancel?.();
  };


  const renderFooter = () => {
    if (footer === null) return null;

    if (typeof footer === 'function') {
      return footer({ close: handleClose });
    }

    if (footer) return footer;

    return (
      <div className={`${styles.modalFooter} ${footerClassName}`}>
        <button
          type="button"
          className={`${styles.modalBtn} ${styles.modalBtnCancel}`}
          onClick={handleClose}
          disabled={confirmLoading}
          {...cancelButtonProps}
        >
          {cancelText}
        </button>
        <button
          type="button"
          className={`${styles.modalBtn} ${styles.modalBtnConfirm}`}
          onClick={onOk}
          disabled={confirmLoading}
          {...okButtonProps}
        >
          {okText}
        </button>
      </div>
    );
  };


  const renderModal = () => {
    if (!isMounted || !visible) return null;

    return (
      <div
        className={`${styles.modal} ${className} ${centered ? styles.modalCentered : ''}`}
        style={{
          width: typeof width === 'number' ? `${width}px` : width,
          height: height ? (typeof height === 'number' ? `${height}px` : height) : undefined,
          zIndex
        }}
      >
        {/* 模态框内容 */}
        <div className={styles.modalContent}>
          {/* 头部 */}
          {(title || closable) && (
            <div className={`${styles.modalHeader} ${headerClassName}`}>
              {title && <div className={styles.modalTitle}>{title}</div>}
              {closable && (
                <button
                  type="button"
                  className={styles.modalClose}
                  onClick={handleClose}
                >
                  {closeIcon || <span>×</span>}
                </button>
              )}
            </div>
          )}

          {/* 内容区域 */}
          <div className={`${styles.modalBody} ${bodyClassName}`}>
            {children}
          </div>

          {/* 底部 */}
          {renderFooter()}
        </div>
      </div>
    );
  };

  return renderModal();
};

export default Modal;