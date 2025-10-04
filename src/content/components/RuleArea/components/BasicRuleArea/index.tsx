import Modal from "@components/Modal";
import {Button, Form, Input, Space} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, {useEffect, useState} from "react";
import {highlightElements, unHighlightElements, elementToPathString} from '../../utli'
import {ModalProps} from "@components/Modal/types";

let preHtml: HTMLElement | null = null;
let moveEventListener: ((e: MouseEvent) => void) | null = null;
let clickEventListener: ((e: Event) => void) | null = null;

const CreateRuleArea: React.FC<ModalProps> = (props) => {
    const {visible} = props
    const [open, setOpen] = useState(visible);

    const [form] = Form.useForm()

    // 清理所有事件监听器
    const cleanupEventListeners = () => {
        if (moveEventListener) {
            document.body.removeEventListener('mousemove', moveEventListener);
            moveEventListener = null;
        }
        if (clickEventListener) {
            document.removeEventListener('click', clickEventListener);
            clickEventListener = null;
        }
        unHighlightElements();
        preHtml = null;
    };

    const startHighlightDom = () => {
        cleanupEventListeners(); // 先清理旧的监听器

        // 鼠标移动事件
        moveEventListener = (e: MouseEvent) => {
            const modal = document.querySelector('.zq_rule_modal');
            if (modal && modal.contains(e.target as Node)) return;

            if (preHtml) unHighlightElements();
            preHtml = e.target as HTMLElement;
            highlightElements([preHtml]);
        };

        // 点击事件（延迟绑定）
        setTimeout(() => {
            clickEventListener = (e: Event) => {
                e.preventDefault();

                if (preHtml) {
                    const parentPath = elementToPathString(preHtml, {maxDepth: 3})
                    form.setFieldsValue({
                        'elBlock': parentPath
                    })

                    cleanupEventListeners();
                }

            };
            document.addEventListener('click', clickEventListener);
        }, 0);

        document.body.addEventListener('mousemove', moveEventListener);
    };

    const highlightSelectDom = () => {
        const pendingHighlightDom = document.querySelectorAll(form.getFieldValue('elBlock'))
        if (pendingHighlightDom.length) {
            // 高亮选中的选择
            highlightElements(Array.from(pendingHighlightDom))

            // l两秒之后取消高亮
            setTimeout(() => {
                cleanupEventListeners()
            }, 2000)
        }
    }

    // 组件卸载时自动清理
    useEffect(() => {
        return cleanupEventListeners;
    }, []);

    return (
        <Modal
            visible={open}
            onOk={async () => {
                props?.onOk?.(await form.validateFields())
            }}
            className="zq_rule_modal"
            title="创建规则"
            width={500}
            height='100vh'
            onCancel={() => setOpen(false)}
            maskClosable={false}
        >
            <Form form={form}>
                <FormItem label="列表数据源">
                    <Space.Compact>
                        <FormItem name='elBlock'>
                            <Input placeholder="请选择数据源" readOnly/>
                        </FormItem>
                        <Button type="primary" onClick={startHighlightDom}>选择数据源</Button>
                        <Button onClick={highlightSelectDom}>验证</Button>
                    </Space.Compact>
                </FormItem>
            </Form>
        </Modal>
    );
};

export default CreateRuleArea;