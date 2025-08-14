import Modal from "@components/Modal";
import { createRoot } from "react-dom/client";


type CreateRuleAreaProps = {
    visible: boolean;
}
const CreateRuleArea: React.FC<CreateRuleAreaProps> = (props) => {
    const { visible = true } = props;

    return (
        <Modal
            visible={visible}
            title="创建规则"
            width={600}
            height={400}
            onCancel={() => {
                console.log('点击了取消');
            }}
        >
            <div className="create-rule-area">
                <h2>创建规则</h2>
                <p>在这里您可以创建新的规则。</p>
                {/* 其他内容 */}
            </div>
        </Modal>
    )
}

export default (container: HTMLElement) => {
    const root = createRoot(container);
    root.render(<CreateRuleArea visible />);

    return () => {
        root.unmount();
        container.remove();
    }
}
