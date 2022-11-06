import React, { } from "react";
import { List } from "antd";
import TaskItem from './TaskItem';

const TaskTab = ({ tasks, onTaskRemoval, onTaskToggle }) => {
    return (
        <>
            <List
                locale={{ emptyText: 'No tasks yet', }}
                dataSource={tasks}
                renderItem={(task) => (
                    <TaskItem
                        task={task}
                        onTaskRemoval={onTaskRemoval}
                        onTaskToggle={onTaskToggle}
                    />
                )}
                pagination={{
                    position: 'bottom',
                    pageSize: 10,
                }}
            />
        </>
    )
}



export default TaskTab;