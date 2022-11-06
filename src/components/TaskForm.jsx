import React from 'react';
import { Form, Row, Col, Button, Input } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';

const TaskForm = ({ onFormSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            detail: form.getFieldValue('detail'),
            completed: false,
        });
        console.log('Received values of form: ', form.getFieldValue('title'));
        form.resetFields();
    }

    return (
        <Form
            form={form}
            onFinish={onFinish}
            layout="horizontal"
            className="task-form">  
            <Row gutter={20}>
                <Col xs={24} sm={24} md={17} lg={19} xl={20}>
                    <Form.Item
                        name={'title'}
                        rules={[{ required: true, message: 'Please input your title!' }]}>
                        <Input placeholder="Task title" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                        Add Task
                    </Button>
                </Col>
            </Row>
        </Form >
    )
}

export default TaskForm;