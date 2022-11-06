//edit task
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Modal } from 'antd';
import { updateTask } from '../services/taskService.js';

const TaskEditForm = ({ task, onTaskUpdate }) => {
    const [form] = Form.useForm();
    const [visible, setVisible] = useState(false);

    const showModal = () => {
        setVisible(true);
    };

    const handleOk = () => {
        setVisible(false);
    };

    const handleCancel = () => {
        setVisible(false);
    };

    const onFinish = (values) => {
        console.log('Success:', values);
        updateTask(values).then(onTaskUpdate());
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        form.setFieldsValue({
            id: task.id,
            title: task.title,
            detail: task.description,
            completed: task.completed,
            completedAt: task.completedAt,
            tag: task.tag,
            hasCompletedDate: task.hasCompletedDate,
        });
    }, [form, task]);

    return (
        <>
            <Button type="primary" onClick={showModal}>
                Edit
            </Button>
            <Modal
                title="Edit Task"
                visible={visible}
                onOk={handleOk}
                onCancel={handleCancel}
                footer={null}
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item
                        label="Title"
                        name="title"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your title!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Detail"
                        name="description"
                        rules={[
                            {
                                required: false,
                                message: 'Please input your description!',
                            },
                        ]}
                    >
                        <Input.TextArea />
                    </Form.Item>

                    <Form.Item
                        name="completed"
                        valuePropName="checked"
                        noStyle
                    >
                        <Checkbox>Completed</Checkbox>
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </Modal>
        </>
    );
}