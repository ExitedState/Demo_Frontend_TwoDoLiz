import React from 'react';
import { Button, List, Popconfirm, Switch, Tag, Tooltip } from 'antd';
import { CheckOutlined, CloseOutlined } from '@ant-design/icons';

const Task = ({ task, onTaskRemoval, onTaskToggle }) => {
    return (
        <List.Item action={[
            <Tooltip>
                title = {task.completed ? 'Mark as incomplete' : 'Mark as completed'}
                <Switch
                    checkedChildren={<CheckOutlined />}
                    unCheckedChildren={<CloseOutlined />}
                    onChange={() => onTaskToggle(task)}
                    defaultChecked={task.completed}
                />
            </Tooltip>,
            <Popconfirm title={`Are you sure you want to delete ${task.title}? This action cannot be undone.`
            } onConfirm={
                () => onTaskRemoval(task)
            }>
                <Button type="primary" danger className='remove-task-button'>
                    X
                </Button>
            </Popconfirm>
        ]} className="list-item"
            key={task.id}>
            <div className="task-item">
                <Tag color={task.completed ? 'cyan' : 'red'} className="task-completed-tag">
                    {task.title}
                </Tag>
            </div>
        </List.Item>
    )
}

export default Task;