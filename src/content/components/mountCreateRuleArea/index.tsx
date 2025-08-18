import Modal from "@components/Modal";
import { Button, Form, Input, Space } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { createRoot } from "react-dom/client";


type CreateRuleAreaProps = {
    visible: boolean;
}
const CreateRuleArea: React.FC<CreateRuleAreaProps> = (props) => {
    const { visible = true } = props;

    const [open, setOpen] = useState(visible);

    const startGetDom = () => {

        // 1.触发鼠标移动高亮元素的逻辑

        // 2.提供移动过滤器，让用户更加清晰的抓取想要获取的数据

        // 3.关闭移动过滤器，鼠标移动事件取消
        console.log(document.body, 'window');
        
    }

    return (
        <Modal
            visible={open}
            title="创建规则"
            width={500}
            height='100vh'
            onCancel={() => {
                setOpen(false);
            }}
            maskClosable={false}
        >
            <Form>
                <FormItem label='列表数据源'>
                    <Space.Compact>
                        <Input placeholder='请输入数据源' readOnly />
                        <Button type='primary' onClick={startGetDom}>选择数据源</Button>
                        <Button>验证</Button>
                    </Space.Compact>
                </FormItem>
            </Form>
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
