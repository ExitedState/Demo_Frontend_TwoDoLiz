import React from 'react';
import { Form, Row, Col, Button, Input, DatePicker, Radio } from 'antd';
import { PlusCircleFilled } from '@ant-design/icons';
import TextArea from 'antd/lib/input/TextArea';

const TaskForm = ({ onFormSubmit }) => {
    const [form] = Form.useForm();

    const onFinish = () => {
        onFormSubmit({
            title: form.getFieldValue('title'),
            detail: form.getFieldValue('detail'),
            completed: false,
            completedAt: form.getFieldValue('date-picker') ? form.getFieldValue('date-picker').format('YYYY-MM-DD') : null,
            tag: form.getFieldValue('tag'),
            hasCompletedDate: form.getFieldValue('date-picker') ? true : false,
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
                <Col xs={24} sm={24} md={5} lg={19} xl={15}>
                    <Form.Item
                        name={'title'}
                        rules={[{ required: true, message: 'Please input your title!' }]}>
                        <Input placeholder="Title" autoFocus={false} autoComplete="off" />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={17} lg={19} xl={5}>
                    <Form.Item name="date-picker" >
                        <DatePicker placeholder='deadline' rules={[{ required: false }]} />
                    </Form.Item>
                </Col>
                <Col xs={24} sm={24} md={7} lg={5} xl={4}>
                    <Button type="primary" htmlType="submit" block>
                        <PlusCircleFilled />
                        Add Task
                    </Button>
                </Col>
                <Col>
                    <Form.Item name="tag" label="Category : " >
                        {/* button that can deselect */}
                        <Radio.Group buttonStyle='solid' defaultValue='none'>
                            <Radio.Button value="work">Work</Radio.Button>
                            <Radio.Button value="study">Study</Radio.Button>
                            <Radio.Button value="love and Family">Love and Family</Radio.Button>
                            <Radio.Button value="friend">Friend</Radio.Button>
                            <Radio.Button value="activity">Activity</Radio.Button>
                            {/* unselect button */}
                            <Radio.Button value="none">None</Radio.Button>
                        </Radio.Group>
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item
                name={'detail'}
                rules={[{ required: false }]}>
                <TextArea placeholder="Details"
                    showCount={true}
                    maxLength={5000}
                    style={{
                        height: 120,
                    }}
                    autoComplete="off" />
            </Form.Item>
        </Form >
    )
}

export default TaskForm;