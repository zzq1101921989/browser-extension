import Modal from "@components/Modal";
import {Button, Form, Input, Space} from "antd";
import {FC, useState} from "react";
import {createRoot} from "react-dom/client";
import useEventListener from "../../../hook/useEventListener";
import {EditOutlined, FullscreenExitOutlined} from "@ant-design/icons";


type CreateRuleAreaProps = {
    visible: boolean;
}
let preHtml: HTMLElement | null = null
const CreateRuleArea: FC<CreateRuleAreaProps> = (props) => {
    const {visible = true} = props;

    const [open, setOpen] = useState(visible);

    const [flag, setFlag] = useState<boolean>(false)

    const [form] = Form.useForm()

    useEventListener('mousemove', (e) => {
        requestAnimationFrame(() => {
            const target: HTMLElement | null = e.target as HTMLElement

            // 1.触发鼠标移动高亮元素的逻辑
            if (target === document.body) {
                return
            }
            if (target) {
                if (preHtml) {
                    (preHtml as HTMLElement).style.backgroundColor = ''
                }
                preHtml = target
                target.style.backgroundColor = '#ccc'
            }
        })
    }, {isStartAction: flag})
    useEventListener('click', (e) => {
        e.preventDefault()
    }, {isStartAction: flag})

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
            <Form name="dynamic_form_item" form={form}>
                <Form.List name='data'>
                    {(fields, operation) => {
                        return (
                            <>
                                {
                                    fields.map((id, index) => {
                                        return (
                                            <Space.Compact style={{width: '100%'}} key={index}>
                                                <Form.Item style={{width: '30%'}}>
                                                    <Input placeholder='字段名称'/>
                                                </Form.Item>
                                                <Form.Item style={{width: '70%'}}>
                                                    <Input placeholder='数据源' readOnly/>
                                                </Form.Item>
                                                <Button type='primary' onClick={() => {
                                                    setFlag(true)
                                                }}><EditOutlined/></Button>
                                                <Button><FullscreenExitOutlined/></Button>
                                            </Space.Compact>
                                        )
                                    })
                                }
                                <Button size='small' style={{width: '100%'}} onClick={() => {
                                    operation.add()
                                }}>添加数据源</Button>
                            </>
                        )
                    }}
                </Form.List>

            </Form>
        </Modal>
    )
}

export default (container: HTMLElement) => {
    const root = createRoot(container);
    root.render(<CreateRuleArea visible/>);

    return () => {
        root.unmount();
        container.remove();
    }
}
