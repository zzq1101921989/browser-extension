// types/modal.ts
export interface ModalProps {
  visible: boolean;
  title?: string;
  width?: number | string;
  height?: number | string;
  maskClosable?: boolean;
  closable?: boolean;
  zIndex?: number;
  centered?: boolean;
  destroyOnClose?: boolean;
  className?: string;
  wrapClassName?: string;
  maskClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  footer?: React.ReactNode | ((props: { close: () => void }) => React.ReactNode);
  onCancel?: () => void;
  onOk?: (formData: any) => Promise<any>;
  okText?: string;
  cancelText?: string;
  confirmLoading?: boolean;
  okButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  cancelButtonProps?: React.ButtonHTMLAttributes<HTMLButtonElement>;
  afterClose?: () => void;
  closeIcon?: React.ReactNode;
  children?: React.ReactNode;
}