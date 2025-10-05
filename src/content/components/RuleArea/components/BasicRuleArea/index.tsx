import Modal from "@components/Modal";
import {Button, Divider, Form, Input, Space, Tooltip} from "antd";
import FormItem from "antd/es/form/FormItem";
import React, {useEffect, useState} from "react";
import {highlightElements, unHighlightElements, elementToPathString} from '../../utli'
import {ModalProps} from "@components/Modal/types";
import {FullscreenExitOutlined, LoginOutlined} from "@ant-design/icons";

let preHtml: HTMLElement | null = null;
let moveEventListener: ((e: MouseEvent) => void) | null = null;
let clickEventListener: ((e: Event) => void) | null = null;
let isPreventDefault = false;

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

            isPreventDefault = true

            const modal = document.querySelector('.zq_rule_modal');
            if (modal && modal.contains(e.target as Node)) return;

            if (preHtml) unHighlightElements();
            preHtml = e.target as HTMLElement;
            highlightElements([preHtml]);
        };

        // 点击事件（延迟绑定）
        setTimeout(() => {
            clickEventListener = (e: Event) => {
                if (isPreventDefault) e.preventDefault()

                if (preHtml) {
                    const parentPath = elementToPathString(preHtml, {maxDepth: 3})
                    form.setFieldsValue({
                        'elBlock': parentPath
                    })

                    isPreventDefault = false

                    cleanupEventListeners();
                }

            };

            // 针对一些特别的网站，对于一些特定的元素绑定事件的时候 “禁止冒泡” 所以有可能就会导致我在这里监听的方法无法触发，所以采用捕获
            document.addEventListener('click', clickEventListener, true);
        }, 0);

        document.body.addEventListener('mousemove', moveEventListener);
    };

    const highlightSelectDom = () => {
        const pendingHighlightDom = document.querySelectorAll(form.getFieldValue('elBlock'))
        if (pendingHighlightDom.length) {
            // 高亮选中的选择
            highlightElements(Array.from(pendingHighlightDom))

            // 两秒之后取消高亮
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
                <FormItem label="列表数据范围">
                    <Space.Compact style={{width: '100%'}}>
                        <FormItem name='elBlock' style={{width: '80%'}}>
                            <Input placeholder="请选择数据源" readOnly/>
                        </FormItem>
                        <Tooltip title='点击选择数据源'>
                            <Button type="primary" onClick={startHighlightDom}><FullscreenExitOutlined/></Button>
                        </Tooltip>
                        <Tooltip title='验证元素'>
                            <Button onClick={highlightSelectDom}><LoginOutlined/></Button>
                        </Tooltip>
                    </Space.Compact>
                </FormItem>
                <Divider>列表块内的字段</Divider>
                <Form.List name='fields'>
                    {(fields, {add, remove}) => {
                        return (
                            fields.map(item => {
                                return <FormItem name></FormItem>
                            })
                        )
                    }}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default CreateRuleArea;