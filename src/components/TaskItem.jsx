import React from 'react';
import { Button, List, Popconfirm, Switch, Tag, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Task = ({ task, onTaskRemoval, onTaskToggle }) => {
    return (
        <List.Item
            actions={[
                <Tooltip
                    title={task.completed ? 'Mark as incomplete' : 'Mark as completed'}>
                    <Switch
                        checkedChildren={<CheckOutlined />}
                        unCheckedChildren={<CloseOutlined />}
                        onChange={() => onTaskToggle(task)}
                        defaultChecked={task.completed}
                    />
                </Tooltip>,
                <Popconfirm
                    title={`Are you sure you want to delete ${task.title}? This action cannot be undone.`}
                    onConfirm={() => {
                        onTaskRemoval(task)
                    }}>
                    <Button className='remove-task-button' type="primary" danger>
                        X
                    </Button>
                </Popconfirm>
            ]}
            className="list-item"
            key={task.id}
        >
            <div className="task-item">
                <Tag color={task.completed ? 'cyan' : 'red'} className="task-completed-tag">
                    {task.title}
                </Tag>
                <div className="task-item-details">
                    <span className="task-item-detail-value">{task.detail}</span>
                </div>
                <div className="task-item-completedAt">
                    {/* display only YYYY/MM/DD */}
                    <span className="task-item-completedAt-value">{task.completedAt ? `deadline : ${task.completedAt.slice(0, 10)}` : null}</span>
                </div>
                <div className="task-item-tag">
                    <span className="task-item-tag-value">{task.tag ? `Tag : ${task.tag}` : null}</span>
                </div>
            </div>
        </List.Item>
    )
}

export default Task;